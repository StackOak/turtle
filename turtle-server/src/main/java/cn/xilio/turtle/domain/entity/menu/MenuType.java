package cn.xilio.turtle.domain.entity.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MenuType {
    PORTAL_LEFT(1, "门户首页菜单"),
    ADMIN(2, "管理后台菜单");
    private final Integer type;
    private final String desc;
}
