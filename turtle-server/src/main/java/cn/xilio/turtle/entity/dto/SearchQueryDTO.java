package cn.xilio.turtle.entity.dto;

public record SearchQueryDTO(
        String keyword,
        Integer page,
        Integer size,
        Integer type
) {
}
