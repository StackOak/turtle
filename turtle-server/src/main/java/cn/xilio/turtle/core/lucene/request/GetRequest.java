package cn.xilio.turtle.core.lucene.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetRequest {
    private final String id;
    private final String index;
}
