package cn.xilio.xilio.entity.dto;

import cn.xilio.xilio.entity.Tag;
import lombok.Data;

import java.util.List;

@Data
public class ArticleDetail {
    private Long id;
    private String title;
    private String content;
    private List<Tag> tags;
}
