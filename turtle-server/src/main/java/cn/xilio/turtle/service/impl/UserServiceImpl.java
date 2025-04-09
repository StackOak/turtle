package cn.xilio.turtle.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.entity.User;
import cn.xilio.turtle.entity.dto.AccountLoginDTO;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import cn.xilio.turtle.repository.UserRepository;
import cn.xilio.turtle.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Mono<String> getAboutMe() {
        return userRepository.findById("1")
                .map(User::getAboutMe)
                .switchIfEmpty(Mono.error(new BizException("访问出错，请联系站长！")));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Mono<Void> updateProfile(String userId, UpdateProfileDTO dto) {
        return userRepository.findById(userId).flatMap(user -> {
            BeanUtils.copyProperties(dto, user);
            return userRepository.save(user);
        }).then();
    }

    @Override
    public Mono<Object> accountLogin(AccountLoginDTO dto) {
        StpUtil.login(10001);
        return null;
    }
}
