package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.entity.dto.SearchType;
import cn.xilio.turtle.service.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "API接口", description = "门户API接口")
public class Api {
    @Autowired
    private UserService userService;
    @Autowired
    private ConfigService configService;
    @Autowired
    private TagService tagService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private SearchService searchService;

    @GetMapping(value = "article/list", name = "文章列表")
    public Mono<Result> list(@RequestParam(value = "keyword", required = false) String keyword, @RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticles(keyword, page, size).map(Result::success);
    }

    @GetMapping(value = "article/get-by-tag", name = "根据标签name获取文章列表")
    public Mono<Result> getArticlesByTag(@RequestParam("tagName") String tagName,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticlesByTag(tagName, page, size).map(r -> {
            Result result = Result.success(r.getData());
            result.put("total", r.getTotal());
            result.put("hasMore", r.getHasMore());
            return result;
        });
    }

    @GetMapping(value = "tags", name = "分页获取所有标签 ：size=-1表示获取所有")
    public Mono<Result> tags(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return tagService.getTags(page, size).map(r -> {
            Result result = Result.success(r.getData());
            result.put("total", r.getTotal());
            result.put("hasMore", r.getHasMore());
            return result;
        });
    }

    @GetMapping(value = "configs", name = "获取所有配置")
    public Mono<Result> configs() {
        return Mono.just(Result.success("hello"));
    }

    @GetMapping(value = "detail", name = "获取文章详情")
    public Mono<Result> detail(@RequestParam("id") String id) {
        return articleService.getArticleDetail(id).map(Result::success);
    }

    @GetMapping(value = "about-me", name = "关于我")
    public Mono<Result> aboutMe() {
        return userService.getAboutMe().map(Result::success);
    }

    @PostMapping(value = "search", name = "统一搜索")
    public Mono<Result> search(@RequestBody @Validated SearchQueryDTO dto) {
        return searchService.search(dto).map(Result::success);
    }
}
