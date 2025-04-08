package cn.xilio.xilio.repository;

import cn.xilio.xilio.entity.Article;
import org.springframework.data.domain.Pageable;
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

    // 获取符合条件的文章总数
    @Query("SELECT COUNT(1) FROM article WHERE status = :status AND deleted = 0")
    Mono<Integer> countActiveArticles(int status);
}
