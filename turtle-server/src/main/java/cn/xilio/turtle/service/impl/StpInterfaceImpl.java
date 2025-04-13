package cn.xilio.turtle.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import cn.dev33.satoken.stp.StpInterface;

/**
 * 权限验证接口,获取用户的角色和资源权限
 */
@Component
public class StpInterfaceImpl implements StpInterface {

    /**
     * 返回一个账号所拥有的权限码集合
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return List.of();
    }

    /**
     * 返回一个账号所拥有的角色标识集合
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        return List.of("admin");
    }

}
