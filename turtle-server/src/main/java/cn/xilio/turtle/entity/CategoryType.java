package cn.xilio.turtle.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryType {
    NAV_LINK(1, "导航链接分类"),
    ;
    private final Integer type;
    private final String desc;
}
