package cn.xilio.turtle.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Table("category")
public class Category {
    @Id
    @Column("id")
    private String id;

    @Column("name")
    private String name;

    @Column("description")
    private String description;

    @Column("type")
    private Integer type;

    @Column("sort")
    private Integer sort;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column("updated_at")
    private LocalDateTime updatedAt;
}
