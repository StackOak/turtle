package cn.xilio.turtle.domain.dto;

import cn.xilio.turtle.core.validate.NumberInList;
import jakarta.validation.constraints.*;

public record SearchQueryDTO(
        @Size(max = 1024, message = "keyword长度不能超过1024")
        @NotEmpty(message = "keyword不能为空")
        String keyword,
        @NotNull(message = "page不能为空")
        @Min(value = 1, message = "每页数量最小为1")
        Integer page,
        @NotNull(message = "size不能为空")
        @Min(value = 1, message = "每页数量最小为1")
        @Max(value = 1000, message = "每页数量最大为1000")
        Integer size,
        @NotNull(message = "type不能为空")
        @NumberInList(allowedValues = {1}, message = "type参数错误")
        Integer type
) {
}
