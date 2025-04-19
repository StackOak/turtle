package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;
import lombok.Data;

@Data
@TDocument(indexName = "customers")
public class Customer {
    @TField(index = true)
    private String company;
    @TField(index = true)
    private String address;
}
