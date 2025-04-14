package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.core.common.SearchResult;
import reactor.core.publisher.Mono;

public interface SearchService {
    /**
     * 网站统一搜索
     *
     * @param dto 搜索请求
     * @return 搜索结果
     */
    Mono<SearchResult> search(SearchQueryDTO dto);
}
