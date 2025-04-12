package cn.xilio.turtle.service.impl;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.hutool.core.util.PageUtil;
import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.core.common.PageResponse;
import cn.xilio.turtle.core.security.SecureManager;
import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.ArticleTag;
import cn.xilio.turtle.entity.Tag;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.ArticleDetail;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.core.common.SearchResult;
import cn.xilio.turtle.repository.ArticleRepository;
import cn.xilio.turtle.repository.ArticleTagRepository;
import cn.xilio.turtle.repository.TagRepository;
import cn.xilio.turtle.service.ArticleService;
import cn.xilio.turtle.service.SearchService;
import com.baidu.fsg.uid.UidGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.data.relational.core.query.Criteria.where;
import static org.springframework.data.relational.core.query.Query.query;
import static org.springframework.data.relational.core.query.Update.update;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleTagRepository articleTagRepository;
    @Autowired
    private UidGenerator uidGenerator;
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private SecureManager secureManager;
    @Autowired
    private TagRepository tagRepository;
    private Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);

    @Override
    @SaCheckLogin
    public Mono<PageResponse<ArticleBrief>> queryAll(int page, int size) {
        int offset = (size == -1) ? 0 : (page - 1) * size;
        int effectiveLimit = (size == -1) ? Integer.MAX_VALUE : size;
        return Mono.zip(
                articleRepository.findArticles(effectiveLimit, offset)
                        .map(ArticleBrief::toArticleBrief)
                        .collectList(),
                articleRepository.countAll()
        ).map(tuple -> {
            PageResponse<ArticleBrief> response = new PageResponse<>();
            response.setData(tuple.getT1());
            response.setTotal(tuple.getT2());
            response.setHasMore(size != -1 && (page * size) < tuple.getT2());
            return response;
        });
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Mono<String> saveArticle(CreateArticleDTO dto) {
        List<String> tagNames = dto.parseTags();
        if (StringUtils.hasText(dto.id())) {
            return articleRepository.findById(dto.id())
                    .switchIfEmpty(Mono.error(new BizException("文章不存在!")))
                    .flatMap(existingArticle -> {
                        BeanUtils.copyProperties(dto, existingArticle);
                        //对密码保护类型的文章进行加密处理
                        if (dto.isProtected()) {
                            if (!StringUtils.hasText(dto.accessPassword())) {
                                return Mono.error(new BizException("密码保护类型的文章必须设置访问密码"));
                            } else {
                                return secureManager.encrypt(dto.accessPassword())
                                        .onErrorResume(e -> Mono.error(new BizException("密码加密失败，请联系管理员")))
                                        .flatMap(password -> {
                                            existingArticle.setAccessPassword(password);
                                            return handleTag(tagNames, dto.id()).then(articleRepository.save(existingArticle).map(Article::getId));
                                        });
                            }
                        }
                        return handleTag(tagNames, dto.id()).then(articleRepository.save(existingArticle).map(Article::getId));
                    });
        } else {
            Article newArticle = new Article();
            BeanUtils.copyProperties(dto, newArticle);
            newArticle.setCreatedAt(LocalDateTime.now());
            newArticle.setUpdatedAt(LocalDateTime.now());
            newArticle.setViewCount(0);
            if (dto.status() == 1) {
                newArticle.setPublishedAt(LocalDateTime.now());
            }
            long key = uidGenerator.getUID();
            newArticle.setId(String.valueOf(key));
            //对密码保护类型的文章进行加密处理
            if (dto.isProtected()) {
                if (!StringUtils.hasText(dto.accessPassword())) {
                    return Mono.error(new BizException("密码保护类型的文章必须设置访问密码"));
                } else {
                    return secureManager.encrypt(dto.accessPassword())
                            .onErrorResume(e -> Mono.error(new BizException("密码加密失败，请联系管理员")))
                            .flatMap(password -> {
                                newArticle.setAccessPassword(password);
                                return handleTag(tagNames, String.valueOf(key)).then(template.insert(newArticle).map(Article::getId));
                            });
                }
            }
            return handleTag(tagNames, String.valueOf(key)).then(template.insert(newArticle).map(Article::getId));
        }
    }

    /**
     * 创建文章的时候处理标签
     * 当时写这段代码差点把电脑砸了😊
     *
     * @param tagNames 标签名列表
     * @param aid      文章ID
     */

    public Mono<Void> handleTag(List<String> tagNames, String aid) {
        //删除以前所有的标签关联
        return template.delete(Query.query(where("article_id").is(aid)), ArticleTag.class).then(
                template.select(Query.query(where("name").in(tagNames)), Tag.class).collectList().flatMap(tags -> {
                    //计算出tags和tagNames的差集 将数据库不存在的标签
                    List<Tag> newTags = tagNames.stream().filter(tagName -> tags.stream()
                                    .noneMatch(tag -> tag.getName().equalsIgnoreCase(tagName)))
                            .map(tagName -> new Tag(uidGenerator.getUID() + "", tagName, LocalDateTime.now())).toList();
                    //一次性创建多个新标签
                    return Flux.fromIterable(newTags).flatMap(template::insert).collectList().flatMap(news -> {
                        //旧的标签与新的标签合并 用于与文章建立关联
                        tags.addAll(news);
                        //转化为文章与标签的关联实体
                        List<ArticleTag> articleTags = tags.stream()
                                .map(tag -> new ArticleTag(aid, tag.getId()))
                                .toList();
                        //一次性保存所有文章与标签的关联
                        return Flux.fromIterable(articleTags)
                                .flatMap(template::insert)
                                .then()  // 等待所有插入完成
                                .onErrorResume(e -> {
                                    logger.error("保存文章标签关联失败", e);
                                    return Mono.error(new BizException(500, "系统异常!"));
                                });
                    }).then().onErrorResume(e -> {
                        logger.error("保存文章标签关联失败", e);
                        return Mono.error(new BizException(500, "系统异常!"));
                    });
                })).then();
    }

    @Override
    public Mono<SearchResult> getArticles(String keyword, int page, int size) {
        Criteria criteria = where("status").is(1)
                /*密码访问类型文章不展示在页面，但是可以通过链接访问*/
                .and("is_protected").is(0)
                .and("deleted").is(0);
        if (StringUtils.hasText(keyword)) {
            criteria = criteria.and(where("title").like("%" + keyword + "%")
                    .or(where("description").like("%" + keyword + "%")));
        }
        Query baseQuery = Query.query(criteria);
        Mono<Long> totalMono = template.count(baseQuery, Article.class);
        Criteria finalCriteria = criteria;
        return totalMono.flatMap(total -> {
            if (total == 0) {
                return Mono.just(SearchResult.empty());
            }
            // 计算总页数
            int totalPages = PageUtil.totalPage(total.intValue(), size);
            // 如果输入页数超过总页数，使用最后一页
            int actualPage = Math.min(page, totalPages);

            // 计算实际的偏移量
            long offset = (long) (actualPage - 1) * size;
            int actualLimit = size;

            // 构建分页查询
            Query pageQuery = Query.query(finalCriteria)
                    .columns("id", "title", "description", "published_at", "view_count", "tag_names", "is_protected")
                    .sort(Sort.by(Sort.Direction.DESC, "published_at"))
                    .offset(offset)
                    .limit(actualLimit);
            // 如果超出页码范围，返回空结果
            if (page > totalPages) {
                return Mono.just(SearchResult.empty());
            }
            return template.select(pageQuery, Article.class)
                    .map(article -> StringUtils.hasText(keyword) ? ArticleBrief.toArticleBriefWithHighlight(article, keyword) : ArticleBrief.toArticleBrief(article))
                    .collectList()
                    .map(articles -> SearchResult.of(articles, total.intValue(), totalPages, articles.size(), actualPage < totalPages));
        });
    }


    @Override
    public Mono<ArticleDetail> getArticleDetail(String id, String pwd) {
        return template.selectOne(query(where("id").is(id)
                        .and(where("deleted").is(0))
                        .and(where("status").is(1))), Article.class)
                .switchIfEmpty(Mono.error(new BizException("文章不存在或已删除")))
                .flatMap(article -> {
                    // 检查是否需要密码授权
                    if (article.getIsProtected()) {
                        if (!StringUtils.hasText(pwd)) {
                            return Mono.error(new BizException(401, "该文章已加密，需要输入密码访问"));
                        }
                        // 解密密码并验证
                        return secureManager.decrypt(article.getAccessPassword())
                                .onErrorResume(e -> Mono.error(new BizException(500, "密码解密失败！请联系管理员")))
                                .flatMap(decryptedPassword -> {
                                    if (!decryptedPassword.equals(pwd)) {
                                        return Mono.error(new BizException(401, "访问密码错误"));
                                    }
                                    return Mono.just(article); // 密码正确，返回文章
                                });
                    }
                    // 无密码，直接返回文章
                    return Mono.just(article);
                }).map(this::toArticleDetail);
        //记录访问日志｜文章阅读量
    }

    @Override
    public Mono<Article> get(String id) {
        return template.selectOne(query(where("id").is(id).and(where("deleted").is(0))),
                Article.class).switchIfEmpty(Mono.error(new BizException("文章不存在或已删除！")));
    }

    @Override
    public Mono<PageResponse<ArticleBrief>> getArticlesByTag(String tagName, int page, int size) {
        int offset = (size == -1) ? 0 : (page - 1) * size;
        int effectiveLimit = (size == -1) ? Integer.MAX_VALUE : size;
        return Mono.zip(
                articleRepository.findPublishArticlesByTag(tagName, effectiveLimit, offset)
                        .map(ArticleBrief::toArticleBrief)
                        .collectList(),
                articleRepository.tagArticleCount(1, tagName)
        ).map(tuple -> {
            PageResponse<ArticleBrief> response = new PageResponse<>();
            response.setData(tuple.getT1());
            response.setTotal(tuple.getT2());
            response.setHasMore(size != -1 && (page * size) < tuple.getT2());
            return response;
        });

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Mono<Void> deleteArticle(String aid) {
        return template.update(Article.class)
                .matching(query(where("id").is(aid)))
                .apply(update("deleted", 1)).then();
    }

    // 实体转换为 DTO
    private ArticleDetail toArticleDetail(Article article) {
        List<String> tags = (StringUtils.hasText(article.getTagNames()))
                ? Arrays.asList(article.getTagNames().split("、"))
                : Collections.emptyList();
        return new ArticleDetail(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getPublishedAt(),
                article.getViewCount(),
                article.getCreatedAt(),
                article.getUpdatedAt()
        );
    }
}
