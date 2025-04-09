package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Tag;
import cn.xilio.turtle.entity.dto.TagDTO;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TagRepository extends ReactiveCrudRepository<Tag, String> {
    @Query("SELECT t.id, t.name, COUNT(at.article_id) AS article_count " +
            "FROM tag t " +
            "LEFT JOIN article_tag at ON t.id = at.tag_id " +
            "GROUP BY t.id " +
            "ORDER BY article_count desc " +
            "LIMIT :limit OFFSET :offset")
    Flux<TagDTO> findWithArticleCountPaginated(int limit, int offset);

    @Query("SELECT COUNT(1) FROM tag")
    Mono<Integer> countTags();


    /**
     * 通过文章ID查询该文章关联的标签列表
     *
     * @param aid 文章ID
     * @return 标签列表
     */
    @Query("SELECT t.id,t.name FROM tag t INNER JOIN article_tag at ON t.id = at.tag_id WHERE at.article_id = :aid")
    public Flux<Tag> findByArticleId(String aid);

    @Query("SELECT id,name,created_at FROM tag WHERE name = :name")
    Mono<Tag> findByName(String name);

    @Query("SELECT id,name,created_at FROM tag WHERE name IN (:names)")
    Flux<Tag> findByNames(Iterable<String> names);

}
