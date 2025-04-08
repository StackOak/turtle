package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * 标签表
 */
@Data
@Table("tag")
public class Tag {
    @Id
    private Long id;
    /**
     * 标签名称
     */

    private String name;

    /**
     * 创建时间
     */
    @Column("created_at")
    private LocalDateTime createdAt;
}
