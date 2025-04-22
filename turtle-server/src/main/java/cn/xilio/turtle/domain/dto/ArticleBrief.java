package cn.xilio.turtle.domain.dto;

import cn.xilio.turtle.core.lucene.annotations.TDocument;
import cn.xilio.turtle.domain.entity.article.Article;
import cn.xilio.turtle.utils.KMPTextHighlighter;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;

@TDocument(indexName = "article")
public record ArticleBrief(
        String id,
        String title,
        String description,
        List<String> tags,
        @Column("published_at")
        @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount,
        Boolean isProtected
) {
    public static ArticleBrief toArticleBrief(Article article) {
        List<String> tags = Article.parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                tags,
                article.getPublishedAt(),
                article.getViewCount(),
                article.getIsProtected()
        );
    }

    /**
     * 通过KML将关键字高亮显示 只针对标题和文字描述
     *
     * @param article 文章内容
     * @param keyword 搜索关键字
     * @return 处理过的文章
     */
    public static ArticleBrief toArticleBriefWithHighlight(Article article, String keyword) {
        List<String> tags = Article.parseTags(article.getTagNames());
        return new ArticleBrief(
                article.getId(),
                KMPTextHighlighter.highlight(article.getTitle(), keyword),
                KMPTextHighlighter.highlight(article.getDescription(), keyword),
                tags,
                article.getPublishedAt(),
                article.getViewCount(),
                article.getIsProtected()
        );
    }

}
