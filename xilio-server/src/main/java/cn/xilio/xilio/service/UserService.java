package cn.xilio.xilio.service;

import reactor.core.publisher.Mono;

public interface UserService {

    public Mono<String>getAboutMe();
}
