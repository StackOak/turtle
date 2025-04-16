package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.entity.Category;

import cn.xilio.turtle.entity.NavLink;
import org.springframework.data.relational.core.mapping.Column;

import java.time.Instant;
import java.time.LocalDateTime;

public record CategoryLinkPair(
        @Column("category_id") String categoryId,
        @Column("category_name") String categoryName,
        @Column("category_description") String categoryDescription,
        @Column("category_type") Integer categoryType,
        @Column("category_sort") Integer categorySort,
        @Column("category_created_at") LocalDateTime categoryCreatedAt,
        @Column("category_updated_at") LocalDateTime categoryUpdatedAt,
        @Column("link_id") String linkId,
        @Column("link_cid") String linkCid,
        @Column("link_title") String linkTitle,
        @Column("link_url") String linkUrl,
        @Column("link_description") String linkDescription,
        @Column("link_logo") String linkLogo,
        @Column("link_sort") Integer linkSort,
        @Column("link_created_at") LocalDateTime linkCreatedAt,
        @Column("link_updated_at") LocalDateTime linkUpdatedAt,
        @Column("link_status") Integer linkStatus
) {
    public Category toCategory() {
        Category category = new Category();
        category.setId(categoryId);
        category.setName(categoryName);
        category.setDescription(categoryDescription);
        category.setType(categoryType);
        category.setSort(categorySort);
        category.setCreatedAt(categoryCreatedAt);
        category.setUpdatedAt(categoryUpdatedAt);
        return category;
    }

    public NavLink toNavLink() {
        if (linkId == null) return null;
        NavLink link = new NavLink();
        link.setId(linkId);
        link.setCid(linkCid);
        link.setTitle(linkTitle);
        link.setUrl(linkUrl);
        link.setDescription(linkDescription);
        link.setLogo(linkLogo);
        link.setSort(linkSort);
        link.setCreatedAt(linkCreatedAt);
        link.setUpdatedAt(linkUpdatedAt);
        link.setStatus(linkStatus);
        return link;
    }
}
