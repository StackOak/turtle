package cn.xilio.turtle.service;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.xilio.turtle.entity.dto.AccountLoginDTO;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface UserService {

    public Mono<String>getAboutMe();

    Mono<Void> updateProfile(String userId, UpdateProfileDTO dto);

    Mono<SaTokenInfo> accountLogin(AccountLoginDTO dto, ServerWebExchange exchange);

    Mono<Void> logout(   );

}
