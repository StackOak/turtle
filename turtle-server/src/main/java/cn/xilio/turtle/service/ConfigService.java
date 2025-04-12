package cn.xilio.turtle.service;

import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public interface ConfigService {


    Mono<Map<String, Object>> getAllConfigs();

    Mono<Void> saveConfig(HashMap<String, Object> config);
}
