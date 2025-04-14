package cn.xilio.turtle.controller;

import cn.xilio.turtle.service.NavService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * @Project Turtle
 * @Description 导航管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@Tag(name = "导航接口", description = "导航管理")
@RestController
@RequestMapping("nav")
public class NavController {
    @Autowired
    private NavService navService;
}
