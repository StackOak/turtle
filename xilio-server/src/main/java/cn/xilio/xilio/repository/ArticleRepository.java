package cn.xilio.xilio.repository;

import cn.xilio.xilio.entity.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ArticleRepository extends ReactiveCrudRepository<Article, Long> {
    Flux<Article> findAllBy(Pageable pageable); // 分页查询
}
