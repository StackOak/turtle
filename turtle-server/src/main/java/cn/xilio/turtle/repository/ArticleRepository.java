package cn.xilio.turtle.repository;

import cn.xilio.turtle.domain.entity.article.Article;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@SuppressWarnings("all")
public interface ArticleRepository extends ReactiveCrudRepository<Article, String> {
    @Query("""
            SELECT id, title, description, tag_names, view_count, published_at, is_protected
            FROM article
            WHERE deleted = 0
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset
            """)
    Flux<Article> findArticles(int limit, int offset);

    @Query("SELECT COUNT(1) FROM article WHERE deleted = 0")
    Mono<Integer> countAll();

    @Query("""
            SELECT COUNT(1)
            FROM article a
            INNER JOIN article_tag at ON a.id = at.article_id
            INNER JOIN tag t ON at.tag_id = t.id
            WHERE t.name = :tagName AND status = :status AND deleted = 0
            """)
    Mono<Integer> tagArticleCount(int status, String tagName);

    @Query("""
            SELECT a.id, a.title, a.description, a.view_count, a.published_at, a.created_at, a.updated_at, a.tag_names, a.is_protected
            FROM article a
            INNER JOIN article_tag at ON a.id = at.article_id
            INNER JOIN tag t ON at.tag_id = t.id
            WHERE t.name = :tagName AND a.status = 1 AND a.deleted = 0 AND is_protected = 0
            ORDER BY a.published_at DESC
            LIMIT :size OFFSET :offset
            """)
    Flux<Article> findPublishArticlesByTag(String tagName, int size, int offset);
}
