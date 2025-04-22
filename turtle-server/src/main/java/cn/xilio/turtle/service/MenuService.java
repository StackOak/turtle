package cn.xilio.turtle.service;

import cn.xilio.turtle.domain.entity.menu.MenuType;
import reactor.core.publisher.Mono;

/**
 * @Project Turtle
 * @Description 导航管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface MenuService {
    /**
     * 获取门户首页左侧导航菜单
     *
     * @return 菜单树
     */
    public Mono<Object> getMenusByMenuType(MenuType menuType, String userId);
}
