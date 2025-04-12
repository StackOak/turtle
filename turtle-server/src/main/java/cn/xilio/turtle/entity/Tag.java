package cn.xilio.turtle.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 标签表
 */
@Data
@Table("tag")
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    private String id;
    /**
     * 标签名称
     */

    private String name;

    /**
     * 创建时间
     */

    @Column("created_at")
     @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm:ss",iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime createdAt;
}
