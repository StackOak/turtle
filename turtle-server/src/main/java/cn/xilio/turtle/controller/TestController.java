package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.lucene.LuceneTemplate;
import cn.xilio.turtle.core.lucene.request.GetRequest;
import cn.xilio.turtle.core.lucene.request.IndexRequest;
import cn.xilio.turtle.domain.entity.article.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequestMapping("/test")
@RestController
public class TestController {
    @Autowired
    private LuceneTemplate luceneClient;
    @GetMapping("/saveIndex")
    public Object saveIndex() throws IOException {
        Article article = new Article();
        article.setTitle("测试");
        IndexRequest<Object> req = IndexRequest.builder().id("1").document(article).build();
        luceneClient.index(req);
        Article article1 = luceneClient.get(GetRequest.builder().index("article").id("1").build(), Article.class);
        return article1;
    }
}
