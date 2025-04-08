package cn.xilio.xilio.controller;

import cn.xilio.xilio.core.Result;
import cn.xilio.xilio.service.ArticleService;
import cn.xilio.xilio.service.ConfigService;
import cn.xilio.xilio.service.TagService;
import cn.xilio.xilio.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping(value = "article/list", name = "文章列表")
    public Mono<Result> list(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticles(page, size).map(Result::success);
    }

    @GetMapping(value = "article/get-by-tag", name = "根据标签ID获取文章列表")
    public Mono<Result> getByTag(@RequestParam("id") Long tagId,
                                 @RequestParam(defaultValue = "1") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        return Mono.just(Result.success("hello"));
    }

    @GetMapping(value = "tags", name = "分页获取所有标签 ：size=-1表示获取所有")
    public Mono<Result> tags(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return tagService.getTags(page, size).map(Result::success);
    }

    @GetMapping(value = "configs", name = "获取所有配置")
    public Mono<Result> configs() {
        return Mono.just(Result.success("hello"));
    }

    @GetMapping(value = "detail", name = "获取文章详情")
    public Mono<Result> detail(@RequestParam("id") Long id) {
        return Mono.just(Result.success("hello"));
    }

    @GetMapping(value = "about-me", name = "关于我")
    public Mono<Result> aboutMe() {
        return Mono.just(Result.success("hello"));
    }

    @GetMapping(value = "search", name = "统一搜索")
    public Mono<Result> search(@RequestParam("keyword") String keyword,
                               @RequestParam("type") Integer type,
                               @RequestParam(defaultValue = "1") int page,
                               @RequestParam(defaultValue = "10") int size) {
        return Mono.just(Result.success("hello"));
    }
}
