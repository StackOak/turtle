package cn.xilio.turtle.lucene;

import cn.xilio.turtle.core.lucene.LuceneConfig;
import cn.xilio.turtle.core.lucene.LuceneTemplate;
import cn.xilio.turtle.core.lucene.request.IndexRequest;
import cn.xilio.turtle.core.lucene.request.SearchRequest;
import cn.xilio.turtle.core.PageResponse;
import cn.xilio.turtle.entity.Article;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        // 配置 Lucene
        LuceneConfig config = new LuceneConfig("./lucene_index", new IKAnalyzer());
        LuceneTemplate client = new LuceneTemplate(config);

        Article article1 = new Article();
        article1.setTitle("我的第一篇vue文章");
        article1.setContent("This is a  sample article。这篇文章非常厉害，有很多技术问题需要解决我是干嘛还是文章的问题不错哈");
        IndexRequest<Article> indexRequest = IndexRequest.<Article>builder().id("1").document(article1).build();
        client.index(indexRequest);

        Article article2 = new Article();
        article2.setTitle("我的第一篇vue文章数据库");
        article2.setContent("This is a  不错哈");
        IndexRequest<Article> indexRequest2 = IndexRequest.<Article>builder().id("2").document(article2).build();
        client.index(indexRequest2);

        SearchRequest request = SearchRequest.builder()
                .index("article")
                .keyword("文章")
                .page(2)
                .size(1)
                .build();

        PageResponse<Article> response = client.search(request, Article.class);
        System.out.println("Total: " + response.getTotal());
        System.out.println("Page: " + response.getPage());
        System.out.println("Size: " + response.getSize());
        System.out.println("HasMore: " + response.getHasMore());
        for (Article article : response.getRecords()) {
            System.out.println("Title: " + article.getTitle());
            System.out.println("Content: " + article.getContent());

        }
        // 关闭客户端
        client.close();
    }
}
