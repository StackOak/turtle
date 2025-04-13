
package cn.xilio.turtle.config;

import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.server.RequestPath;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * 自定义过滤器
 */
@Component
@Order(1)
public class MyFilter implements WebFilter {

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
		System.out.println("进入自定义过滤器");

		try {
			// 先 set 上下文，再调用 Sa-Token 同步 API，并在 finally 里清除上下文
			SaReactorSyncHolder.setContext(exchange);
			System.out.println("-----------------------");
			RequestPath path = exchange.getRequest().getPath();
			System.out.println(path);
			System.out.println("是否登陆："+StpUtil.isLogin());
			System.out.println("-----------------------");

			exchange.getResponse().getHeaders().set(
					HttpHeaders.CONTENT_TYPE,
					MediaType.APPLICATION_JSON_VALUE
			);
		}
		finally {
			SaReactorSyncHolder.clearContext();
		}

		return chain.filter(exchange);
	}

}
