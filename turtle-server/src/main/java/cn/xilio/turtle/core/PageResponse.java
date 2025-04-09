package cn.xilio.turtle.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> data;       // 分页数据
    private int total;         // 总记录数
    private boolean hasMore;    // 是否有更多数据
}
