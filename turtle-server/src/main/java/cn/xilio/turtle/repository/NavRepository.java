package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Menu;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;


public interface NavRepository extends ReactiveCrudRepository<Menu, String> {
}
