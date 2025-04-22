package cn.xilio.turtle.domain.dto;

import org.springframework.data.relational.core.mapping.Column;

public record TagDTO(
        String id,
        String name,
        @Column("article_count")
        String articleCount

) {
}
