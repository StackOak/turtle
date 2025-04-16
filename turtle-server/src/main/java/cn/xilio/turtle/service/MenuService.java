package cn.xilio.turtle.service;

import reactor.core.publisher.Mono;

import java.util.Optional;

/**
 * @Project Turtle
 * @Description 导航管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface MenuService {
    Mono<Object> getLeftMenus();

}
