package cn.xilio.turtle.entity.dto;

import org.springframework.data.relational.core.mapping.Column;

public record TagDTO(
        Long id,
        String name,
        @Column("article_count")
        Long articleCount

) {
}
