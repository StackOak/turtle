package cn.xilio.turtle.core.common;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SearchResult<T> {
    private List<T> data;
    private Integer total;
    private Integer page;
    private Integer size;
    private Boolean hasMore;

    public static <T> SearchResult<T> empty() {
        return new SearchResult<>(List.of(), 0, 0, 0,false);
    }

    public SearchResult(List<T> data, Integer total, Integer page, Integer size,Boolean hasMore) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.size = size;
        this.hasMore = hasMore;
    }

    public SearchResult(List<T> data) {
        this.data = data;
    }

    public static <T> SearchResult<T> of(List<T> data) {
        return new SearchResult<T>(data);
    }

    public static <T> SearchResult<T> of(List<T> data, Integer total, Integer page, Integer size,Boolean hasMore) {
        return new SearchResult<T>(data, total, page, size,hasMore);
    }
}
