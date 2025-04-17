package cn.xilio.turtle.config;

import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.reactor.filter.SaReactorFilter;
import cn.dev33.satoken.router.SaHttpMethod;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import cn.xilio.turtle.core.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilter;

/**
 * @Project Turtle
 * @Description 系统权限配置
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@Component
public class SaTokenConfigure {
    private Logger logger = LoggerFactory.getLogger(SaTokenConfigure.class);

    /**
     * 注册 [Sa-Token全局过滤器]
     */
    @Bean
    public WebFilter getSaReactorFilter() {
        return new SaReactorFilter()
                // 指定 [拦截路由]
                .addInclude("/**")
                // 指定 [放行路由]
                .addExclude("/favicon.ico",
                        "/user/login",
                        "/oss/file/**",
                        "/api/**", //网站数据获取接口全部公开 没有交互
                        "/swagger-ui/**",      // Swagger UI 界面
                        "/v3/api-docs/**",     // OpenAPI 规范
                        "/swagger-ui.html",    // Swagger 主页
                        "/webjars/**",         // Swagger 依赖的静态资源
                        "/actuator/**",        // Actuator 端点
                        "/error"               // 错误页面
                ).setBeforeAuth(obj -> {
                    SaHolder.getResponse()
                            // 允许指定域访问跨域资源
                            .setHeader("Access-Control-Allow-Origin", "*")
                            // 允许所有请求方式
                            .setHeader("Access-Control-Allow-Methods", "*")
                            // 允许的header参数
                            .setHeader("Access-Control-Allow-Headers", "*")
                            // 有效时间
                            .setHeader("Access-Control-Max-Age", "3600");
                    SaRouter.match(SaHttpMethod.OPTIONS).free(r -> {
                    }).back();
                })
                // 指定[认证函数]: 每次请求执行
                .setAuth(obj -> {
                    logger.info("进入Auth过滤器");
                    StpUtil.checkLogin(); // 检查登录状态
                    SaRouter.match("/article/**", r -> StpUtil.checkRole("admin"));
                    SaRouter.match("/config/**", r -> StpUtil.checkRole("admin"));
                    SaRouter.match("/file/**", r -> StpUtil.checkRole("admin"));
                    SaRouter.match("/user/**", r -> StpUtil.checkRole("admin"));
                    SaRouter.match("/menu/**", r -> StpUtil.checkRole("admin"));
                    SaRouter.match("/nav-link/**", r -> StpUtil.checkRole("admin"));
                })
                // 指定[异常处理函数]：每次[认证函数]发生异常时执行此函数
                .setError(e -> {
                    logger.error("Auth异常", e);
                    if (e instanceof NotLoginException nle) {
                        return new Result(401, "未登录").toJson();
                    } else {
                        return new Result(403, "无资源访问权限").toJson();
                    }
                });
    }
}
