package cn.xilio.turtle.service.impl;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.stp.parameter.SaLoginParameter;
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
    public Mono<SaTokenInfo> accountLogin(AccountLoginDTO dto) {
        // 示例1：
// 指定token有效期(单位: 秒)，如下所示token七天有效
        StpUtil.login(10001, new SaLoginParameter().setTimeout(60 * 60 * 24 * 7));

// ----------------------- 示例2：所有参数
// `SaLoginParameter`为登录参数Model，其有诸多参数决定登录时的各种逻辑，例如：
        StpUtil.login(10001, new SaLoginParameter()
                .setDevice("PC")                // 此次登录的客户端设备类型, 用于[同端互斥登录]时指定此次登录的设备类型
                .setIsLastingCookie(true)        // 是否为持久Cookie（临时Cookie在浏览器关闭时会自动删除，持久Cookie在重新打开后依然存在）
                .setTimeout(60 * 60 * 24 * 7)    // 指定此次登录token的有效期, 单位:秒 （如未指定，自动取全局配置的 timeout 值）
                .setToken("xxxx-xxxx-xxxx-xxxx") // 预定此次登录的生成的Token
                .setIsWriteHeader(false)         // 是否在登录后将 Token 写入到响应头
        );

        return Mono.just(StpUtil.getTokenInfo());
    }
}
