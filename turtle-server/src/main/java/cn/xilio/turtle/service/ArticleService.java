package cn.xilio.turtle.service;


import cn.xilio.turtle.core.common.PageResponse;


import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.dto.ArticleBrief;
import cn.xilio.turtle.entity.dto.ArticleDetail;
import cn.xilio.turtle.entity.dto.CreateArticleDTO;
import reactor.core.publisher.Mono;
/**
 * @Project Turtle
 * @Description 文章管理
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface ArticleService {
    /**
     * 查询文章 管理端使用 没有status文章状态的限制
     *
     * @param page 分页
     * @param size 每一页大小
     * @return
     */
    public Mono<PageResponse<ArticleBrief>> queryAll(int page, int size);

    /**
     * 保存或更新文章
     *
     * @param dto 文章信息
     * @return 文章ID
     */
    public Mono<String> saveArticle(CreateArticleDTO dto);

    /**
     * 获取文章列表
     *
     * @param keyword 搜索关键字【可选】如果有关键字 标题和描述会高亮显示 基于KMP算法
     * @param page    页 从1开始
     * @param size    没一页大小
     * @return 文章列表
     */
    @SuppressWarnings("all")
    public Mono<PageResponse> getArticles(String keyword, int page, int size);

    /**
     * 获取文章详情 status=1且deleted=0
     *
     * @param id  文章唯一标识
     * @param pwd 密码 可选 如果是加密的文章必须输入密码
     * @return 文章详情
     */
    public Mono<ArticleDetail> getArticleDetail(String id, String pwd);

    /**
     * 获取文章详情 deleted=0
     *
     * @param id 文章ID
     * @return 文章信息
     */
    public Mono<Article> get(String id);

    /**
     * 通过标签名字分页获取文章列表
     *
     * @param tagName 标签名
     * @param page    分页 从1开始
     * @param size    每一页大小
     * @return 文章列表
     */
    public Mono<PageResponse<ArticleBrief>> getArticlesByTag(String tagName, int page, int size);

    /**
     * 逻辑删除文章 置：deleted=1
     *
     * @param id 文章ID
     * @return 空
     */
    Mono<Void> deleteArticle(String id);
}
