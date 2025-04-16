package cn.xilio.turtle.utils;

import cn.dev33.satoken.stp.StpUtil;

/**
 * @Project Turtle
 * @Description 安全认证工具类
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public abstract class SecurityUtils {
    /**
     * 如果登陆则 获取登陆用户ID 没有登陆返回空
     * @return 登陆用户ID
     */
    public static  String getLoginUserIdOrNull() {
        if (StpUtil.isLogin()) {
            return StpUtil.getLoginIdAsString();
        } else {
            return null;
        }
    }
}
