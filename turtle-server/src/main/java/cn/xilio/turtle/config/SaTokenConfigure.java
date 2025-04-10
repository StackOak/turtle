package cn.xilio.turtle.config;

import cn.dev33.satoken.reactor.filter.SaReactorFilter;
import cn.dev33.satoken.stp.StpUtil;
import cn.xilio.turtle.core.Result;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.WebFilter;

/**
 * [Sa-Token 权限认证] 全局配置类
 * 一定要配置，不然导致获取不到上下文
 */
@Configuration
public class SaTokenConfigure {
    /**
     * 注册 [Sa-Token全局过滤器]
     */
    @Bean
    public WebFilter getSaReactorFilter() {
        return new SaReactorFilter()
//                // 指定 [拦截路由]
//                .addInclude("/**")
//                // 指定 [放行路由]
//                .addExclude("/favicon.ico",
//                        "/user/login",
//                        "/api/**",
//                        "/article/**",
//                        "/swagger-ui/**",      // Swagger UI 界面
//                        "/v3/api-docs/**",     // OpenAPI 规范
//                        "/swagger-ui.html",    // Swagger 主页
//                        "/webjars/**",         // Swagger 依赖的静态资源
//                        "/actuator/**",        // Actuator 端点
//                        "/error"               // 错误页面
//                        )
                // 指定[认证函数]: 每次请求执行
                .setAuth(obj -> {

                    System.out.println("---------- sa全局认证");
                    StpUtil.checkLogin(); // 检查登录状态
                })
                // 指定[异常处理函数]：每次[认证函数]发生异常时执行此函数
                .setError(e -> {
                    System.out.println("---------- sa全局异常 ");
                    return Result.error(e.getMessage());
                });
    }
}
