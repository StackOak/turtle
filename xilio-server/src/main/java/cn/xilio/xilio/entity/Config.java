package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * 配置表
 */
@Data
@Table("config")
public class Config {

    /**
     * 配置键名
     */
    @Id
    @Column("config_key")
    private String configKey;

    /**
     * 配置内容，JSON格式存储
     */
    @Column("config_json")
    private String configJson; // JSON 类型在 Java 中通常映射为 String
}
