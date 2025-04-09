package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.entity.User;
import cn.xilio.turtle.repository.UserRepository;
import cn.xilio.turtle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Mono<String> getAboutMe() {
        return userRepository.findById(1L)
                .map(User::getAboutMe)
                .switchIfEmpty(Mono.error(new BizException("访问出错，请联系站长！")));
    }
}
