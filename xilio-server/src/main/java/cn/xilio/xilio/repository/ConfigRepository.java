package cn.xilio.xilio.repository;

import cn.xilio.xilio.entity.Config;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ConfigRepository extends ReactiveCrudRepository<Config, String> {
}
