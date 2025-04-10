package cn.xilio.turtle.entity.dto;

import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.utils.KMPTextHighlighter;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;




public record ArticleBrief(
        String id,
        String title,
        String description,
        List<String> tags,
        @Column("published_at")
         @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount
) {
    public static ArticleBrief toArticleBrief(Article article) {
        List<String> tags = Article.parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                tags,
                article.getPublishedAt(),
                article.getViewCount()
        );
    }
    public static ArticleBrief toArticleBriefWithHighlight(Article article,String keyword) {
        List<String> tags = Article.parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                KMPTextHighlighter.highlight(article.getTitle(),keyword),
                KMPTextHighlighter.highlight(article.getDescription(),keyword),
                tags,
                article.getPublishedAt(),
                article.getViewCount()
        );
    }

}
