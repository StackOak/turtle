package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Article;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ArticleRepository extends ReactiveCrudRepository<Article, Long> {
    // 分页查询状态为1且未删除的文章
    @Query("SELECT id,title,description,tag_names,view_count,published_at FROM article " +
            "WHERE status = 1 AND deleted = 0 " +
            "ORDER BY id ASC " +
            "LIMIT :limit OFFSET :offset")
    Flux<Article> findActiveArticles(int limit, int offset);

    // 查询单篇文章详情，status=1 且 deleted=0
    @Query("SELECT id, title, content, tag_names, published_at, view_count,created_at,updated_at " +
            "FROM article " +
            "WHERE id = :id AND status = 1 AND deleted = 0")
    Mono<Article> findPublishArticleById(Long id);

    // 获取符合条件的文章总数
    @Query("SELECT COUNT(1) FROM article WHERE status = :status AND deleted = 0")
    Mono<Integer> countActiveArticles(int status);

    @Query("SELECT COUNT(1) FROM article a inner join article_tag at on  a.id = at.article_id  " +
            "inner join tag t on at.tag_id = t.id  " +
            "WHERE t.name = :tagName and status = :status AND deleted = 0")
    Mono<Integer> tagArticleCount(int status,String tagName);

    @Query("SELECT a.id, a.title, a.description, a.view_count, a.published_at, a.created_at, a.updated_at,a.tag_names " +
            "FROM article a " +
            "INNER JOIN article_tag at ON a.id = at.article_id " +
            "INNER JOIN tag t ON at.tag_id = t.id " +
            "WHERE t.name = :tagName AND a.status = 1 AND a.deleted = 0 " +
            "ORDER BY a.published_at DESC " +
            "LIMIT :size OFFSET :offset")
    Flux<Article>findPublishArticlesByTag(String tagName, int size, int offset);

}
