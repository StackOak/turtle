package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface UserService {

    public Mono<String>getAboutMe();

    Mono<Void> updateProfile(String userId, UpdateProfileDTO dto);
}
