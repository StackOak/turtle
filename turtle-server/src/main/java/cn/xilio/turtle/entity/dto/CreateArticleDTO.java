package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.core.validate.NumberInList;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

public record CreateArticleDTO(
        String id,
        @NotEmpty(message = "文章标题不能为空")
        String title,
        String description,
        @NotEmpty(message = "文章内容不能为空")
        String content,
        @NotNull
        @NumberInList(allowedValues = {0, 1}, message = "文章状态值不合法！")
        Integer status,
        String tagNames
) {
   public List<String> parseTags() {
        if (StringUtils.hasText(tagNames)) {
            return Arrays.asList(tagNames.split("、"));
        }
        return List.of();
    }
}
