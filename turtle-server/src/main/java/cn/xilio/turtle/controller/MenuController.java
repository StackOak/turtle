package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.MenuType;
import cn.xilio.turtle.service.MenuService;
import cn.xilio.turtle.utils.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

/**
 * @Project Turtle
 * @Description 导航管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@Tag(name = "菜单接口", description = "菜单管理")
@RestController
@RequestMapping("menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping(value = "list", name = "获取菜单")
    public Mono<Result> getMenus() {
        String userId = SecurityUtils.getLoginUserIdOrNull();
        return menuService.getMenusByMenuType(MenuType.ADMIN,userId).map(Result::success);
    }
}
