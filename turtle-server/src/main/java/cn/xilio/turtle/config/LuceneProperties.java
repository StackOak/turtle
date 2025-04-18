package cn.xilio.turtle.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "cn.xilio.lucene")
public class LuceneProperties {
    /**
     * 索引根目录
     */
    private String indexDir = "./lucene_index";
}
