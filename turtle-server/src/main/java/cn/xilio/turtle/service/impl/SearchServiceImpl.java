package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.core.common.PageResponse;
import cn.xilio.turtle.entity.dto.SearchType;
import cn.xilio.turtle.service.ArticleService;
import cn.xilio.turtle.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private ArticleService articleService;

    @Override
    public Mono<PageResponse> search(SearchQueryDTO dto) {
        if (SearchType.ARTICLE.equals(SearchType.fromType(dto.type()))) {
            //非全文检索 模糊匹配标题和文章描述
            return articleService.getArticles(dto.keyword(), dto.page(), dto.size());
        }
        return Mono.empty();
    }
}
