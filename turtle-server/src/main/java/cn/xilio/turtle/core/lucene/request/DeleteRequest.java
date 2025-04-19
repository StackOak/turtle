package cn.xilio.turtle.core.lucene.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteRequest {
    /**
     * 文档id
     */
    private final String id;
    /**
     * 索引
     */
    private final String index;
}
