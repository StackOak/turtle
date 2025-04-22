package cn.xilio.turtle.domain.dto;


import cn.xilio.turtle.domain.entity.navlink.NavLink;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryLinkPair {
    private String categoryId;
    private String categoryName;
    private String categoryDescription;
    private Integer categoryType;
    private Integer categorySort;
    private LocalDateTime categoryCreatedAt;
    private LocalDateTime categoryUpdatedAt;
    private String linkId;
    private String linkCid;
    private String linkTitle;
    private String linkUrl;
    private String linkDescription;
    private String linkLogo;
    private Integer linkSort;
    private LocalDateTime linkCreatedAt;
    private LocalDateTime linkUpdatedAt;
    private Integer linkStatus;

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
