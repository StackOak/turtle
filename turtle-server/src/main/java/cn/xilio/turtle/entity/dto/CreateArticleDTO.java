package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.core.validate.NumberInList;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

public record CreateArticleDTO(
        String id,
        @NotEmpty(message = "文章标题不能为空")
        @Size(min = 3, max = 100, message = "标题长度需在3-100个字符之间")
        String title,
        String description,
        @Size(min = 10, max = 10000, message = "内容长度需在10-10000个字符之间")
        @NotEmpty(message = "文章内容不能为空")
        String content,
        @NotNull
        @NumberInList(allowedValues = {0, 1}, message = "文章状态值不合法！")
        Integer status,
        String tagNames,
        @NotNull
        Boolean isProtected,
        String accessPassword
) {
   public List<String> parseTags() {
        if (StringUtils.hasText(tagNames)) {
            return Arrays.asList(tagNames.split("、"));
        }
        return List.of();
    }
}
