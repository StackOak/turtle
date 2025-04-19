package cn.xilio.turtle.lucene;

import cn.xilio.turtle.core.lucene.annotations.TDocument;
import cn.xilio.turtle.core.lucene.annotations.TField;
import lombok.Data;

import java.util.List;

@Data
@TDocument(indexName = "article")
public class ArticleBrief {
    @TField(store = true, index = false)
    private String id;
    @TField(index = true)
    private String title;
    @TField(index = true)
    private String content;
    @TField(store = true, index = false)
    private List<String> tags;
}
