package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.core.validate.NumberInList;
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
        @NumberInList(allowedValues = {0, 1}, message = "文章状态值不合法！")
        Integer status
) {
}
