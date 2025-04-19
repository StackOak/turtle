package cn.xilio.turtle.core.lucene.request;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchRequest {
    private String index;
    private String keyword;
    private Integer page;
    private Integer size;
}
