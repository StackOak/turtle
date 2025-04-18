package cn.xilio.turtle.actors.lucene;

/**
 * 索引请求
 * @param <T> 文档
 */
public class IndexRequest<T> {
    private final T document;
    private final String id;

    public IndexRequest(T document, String id) {
        this.document = document;
        this.id = id;
    }

    public T getDocument() {
        return document;
    }

    public String getId() {
        return id;
    }
}
