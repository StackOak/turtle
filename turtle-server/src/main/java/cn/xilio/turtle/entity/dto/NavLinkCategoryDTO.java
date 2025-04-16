package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.entity.NavLink;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 链接分类
 *
 * @param links 分类包含的链接
 */
public record NavLinkCategoryDTO(
        String id,
        String name,
        String description,
        Integer type,
        Integer sort,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<NavLink> links
) {
}
