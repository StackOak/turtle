package cn.xilio.turtle.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * 文章与标签关联表
 */
@Data
@Table("article_tag")
@AllArgsConstructor
@NoArgsConstructor
public class ArticleTag {

    /**
     * 文章ID
     */
    @Column("article_id")
    private String articleId;

    /**
     * 标签ID
     */
    @Column("tag_id")
    private String tagId;
}
