package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.entity.dto.SearchResult;
import reactor.core.publisher.Mono;



public interface SearchService {
    Mono<SearchResult> search(SearchQueryDTO dto);
}
