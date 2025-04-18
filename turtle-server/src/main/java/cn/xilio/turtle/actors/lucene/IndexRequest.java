package cn.xilio.turtle.actors.lucene;

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
