package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.*;
import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;

@TDocument(indexName = "users")
public class User {
    @TField(name = "name", index = true, store = true)
    private String name;

    @TField(name = "age", type = FieldType.Integer, index = true, store = true)
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

