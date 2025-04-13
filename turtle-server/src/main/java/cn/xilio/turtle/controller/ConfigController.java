package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.service.ConfigService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;

@Tag(name = "配置管理", description = "配置接口")
@RestController
@RequestMapping("config")
public class ConfigController {
    @Autowired
    private ConfigService configService;

    @PostMapping("save")
    public Mono<Result> save(@RequestBody HashMap<String, Object> config) {
        return configService.saveConfig(config).then(Mono.just(Result.success()));
    }

    @GetMapping("get")
    public Mono<Result> getSiteConfig() {
        return configService.getAllConfigs().map(Result::success);
    }
}
