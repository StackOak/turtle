package cn.xilio.turtle.service;

import cn.xilio.turtle.core.common.PageResponse;

import cn.xilio.turtle.core.common.SearchResult;
import cn.xilio.turtle.entity.Book;
import reactor.core.publisher.Mono;


/**
 * @Project Turtle
 * @Description 知识库服务接口
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface BookService {
    /**
     * 获取书籍
     * @param keyword 查询关键字
     * @param page 分页
     * @param size 记录数
     * @return 知识库列表
     */
    Mono<SearchResult<Book>> getBooks(String keyword, int page, int size);
}
