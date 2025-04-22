package cn.xilio.turtle.repository;

import cn.xilio.turtle.domain.entity.user.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface UserRepository extends ReactiveCrudRepository<User, String> {
}
