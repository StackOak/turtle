package cn.xilio.turtle.service;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.xilio.turtle.domain.dto.AccountLoginDTO;
import cn.xilio.turtle.domain.dto.UpdateProfileDTO;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * @Project Turtle
 * @Description 用户管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface UserService {
    /**
     * 关于我
     *
     * @return 信息
     */
    public Mono<String> getAboutMe();

    /**
     * 更新用户配置信息
     *
     * @param userId 用户ID
     * @param dto    用户信息
     * @return 空
     */
    Mono<Void> updateProfile(String userId, UpdateProfileDTO dto);

    /**
     * 账户登录
     *
     * @param dto      登陆信息
     * @param exchange web上下文
     * @return 令牌信息
     */
    Mono<SaTokenInfo> accountLogin(AccountLoginDTO dto, ServerWebExchange exchange);

    /**
     * 退出登陆
     */
    Mono<Void> logout();

}
