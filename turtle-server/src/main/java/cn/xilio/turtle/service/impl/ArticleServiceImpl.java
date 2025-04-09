package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.core.PageResponse;
import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.ArticleDetail;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.repository.ArticleRepository;
import cn.xilio.turtle.service.ArticleService;
import com.baidu.fsg.uid.UidGenerator;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private UidGenerator uidGenerator;
    @Autowired
    private R2dbcEntityTemplate template;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Mono<Long> saveArticle(CreateArticleDTO dto) {
        //处理文章标签

        return Optional.ofNullable(dto.id())
                .map(id -> {
                    return articleRepository.findById(dto.id())
                            .switchIfEmpty(Mono.error(new BizException("文章不存在!")))
                            .flatMap(existingArticle -> {
                                        BeanUtils.copyProperties(dto, existingArticle);
                                        return articleRepository.save(existingArticle).map(Article::getId);
                                    }
                            )
                            .onErrorResume(throwable -> {
                                return Mono.error(new RuntimeException("文章更新出错", throwable));
                            });

                })
                .orElseGet(() -> {
                    Article newArticle = new Article();
                    BeanUtils.copyProperties(dto, newArticle);
                    newArticle.setCreatedAt(LocalDateTime.now());
                    newArticle.setUpdatedAt(LocalDateTime.now());
                    newArticle.setViewCount(0);
                    if (dto.status() == 1) {
                        newArticle.setPublishedAt(LocalDateTime.now());
                    }
                    long key = uidGenerator.getUID();
                    newArticle.setId(key);
                    return template.insert(newArticle).map(Article::getId);
                });

    }

    @Override
    public Mono<PageResponse<ArticleBrief>> getArticles(int page, int size) {
        int offset = (size == -1) ? 0 : (page - 1) * size;
        int effectiveLimit = (size == -1) ? Integer.MAX_VALUE : size;

        return Mono.zip(
                articleRepository.findActiveArticles(effectiveLimit, offset)
                        .map(this::toArticleBrief)
                        .collectList(),
                articleRepository.countActiveArticles(1)
        ).map(tuple -> {
            PageResponse<ArticleBrief> response = new PageResponse<>();
            response.setData(tuple.getT1());
            response.setTotal(tuple.getT2());
            response.setHasMore(size != -1 && (page * size) < tuple.getT2());
            return response;
        });
    }

    private ArticleBrief toArticleBrief(Article article) {
        List<String> tags = parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                tags,
                article.getPublishedAt(),
                article.getViewCount()
        );
    }

    @Override
    public Mono<ArticleDetail> getArticleDetail(Long id) {
        return articleRepository.findPublishArticleById(id)
                .map(this::toArticleDetail)
                .switchIfEmpty(Mono.error(new BizException("文章不存在或已删除！"))); // 如果未找到，返回空
    }

    @Override
    public Mono<PageResponse<ArticleBrief>> getArticlesByTag(String tagName, int page, int size) {
        int offset = (size == -1) ? 0 : (page - 1) * size;
        int effectiveLimit = (size == -1) ? Integer.MAX_VALUE : size;
        return Mono.zip(
                articleRepository.findPublishArticlesByTag(tagName, effectiveLimit, offset)
                        .map(this::toArticleBrief)
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


    private static List<String> parseTags(String tagNames) {
        if (StringUtils.hasText(tagNames)) {
            return Arrays.asList(tagNames.split("、"));
        }
        return new ArrayList<>();
    }

}
