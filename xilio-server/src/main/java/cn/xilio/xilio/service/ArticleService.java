package cn.xilio.xilio.service;


import cn.xilio.xilio.entity.Article;
import cn.xilio.xilio.entity.dto.ArticleDetail;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ArticleService {

    // 增
    public Mono<Article> createArticle(Article article);

    // 删
    public Mono<Void> deleteArticle(Long id);

    // 改
    public Mono<Article> updateArticle(Long id, Article article);


    // 查单个
    public Mono<ArticleDetail> getArticleById(Long id);


    // 分页查询
    public Flux<Article> getArticles(int page, int size);

    // 查询所有
    public Flux<Article> getAllArticles();

}
