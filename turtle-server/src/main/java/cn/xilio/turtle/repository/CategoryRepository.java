package cn.xilio.turtle.repository;


import cn.xilio.turtle.domain.entity.category.Category;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface CategoryRepository extends R2dbcRepository<Category, String> {
}
