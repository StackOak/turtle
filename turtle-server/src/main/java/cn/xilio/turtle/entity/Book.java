package cn.xilio.turtle.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * 书籍实体类
 */
@Data
@Table("book")
public class Book {
    /**
     * 书籍ID（主键）
     */
    @Id
    private String id;

    /**
     * 书籍标题
     */
    @Column("title")
    private String title;

    /**
     * 书籍描述
     */
    @Column("description")
    private String description;

    /**
     * 封面图片地址
     */
    @Column("cover")
    private String cover;

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
     * 状态（1正常/0禁用）
     */
    @Column("status")
    private Integer status;

    /**
     * 删除标记（1已删/0未删）
     */
    @Column("deleted")
    private Integer deleted;
    /**
     * 排序字段
     */
    @Column("sort")
    private Integer sort;
}
