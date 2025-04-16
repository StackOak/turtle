package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.dto.NavLinkCategoryDTO;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * @Project Turtle
 * @Description 导航链接 用于管理常用网站 快速链接到网站
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */

public interface NavLinkService {
    Mono<List<NavLinkCategoryDTO>> getNavLinks();

}
