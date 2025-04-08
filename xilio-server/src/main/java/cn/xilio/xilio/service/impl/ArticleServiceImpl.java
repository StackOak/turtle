package cn.xilio.xilio.service.impl;

import cn.xilio.xilio.core.PageResponse;
import cn.xilio.xilio.entity.Article;
import cn.xilio.xilio.entity.dto.ArticleBrief;
import cn.xilio.xilio.entity.dto.ArticleDetail;
import cn.xilio.xilio.repository.ArticleRepository;
import cn.xilio.xilio.service.ArticleService;
import com.baidu.fsg.uid.UidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private UidGenerator uidGenerator;
    @Autowired
    private R2dbcEntityTemplate template;

    @Override
    public Mono<PageResponse<ArticleBrief>> getArticles(int page, int size) {
        int offset = (size == -1) ? 0 : (page - 1) * size;
        int effectiveLimit = (size == -1) ? Integer.MAX_VALUE : size;

        return Mono.zip(
                articleRepository.findActiveArticles(effectiveLimit, offset)
                        .map(this::toArticleBrief)
                        .collectList(),
                articleRepository.countActiveArticles(1)
        ).map(tuple -> {
            PageResponse<ArticleBrief> response = new PageResponse<>();
            response.setData(tuple.getT1());
            response.setTotal(tuple.getT2());
            response.setHasMore(size != -1 && (page * size) < tuple.getT2());
            return response;
        });
    }
    private ArticleBrief toArticleBrief(Article article) {
        List<String> tags = parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                tags,
                article.getPublishedAt(),
                article.getViewCount()
        );
    }
    @Override
    public Mono<ArticleDetail> getArticleDetail(Long id) {
        return articleRepository.findPublishArticleById(id)
                .map(this::toArticleDetail)
                .switchIfEmpty(Mono.empty()); // 如果未找到，返回空
    }
    // 实体转换为 DTO
    private ArticleDetail toArticleDetail(Article article) {
        List<String> tags = ( StringUtils.hasText(article.getTagNames()))
                ? Arrays.asList(article.getTagNames().split("、"))
                : Collections.emptyList();
        return new ArticleDetail(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                tags,
                article.getPublishedAt(),
                article.getViewCount(),
                article.getCreatedAt(),
                article.getUpdatedAt()
        );
    }



    private static List<String> parseTags(String tagNames) {
        if (StringUtils.hasText(tagNames)) {
            return Arrays.asList(tagNames.split("、"));
        }
        return new ArrayList<>();
    }

}
