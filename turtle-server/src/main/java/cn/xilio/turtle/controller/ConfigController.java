package cn.xilio.turtle.controller;

import cn.xilio.turtle.service.ConfigService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "配置管理", description = "配置接口")
@RestController
@RequestMapping("config")
public class ConfigController {
    @Autowired
    private ConfigService configService;
}
