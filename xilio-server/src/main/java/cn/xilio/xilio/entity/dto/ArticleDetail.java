package cn.xilio.xilio.entity.dto;

import cn.xilio.xilio.entity.Tag;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;


public record ArticleDetail(
        Long id,
        String title,
        String description,
        List<String> tags,
        @Column("published_at")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount
) {

}
