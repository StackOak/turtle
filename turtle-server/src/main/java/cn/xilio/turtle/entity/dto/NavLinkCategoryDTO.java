package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.entity.Category;
import cn.xilio.turtle.entity.NavLink;

import java.util.List;

/**
 * 链接分类
 *
 * @param category 分类对象
 * @param links    分类包含的链接
 */
public record NavLinkCategoryDTO(
        Category category,
        List<NavLink> links
) {
}
