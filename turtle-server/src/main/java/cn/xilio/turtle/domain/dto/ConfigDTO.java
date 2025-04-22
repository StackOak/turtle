package cn.xilio.turtle.domain.dto;

import java.util.Map;

public record ConfigDTO(
        String configKey,
        Map<String, Object> configJson
) {
}
