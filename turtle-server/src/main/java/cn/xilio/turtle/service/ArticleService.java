package cn.xilio.turtle.service;


import cn.xilio.turtle.core.PageResponse;


import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.ArticleDetail;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ArticleService {

    public  Mono<PageResponse<ArticleBrief>>queryAll(int page, int size);
    public Mono<Long>saveArticle(CreateArticleDTO dto);

    public Mono<PageResponse<ArticleBrief>>getArticles(int page, int size);

    public Mono<ArticleDetail>getArticleDetail(Long id);

    public Mono<PageResponse<ArticleBrief>>getArticlesByTag(String tagName, int page, int size);
}
