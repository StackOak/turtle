package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

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
    private Long id;

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
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @Column("updated_at")
    private LocalDateTime updatedAt;

    /**
     * 发布时间
     */
    @Column("publish_at")
    private LocalDateTime publishAt;

    /**
     * 创建者ID
     */
    @Column("created_by")
    private Long createdBy;

    /**
     * 访问密码（加密存储，可为空）
     */
    @Column("access_password")
    private String accessPassword;

    /**
     * 更新者ID
     */
    @Column("updated_by")
    private Long updatedBy;

    /**
     * 软删除标记：0未删除，1已删除
     */
    private Byte deleted;

    /**
     * 状态：1已发布，0草稿
     */
    private Byte status;

    /**
     * 标签冗余列表，用分号分隔
     */
    @Column("tag_names")
    private String tagNames;
}
