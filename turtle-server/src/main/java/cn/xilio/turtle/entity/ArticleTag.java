package cn.xilio.turtle.entity;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * 文章与标签关联表
 */
@Data
@Table("article_tag")
public class ArticleTag {

    /**
     * 文章ID
     */
    @Column("article_id")
    private Long articleId;

    /**
     * 标签ID
     */
    @Column("tag_id")
    private Long tagId;
}
