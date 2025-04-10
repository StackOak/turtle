package cn.xilio.turtle.entity.dto;

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

    public static <T> SearchResult<T> empty() {
        return new SearchResult<>(List.of(), 0, 0, 0);
    }

    public SearchResult(List<T> data, Integer total, Integer page, Integer size) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.size = size;
    }

    public SearchResult(List<T> data) {
        this.data = data;
    }

    public static <T> SearchResult<T> of(List<T> data) {
        return new SearchResult<T>(data);
    }

    public static <T> SearchResult<T> of(List<T> data, Integer total, Integer page, Integer size) {
        return new SearchResult<T>(data, total, page, size);
    }
}
