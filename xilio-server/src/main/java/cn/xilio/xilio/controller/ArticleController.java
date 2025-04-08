package cn.xilio.xilio.controller;

import cn.xilio.xilio.entity.Article;
import cn.xilio.xilio.entity.dto.ArticleDetail;
import cn.xilio.xilio.service.ArticleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Tag(name = "文章管理", description = "文章管理相关接口")
@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;


    // 创建
    @PostMapping
    public Mono<Article> createArticle(@RequestBody Article article) {
        return articleService.createArticle(article);
    }

    // 删除
    @DeleteMapping("/{id}")
    public Mono<Void> deleteArticle(@PathVariable Long id) {
        return articleService.deleteArticle(id);
    }

    // 更新
    @PutMapping("/{id}")
    public Mono<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        return articleService.updateArticle(id, article);
    }

    // 查询单个
    @GetMapping("/{id}")
    public Mono<ArticleDetail> getArticleById(@PathVariable Long id) throws InterruptedException {
        return articleService.getArticleById(id);
    }

    // 分页查询
    @GetMapping("recent")
    public Flux<Article> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticles(page, size);
    }

    // 查询所有
    @GetMapping("/all")
    public Flux<Article> getAllArticles() {
        return articleService.getAllArticles();
    }
}
