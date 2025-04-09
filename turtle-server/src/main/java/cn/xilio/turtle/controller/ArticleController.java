package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.service.ArticleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Tag(name = "文章管理", description = "文章管理相关接口")
@RestController
@RequestMapping("article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @PostMapping(value = "list", name = "获取文章列表")
    public Mono<Result> list(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return articleService.queryAll(page, size).map(Result::success);
    }

    @PostMapping(value = "save", name = "保存文章")
    public Mono<Result> save(@RequestBody @Validated CreateArticleDTO dto) {
        return articleService.saveArticle(dto).map(Result::success);
    }

    @GetMapping(value = "get", name = "获取文章详情")
    public Mono<Result> get(@RequestParam("id") Long id) {
        return Mono.just(Result.success());
    }

    @DeleteMapping(value = "delete", name = "删除文章")
    public Mono<Result> delete(@RequestParam("id") Long id) {
        return Mono.just(Result.success());
    }


}
