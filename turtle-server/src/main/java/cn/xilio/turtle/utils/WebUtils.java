package cn.xilio.turtle.utils;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

/**
 * @Project Turtle
 * @Description Web工具类
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
import java.net.InetAddress;
import java.util.Optional;

public abstract class WebUtils {

    /**
     * 获取域名或IP:PORT
     *
     * @param exchange 上下文
     * @return 域名或IP:PORT
     */
    public static String getDomain(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();

        // 1. 优先从反向代理头获取（生产环境）
        Optional<String> forwardedDomain = getForwardedDomain(request);
        if (forwardedDomain.isPresent()) {
            return forwardedDomain.get();
        }

        // 2. 从Host头或请求URI获取（直接访问场景）
        String host = Optional.ofNullable(request.getHeaders().getFirst("Host"))
                .orElseGet(() -> request.getURI().getAuthority());

        if (host != null) {
            String scheme = Optional.ofNullable(request.getHeaders().getFirst("X-Forwarded-Proto"))
                    .orElse(request.getURI().getScheme());
            return (scheme != null ? scheme : "http") + "://" + host;
        }

        // 3. 开发环境兜底（本地IP+端口）
        return getDevLocalDomain(request);
    }

    private static Optional<String> getForwardedDomain(ServerHttpRequest request) {
        // 处理标准反向代理头：X-Forwarded-Host + X-Forwarded-Proto
        String forwardedHost = request.getHeaders().getFirst("X-Forwarded-Host");
        if (forwardedHost != null) {
            String proto = Optional.ofNullable(request.getHeaders().getFirst("X-Forwarded-Proto"))
                    .orElse("https");
            return Optional.of(proto + "://" + forwardedHost.split(",")[0].trim());
        }
        return Optional.empty();
    }

    private static String getDevLocalDomain(ServerHttpRequest request) {
        try {
            String ip = InetAddress.getLocalHost().getHostAddress();
            int port = request.getURI().getPort();
            return "http://" + ip + (port != -1 ? ":" + port : "");
        } catch (Exception e) {
            return "http://localhost" + (request.getURI().getPort() != -1 ? ":" + request.getURI().getPort() : "");
        }
    }
}
