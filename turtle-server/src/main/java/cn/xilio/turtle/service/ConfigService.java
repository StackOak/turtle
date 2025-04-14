package cn.xilio.turtle.service;

import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public interface ConfigService {

    /**
     * 获取网站配置信息
     *
     * @return 配置
     */
    Mono<Map<String, Object>> getAllConfigs();

    /**
     * 保存配置
     *
     * @param config 配置请求
     * @return 空
     */
    Mono<Void> saveConfig(HashMap<String, Object> config);
}
