package cn.xilio.turtle.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import cn.xilio.turtle.service.ArticleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
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
    @SaCheckRole("admin")
    @SaCheckPermission("article:list")
    public Mono<Result> list(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return articleService.queryAll(page, size).map(r -> {
            Result result = Result.success(r.getData());
            result.put("total", r.getTotal());
            result.put("hasMore", r.getHasMore());
            return result;
        });
    }

    @PostMapping(value = "save", name = "保存文章")
    @SaCheckRole("admin")
    @CachePut(value = "articleCache", key = "#result.data")
    public Mono<Result> save(@RequestBody @Validated CreateArticleDTO dto) {
        return articleService.saveArticle(dto).map(Result::success);
    }

    @GetMapping(value = "get", name = "获取文章详情")
    @SaCheckRole("admin")
    public Mono<Result> get(@RequestParam("id") String id) {
        return articleService.get(id).map(Result::success);
    }

    @DeleteMapping(value = "delete", name = "删除文章")
    @SaCheckRole("admin")
    @CacheEvict(value = "articleCache", key = "#id")
    public Mono<Result> delete(@RequestParam("id") String id) {
        return articleService.deleteArticle(id)
                .then(Mono.just(Result.success()))
                .onErrorResume(ex -> Mono.just(Result.error("删除失败！")));
    }
}
