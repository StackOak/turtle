package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.ArticleIndex;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.core.PageResponse;
import reactor.core.publisher.Mono;
/**
 * @Project Turtle
 * @Description 统一搜索
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface SearchService {
    /**
     * 网站统一搜索
     *
     * @param dto 搜索请求
     * @return 搜索结果
     */
    Mono<PageResponse<ArticleBrief>> search(SearchQueryDTO dto);
}
