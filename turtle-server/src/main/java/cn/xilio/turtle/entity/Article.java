package cn.xilio.turtle.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 文章表
 */
@Data
@Table("article")
public class Article {

    /**
     * 文章ID，主键自增
     */
    @Id
    private String id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章简介
     */
    private String description;

    /**
     * 文章内容
     */
    private String content;

    /**
     * 浏览量
     */
    @Column("view_count")
    private Integer viewCount;

    /**
     * 创建时间
     */
    @Column("created_at")
     @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm:ss",iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @Column("updated_at")
     @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm:ss",iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime updatedAt;

    /**
     * 发布时间
     */
    @Column("published_at")
     @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm:ss",iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime publishedAt;


    /**
     * 访问密码（加密存储，可为空）
     */
    @Column("access_password")
    private String accessPassword;


    /**
     * 软删除标记：0未删除，1已删除
     */
    private Byte deleted;

    /**
     * 状态：1已发布，0草稿
     */
    private Integer status;
    /**
     * 文章是否被密码保护
     */
    @Column("is_protected")
    private Boolean isProtected;

    /**
     * 标签冗余列表，用分号分隔
     */
    @Column("tag_names")
    private String tagNames;
    public static List<String> parseTags(String tagNames) {
        if (StringUtils.hasText(tagNames)) {
            return Arrays.asList(tagNames.split("、"));
        }
        return new ArrayList<>();
    }
}
