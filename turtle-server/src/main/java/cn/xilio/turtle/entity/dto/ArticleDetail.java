package cn.xilio.turtle.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleDetail(
        String id,
        String title,
        String content,
        List<String> tags,
         @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
        @Column("published_at")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount,
        @Column("created_at")
        LocalDateTime createdAt,
        @Column("updated_at")
        LocalDateTime updatedAt
) {
}
