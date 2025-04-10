package cn.xilio.turtle.service;


import cn.xilio.turtle.core.PageResponse;


import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.ArticleDetail;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.entity.dto.SearchResult;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Stream;

public interface ArticleService {

    public  Mono<PageResponse<ArticleBrief>>queryAll(int page, int size);
    public Mono<String>saveArticle(CreateArticleDTO dto);

    public Mono<SearchResult>getArticles(String keyword,int page, int size);

    public Mono<ArticleDetail>getArticleDetail(String id);
    public Mono<Article>get(String id);


    public Mono<PageResponse<ArticleBrief>>getArticlesByTag(String tagName, int page, int size);

    Mono<Void> deleteArticle(String id);
}
