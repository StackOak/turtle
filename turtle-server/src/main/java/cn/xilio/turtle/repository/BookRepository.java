package cn.xilio.turtle.repository;

import cn.xilio.turtle.entity.Book;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface BookRepository extends R2dbcRepository<Book, String> {
}
