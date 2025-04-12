package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.entity.dto.ConfigDTO;
import cn.xilio.turtle.repository.ConfigRepository;
import cn.xilio.turtle.service.ConfigService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConfigServiceImpl implements ConfigService {
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private ConfigRepository configRepository;

    @Override
    public Mono<Map<String, Object>> getAllConfigs() {
        return configRepository.findAll()
                .flatMap(config -> {
                        // 解析 JSON 配置
                        Map<String, Object> jsonMap = new Gson().fromJson(
                                config.getConfigJson(),
                                Map.class);
                        // 返回 ConfigDTO 的 Mono
                        return Mono.just(new ConfigDTO(config.getConfigKey(), jsonMap));
                })
                .collectList()
                .map(configList -> {
                    Map<String, Object> resultMap = new HashMap<>();
                    configList.forEach(configDTO -> {
                        resultMap.put(configDTO.configKey(), configDTO.configJson());
                    });
                    return resultMap;
                });
    }
}
