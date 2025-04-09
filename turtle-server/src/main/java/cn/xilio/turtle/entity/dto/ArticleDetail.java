package cn.xilio.turtle.entity.dto;

import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleDetail(
        Long id,
        String title,
        String content,
        List<String> tags,
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
