package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.ArticleTag;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ArticleTagRepository extends R2dbcRepository<ArticleTag, String> {

}
