package cn.xilio.xilio.entity.dto;

import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;


public record ArticleBrief(
        Long id,
        String title,
        String description,
        List<String> tags,
        @Column("published_at")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount
) {

}
