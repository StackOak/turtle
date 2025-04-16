package cn.xilio.turtle.controller;

import cn.dev33.satoken.stp.StpUtil;
import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.entity.MenuType;
import cn.xilio.turtle.entity.dto.SearchQueryDTO;
import cn.xilio.turtle.service.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

/**
 * @Project Turtle
 * @Description 门户网站所有接口
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@RestController
@RequestMapping("${cn.xilio.turtle.api.prefix}/v1")
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
    @Autowired
    private MenuService menuService;
    @Autowired
    private BookService bookService;
    @Autowired
    private NavLinkService navLinkService;

    @GetMapping(value = "article/list", name = "最近文章列表")
    public Mono<Result> list(@RequestParam(value = "keyword", required = false) String keyword, @RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticles(keyword, page, size).map(Result::success);
    }

    @GetMapping(value = "article/get-by-tag", name = "根据标签name获取文章列表")
    public Mono<Result> getArticlesByTag(@RequestParam("tagName") String tagName,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        return articleService.getArticlesByTag(tagName, page, size).map(r -> {
            Result result = Result.success(r.getRecords());
            result.put("total", r.getTotal());
            result.put("hasMore", r.getHasMore());
            return result;
        });
    }

    @GetMapping(value = "tags", name = "分页获取所有标签")
    public Mono<Result> tags(@RequestParam(defaultValue = "1") int page,
                             @RequestParam(defaultValue = "10") int size) {
        return tagService.getTags(page, size).map(r -> {
            Result result = Result.success(r.getRecords());
            result.put("total", r.getTotal());
            result.put("hasMore", r.getHasMore());
            return result;
        });
    }

    @GetMapping(value = "configs", name = "获取网站配置")
    public Mono<Result> configs() {
        return configService.getAllConfigs().map(Result::success);
    }

    @GetMapping(value = "detail", name = "获取文章详情")
    public Mono<Result> detail(@RequestParam("id") String id,
                               @RequestParam(value = "pwd", required = false) String pwd) {
        return articleService.getArticleDetail(id, pwd).map(Result::success);
    }

    @GetMapping(value = "about-me", name = "关于我")
    public Mono<Result> aboutMe() {
        return userService.getAboutMe().map(Result::success);
    }

    @PostMapping(value = "search", name = "统一搜索")
    public Mono<Result> search(@RequestBody @Validated SearchQueryDTO dto) {
        return searchService.search(dto).map(Result::success);
    }

    @GetMapping(value = "book/list", name = "获取文档列表")
    public Mono<Result> getBooks(@RequestParam(value = "keyword", required = false) String keyword, @RequestParam(defaultValue = "1") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        return bookService.getBooks(keyword, page, size).map(Result::success);
    }

    @GetMapping(value = "book/items", name = "获取知识库大纲")
    public Mono<Result> getBookItems(@RequestParam(value = "bookId") String bookId) {
        return bookService.getBookItems(bookId).map(Result::success);
    }

    @GetMapping(value = "book/item-content", name = "获取知识库内容详情")
    public Mono<Result> getBookItemContent(@RequestParam(value = "itemId") String itemId) {
        return bookService.getBookContent(itemId).map(Result::success);
    }

    @GetMapping(value = "left-menus", name = "获取首页左侧导航菜单")
    public Mono<Result> getLeftMenus() {
        String userId = null;
        if (StpUtil.isLogin()) {
            userId = StpUtil.getLoginIdAsString();
        }
        return menuService.getMenusByMenuType(MenuType.PORTAL_LEFT, userId).map(Result::success);
    }
}
