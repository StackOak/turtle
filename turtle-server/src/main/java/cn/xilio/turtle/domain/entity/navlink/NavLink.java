package cn.xilio.turtle.domain.entity.navlink;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

@Data
@Table("nav_link")
public class NavLink {
    @Id
    @Column("id")
    private String id;

    @Column("cid")
    private String cid;

    @Column("title")
    private String title;

    @Column("url")
    private String url;

    @Column("description")
    private String description;

    @Column("logo")
    private String logo;

    @Column("sort")
    private Integer sort;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column("updated_at")
    private LocalDateTime updatedAt;
    @Column("status")
    private Integer status;
}
