package cn.xilio.turtle.service;

import reactor.core.publisher.Mono;

import java.util.Map;

public interface ConfigService {


    Mono<Map<String, Object>> getAllConfigs();

}
