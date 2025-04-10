package cn.xilio.turtle.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;


@Data
@Configuration
@Validated
@ConfigurationProperties(prefix = "cn.xilio.turtle")
public class TurtleProperties {

    private final Upload upload = new Upload();
    private final Api api = new Api();

    @Data
    public static class Upload {
        /**
         * 文件上传基础路径
         */
        @NotBlank(message = "文件上传路径前缀不能为空")
        private String path = "./upload";

        /**
         * 允许的文件类型，空表示不限制
         */
        private String[] allowedExtensions = {"jpg", "png", "gif", "pdf", "doc", "docx"};
    }


    @Data
    public static class Api {
        /**
         * API前缀
         */
        private String prefix = "/api";
        /**
         * 每页默认大小
         */
        @Positive(message = "每页大小必须为正数")
        private int defaultPageSize = 15;
    }
}
