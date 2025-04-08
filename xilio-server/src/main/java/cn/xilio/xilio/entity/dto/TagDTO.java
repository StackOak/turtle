package cn.xilio.xilio.entity.dto;

import org.springframework.data.relational.core.mapping.Column;

public record TagDTO(
        Long id,
        String name,
        @Column("articleCount")
        Long articleCount

) {
}
