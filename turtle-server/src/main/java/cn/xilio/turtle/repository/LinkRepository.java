package cn.xilio.turtle.repository;


import cn.xilio.turtle.entity.NavLink;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface LinkRepository extends R2dbcRepository<NavLink, String> {
}
