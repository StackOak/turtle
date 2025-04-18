package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.DeleteRequest;

public class Test {
    public static void main(String[] args) {
        DeleteRequest deleteRequest = DeleteRequest.builder().index("test").id("1").build();
    }
}
