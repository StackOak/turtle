package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("article_tag")
public class ArticleTag {
    private Long articleId;
    private Long tagId;
}
