package cn.xilio.turtle.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;


public record ArticleBrief(
        String id,
        String title,
        String description,
        List<String> tags,
        @Column("published_at")
         @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
        LocalDateTime publishedAt,
        @Column("view_count")
        Integer viewCount
) {

}
