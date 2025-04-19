package cn.xilio.turtle.core;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PageResponse<T> {
    private List<T> records;
    private Integer total;
    private Integer page;
    private Integer size;
    private Boolean hasMore;

    public static <T> PageResponse<T> empty() {
        return new PageResponse<>(List.of(), 0, 0, 0,false);
    }

    public PageResponse(List<T> records, Integer total, Integer page, Integer size, Boolean hasMore) {
        this.records = records;
        this.total = total;
        this.page = page;
        this.size = size;
        this.hasMore = hasMore;
    }

    public PageResponse(List<T> records) {
        this.records = records;
    }

    public static <T> PageResponse<T> of(List<T> data) {
        return new PageResponse<T>(data);
    }

    public static <T> PageResponse<T> of(List<T> data, Integer total, Integer page, Integer size, Boolean hasMore) {
        return new PageResponse<T>(data, total, page, size,hasMore);
    }
}
