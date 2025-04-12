package cn.xilio.turtle.entity.dto;

import java.util.Map;

public record ConfigDTO(
        String configKey,
        Map<String, Object> configJson
) {
}
