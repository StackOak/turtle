package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.ArticleTag;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;


@Repository
public interface ArticleTagRepository extends R2dbcRepository<ArticleTag, Long> {
    @Query("DELETE FROM article_tag WHERE article_id = :articleId AND tag_id = :tagId")
    Mono<Void> deleteByArticleIdAndTagId(Long articleId, Long tagId);

}
