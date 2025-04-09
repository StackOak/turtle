package cn.xilio.turtle.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * 用户表
 */
@Data
@Table("user")
public class User {

    /**
     * 用户ID，主键自增
     */
    @Id
    private Long id;

    /**
     * 用户名，唯一标识
     */
    private String username;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 用户简介
     */
    private String description;

    /**
     * 密码（加密存储）
     */
    private String password;

    /**
     * 状态：1启用，0禁用
     */
    private Byte status;

    /**
     * 备注
     */
    private String remark;

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
     * 头像URL
     */
    private String avatar;

    /**
     * 关于我，详细介绍
     */
    @Column("about_me")
    private String aboutMe;

    /**
     * 软删除标记：0未删除，1已删除
     */
    private Byte deleted;
}
