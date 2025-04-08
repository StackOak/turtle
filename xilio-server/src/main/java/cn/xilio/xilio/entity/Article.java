package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;


import java.time.LocalDateTime;
/**
 * @author xilio
 */
@Data
@Table("article")
public class Article {
    @Id
    private Long id; // 文章ID，主键自增

    @Column("title")
    private String title; // 文章标题

    @Column("description")
    private String description; // 文章简介

    @Column("content")
    private String content; // 文章内容

    @Column("view_count")
    private Integer viewCount; // 浏览量

    @Column("created_at")
    private LocalDateTime createdAt; // 创建时间

    @Column("updated_at")
    private LocalDateTime updatedAt; // 更新时间

    @Column("publish_at")
    private LocalDateTime publishAt; // 发布时间

    @Column("created_by")
    private Long createdBy; // 创建者ID

    @Column("access_password")
    private String accessPassword; // 访问密码（加密存储，可为空）

    @Column("updated_by")
    private Long updatedBy; // 更新者ID

    @Column("deleted")
    private Integer deleted; // 软删除标记：0未删除，1已删除

    @Column("status")
    private Integer status; // 状态：1已发布，0草稿

    @Column("tag_names")
    private String tagNames; // 标签冗余列表，用分号分隔
}
