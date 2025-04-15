package cn.xilio.turtle.controller;

import cn.xilio.turtle.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("book")
public class BookController {
    @Autowired
    private BookService bookService;


}
