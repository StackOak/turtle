package cn.xilio.turtle.lucene;

import cn.xilio.turtle.core.lucene.LuceneConfig;
import cn.xilio.turtle.core.lucene.LuceneTemplate;
import cn.xilio.turtle.core.lucene.request.IndexRequest;
import cn.xilio.turtle.core.lucene.request.SearchRequest;
import cn.xilio.turtle.core.PageResponse;

import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        // 配置 Lucene
        LuceneConfig config = new LuceneConfig("./lucene_index", new IKAnalyzer());
        LuceneTemplate client = new LuceneTemplate(config);
        List<String> tags = List.of("java","c++");
        ArticleBrief brief = new ArticleBrief( );
        brief.setId("1001");
        brief.setTitle("文章标题");
        brief.setContent("我弟第一篇文章java");
        brief.setTags(tags);



        IndexRequest<ArticleBrief> indexRequest = IndexRequest.<ArticleBrief>builder()
                .id("1001")
                .document(brief).build();
        client.index(indexRequest);


        SearchRequest request = SearchRequest.builder()
                .index("article")
                .keyword("文章")
                .page(1)
                .size(1)
                .build();

        PageResponse<ArticleBrief> response = client.search(request, ArticleBrief.class);
        System.out.println("Total: " + response.getTotal());
        System.out.println("Page: " + response.getPage());
        System.out.println("Size: " + response.getSize());
        System.out.println("HasMore: " + response.getHasMore());
        for (ArticleBrief article : response.getRecords()) {
            System.out.println(article );

        }
        // 关闭客户端
        client.close();
    }
}
