package cn.xilio.xilio.repository;

import cn.xilio.xilio.entity.Tag;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TagRepository extends ReactiveCrudRepository<Tag, String> {
}
