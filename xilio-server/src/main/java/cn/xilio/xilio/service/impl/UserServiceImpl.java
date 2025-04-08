package cn.xilio.xilio.service.impl;

import cn.xilio.xilio.core.BizException;
import cn.xilio.xilio.entity.User;
import cn.xilio.xilio.repository.UserRepository;
import cn.xilio.xilio.service.UserService;
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
