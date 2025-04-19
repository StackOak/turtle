package cn.xilio.turtle.lucene;


import cn.xilio.turtle.core.lucene.annotations.TDocument;
import cn.xilio.turtle.core.lucene.annotations.TField;

@TDocument(indexName = "users")
public class User {
    @TField(store = true, index = true)
    private String name;

    @TField(store = true, index = false)
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

