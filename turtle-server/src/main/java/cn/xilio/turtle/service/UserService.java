package cn.xilio.turtle.service;

import reactor.core.publisher.Mono;

public interface UserService {

    public Mono<String>getAboutMe();
}
