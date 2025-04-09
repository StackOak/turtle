package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Config;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ConfigRepository extends ReactiveCrudRepository<Config, String> {
}
