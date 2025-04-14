package cn.xilio.turtle.controller;

import cn.dev33.satoken.stp.StpUtil;
import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.dto.AccountLoginDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import cn.xilio.turtle.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Tag(name = "用户接口", description = "用户管理")
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    @PutMapping(value = "update-profile", name = "更新用户配置信息")
    public Mono<Result> updateProfile(@RequestBody @Validated UpdateProfileDTO dto) {
        String userId = StpUtil.getLoginIdAsString();
        return userService.updateProfile(userId, dto).then(Mono.just(Result.success()))
                .onErrorResume(ex -> Mono.just(Result.error("更新失败")));
    }

    @PostMapping(value = "login", name = "账户登录")
    public Mono<Result> accountLogin(@RequestBody AccountLoginDTO dto, ServerWebExchange exchange) {
        return userService.accountLogin(dto, exchange).map(Result::success)
                // 日志记录
                .doOnSuccess(result -> logger.info("用户登录成功: {}", dto.username()))
                .doOnError(e -> logger.warn("用户登录失败: {} - {}", dto.username(), e.getMessage()));
    }

    @PostMapping(value = "logout", name = "退出登录")
    public Mono<Result> logout() {
        return userService.logout().then(Mono.just(Result.success()));
    }
}
