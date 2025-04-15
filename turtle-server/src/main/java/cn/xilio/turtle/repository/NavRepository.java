package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Nav;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;


public interface NavRepository extends ReactiveCrudRepository<Nav, String> {
}
