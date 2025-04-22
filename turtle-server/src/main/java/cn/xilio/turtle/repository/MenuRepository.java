package cn.xilio.turtle.repository;

import cn.xilio.turtle.domain.entity.menu.Menu;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;


public interface MenuRepository extends ReactiveCrudRepository<Menu, String> {
}
