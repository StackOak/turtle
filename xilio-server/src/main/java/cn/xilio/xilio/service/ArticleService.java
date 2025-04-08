package cn.xilio.xilio.service;


import cn.xilio.xilio.core.PageResponse;

import cn.xilio.xilio.entity.dto.ArticleDetail;
import reactor.core.publisher.Mono;

public interface ArticleService {

    public Mono<PageResponse<ArticleDetail>>getArticles(int page, int size);

}
