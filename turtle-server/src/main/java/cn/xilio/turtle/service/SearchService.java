package cn.xilio.turtle.service;

import cn.xilio.turtle.entity.dto.SearchResult;
import reactor.core.publisher.Mono;



public interface SearchService {
    Mono<SearchResult> search(String keyword, Integer type, Integer page, Integer size);
}
