package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.FieldType;
import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;
import lombok.Data;

@Data
@TDocument(indexName = "customer", createIndex = true)
public class Customer {
    @TField(name = "name", index = true, store = true)
    private String customerName;

    @TField(name = "age", type = FieldType.Integer, index = true, store = true)
    private int age;
}
