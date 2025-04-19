package cn.xilio.turtle.entity;

import cn.xilio.turtle.core.lucene.annotations.TDocument;
import cn.xilio.turtle.core.lucene.annotations.TField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@TDocument(indexName = "article")
public class ArticleIndex {
    @TField(store = true)
    private String id;
    @TField(index = true)
    private String title;
    @TField(index = true)
    private String description;
    @TField(index = true)
    private String content;
    @TField(store = true)
    private List<String> tags;
    @Column("published_at")
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    @TField(store = true)
    private LocalDateTime publishedAt;
    @TField(store = true)
    @Column("view_count")
    private Integer viewCount;
    @TField(store = true)
    private Boolean isProtected;

}
