package cn.xilio.turtle.service.impl;

import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.stp.parameter.SaLoginParameter;
import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.core.security.SecureManager;
import cn.xilio.turtle.entity.User;
import cn.xilio.turtle.entity.dto.AccountLoginDTO;
import cn.xilio.turtle.entity.dto.UpdateProfileDTO;
import cn.xilio.turtle.repository.UserRepository;
import cn.xilio.turtle.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import static org.springframework.data.relational.core.query.Criteria.where;
import static org.springframework.data.relational.core.query.Query.query;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private R2dbcEntityTemplate template;

    @Autowired
    private SecureManager secureManager;

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
    public Mono<SaTokenInfo> accountLogin(AccountLoginDTO dto, ServerWebExchange exchange) {
        return template.selectOne(query(where("username").is(dto.username())), User.class)
                .switchIfEmpty(Mono.error(new BizException("用户不存在")))
                .flatMap(user -> secureManager.decrypt(user.getPassword())
                        .flatMap(decryptPassword -> {
                            if (!dto.password().equals(decryptPassword)) {
                                return Mono.error(new BizException("用户密码错误"));
                            }
                            // 使用 try-finally 确保上下文正确清理
                            try {
                                // 1. 设置当前交换到同步上下文
                                SaReactorSyncHolder.setContext(exchange);
                                // 2. 执行同步登录操作
                                StpUtil.login(user.getId(), new SaLoginParameter()
                                        .setDeviceType("PC")
                                        .setIsLastingCookie(true)
                                        .setTimeout(60 * 60 * 24 * 7)
                                        .setIsWriteHeader(false));
                                return Mono.just(StpUtil.getTokenInfo());
                            } finally {
                                // 4. 确保清理上下文
                                SaReactorSyncHolder.clearContext();
                            }
                        })
                );
    }
}
