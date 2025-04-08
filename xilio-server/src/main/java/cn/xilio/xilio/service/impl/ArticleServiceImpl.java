package cn.xilio.xilio.service.impl;

import cn.xilio.xilio.entity.Article;
import cn.xilio.xilio.entity.Tag;
import cn.xilio.xilio.entity.dto.ArticleDetail;
import cn.xilio.xilio.repository.ArticleRepository;
import cn.xilio.xilio.service.ArticleService;
import com.baidu.fsg.uid.UidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private R2dbcEntityTemplate entityTemplate;
    @Autowired
    private UidGenerator uidGenerator;

    @Autowired
    private R2dbcEntityTemplate template;
    // 增
    public Mono<Article> createArticle(Article article) {
        article.setId(uidGenerator.getUID());
       return entityTemplate.insert(article);
    }

    // 删
    public Mono<Void> deleteArticle(Long id) {
        return articleRepository.deleteById(id);
    }

    // 改
    public Mono<Article> updateArticle(Long id, Article article) {
        article.setId(id);
        return articleRepository.save(article);
    }

    // 查单个
    public Mono<ArticleDetail> getArticleById(Long articleId) {
        String sql = """
            SELECT a.id AS article_id, a.title, a.content, 
                   t.id AS tag_id, t.name AS tag_name
            FROM article a
            LEFT JOIN article_tag at ON a.id = at.article_id
            LEFT JOIN tag t ON at.tag_id = t.id
            WHERE a.id = :articleId
        """;

        return template.getDatabaseClient()
                .sql(sql)
                .bind("articleId", articleId)
                .map(row -> {
                    // 映射文章信息
                    Article article = new Article();
                    article.setId(row.get("article_id", Long.class));
                    article.setTitle(row.get("title", String.class));
                    article.setContent(row.get("content", String.class));

                    // 映射标签信息（可能为空）
                    Tag tag = null;
                    Long tagId = row.get("tag_id", Long.class);
                    if (tagId != null) {
                        tag = new Tag();
                        tag.setId(tagId);
                        tag.setName(row.get("tag_name", String.class));
                    }
                    return new Object[]{article, tag};
                })
                .all()
                .collectList()
                .mapNotNull(results -> {
                    if (results.isEmpty()) {
                        return null; // 文章不存在
                    }

                    // 获取文章信息（所有行都包含相同的文章数据，取第一行即可）
                    Article article = (Article) results.get(0)[0];

                    // 收集所有标签
                    List<Tag> tags = results.stream()
                            .map(row -> (Tag) row[1])
                            .filter(Objects::nonNull) // 过滤空标签
                            .distinct() // 去重（可选）
                            .collect(Collectors.toList());

                    // 构建返回对象
                    ArticleDetail detail = new ArticleDetail();
                    detail.setId(article.getId());
                    detail.setTitle(article.getTitle());
                    detail.setContent(article.getContent());
                    detail.setTags(tags);
                    return detail;
                })
                .switchIfEmpty(Mono.just(new ArticleDetail())); // 如果没有结果，返回空对象
    }

    // 分页查询
    public Flux<Article> getArticles(int page, int size) {
        return articleRepository.findAllBy(PageRequest.of(page, size));
    }

    // 查询所有
    public Flux<Article> getAllArticles() {
        return articleRepository.findAll();
    }
}
