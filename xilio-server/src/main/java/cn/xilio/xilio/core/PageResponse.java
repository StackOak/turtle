package cn.xilio.xilio.core;

import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T> {
    private List<T> data;       // 分页数据
    private long total;         // 总记录数
    private boolean hasMore;    // 是否有更多数据
}
