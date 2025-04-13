//
//package cn.xilio.turtle.config;
//
//import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
//import cn.dev33.satoken.util.SaTokenConsts;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//import reactor.core.publisher.Mono;
//
///**
// * 过滤器
// */
//@Component
//@Order(SaTokenConsts.ASSEMBLY_ORDER - 1)
//public class TurtleFilter implements WebFilter {
//    private final Logger logger = LoggerFactory.getLogger(TurtleFilter.class);
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
//        try {
//            SaReactorSyncHolder.setContext(exchange);
//        } finally {
//            SaReactorSyncHolder.clearContext();
//        }
//        return chain.filter(exchange);
//    }
//
//}
