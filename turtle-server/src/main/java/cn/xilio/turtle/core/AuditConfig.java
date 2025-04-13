//package cn.xilio.turtle.core;
//
//import cn.dev33.satoken.stp.StpUtil;
//import cn.xilio.turtle.entity.User;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.data.domain.ReactiveAuditorAware;
//import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
//import reactor.core.publisher.Mono;
//
//@Configuration
//@EnableR2dbcAuditing
//class AuditConfig {
//  @Bean
//  public ReactiveAuditorAware<User> myAuditorProvider() {
//       return new ReactiveAuditorAware<User>() {
//           @Override
//           public Mono<User> getCurrentAuditor() {
//               String userId = StpUtil.getLoginIdAsString();
//               User user = new User();
//               user.setId(userId);
//               return Mono.just(user);
//           }
//       };
//  }
//}
