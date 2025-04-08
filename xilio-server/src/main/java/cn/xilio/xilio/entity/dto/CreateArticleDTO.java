package cn.xilio.xilio.entity.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateArticleDTO(
        Long id,
        @NotEmpty(message = "文章标题不能为空")
        String title,
        String description,
        @NotEmpty(message = "文章内容不能为空")
        String content,
        @NotNull
        Integer status
) {
}
