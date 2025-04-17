package cn.xilio.turtle.config;

import cn.xilio.turtle.utils.OSUtils;
import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.NotEmpty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;

import java.nio.file.Paths;

import static cn.xilio.turtle.utils.OSUtils.OSType.*;

@Getter
@Setter
@Configuration
@Validated
@ConfigurationProperties(prefix = "cn.xilio.turtle")
public class TurtleProperties {

    private final Upload upload = new Upload();
    private final Api api = new Api();

    @PostConstruct
    public void initUploadPath() {
        if (!StringUtils.hasText(upload.getPath())) {
            upload.setPath(getOSDefaultUploadPath());
        }
    }

    /**
     * 如果用户没有配置文件上传路径，则根据不同的操作系统设置默认路径
     */
    private static String getOSDefaultUploadPath() {
        String userHome = System.getProperty("user.home");
        return switch (OSUtils.getOSType()) {
            case WINDOWS -> Paths.get(userHome, "Desktop", "turtle_uploads").toString();
            case MACOS -> Paths.get(userHome, "Documents", "turtle_uploads").toString();
            case LINUX -> "/var/tmp/turtle_uploads";
            default -> "./upload"; // 其他系统使用当前目录
        };
    }

    @Getter
    @Setter
    public static class Upload {
        /**
         * 文件上传基础路径
         */
        @NotEmpty(message = "文件上传路径前缀不能为空")
        private String path;

        /**
         * 允许的文件类型，空表示不限制
         */
        private String[] allowedExtensions;


    }

    @Setter
    @Getter
    public static class Api {
        /**
         * API前缀
         */
        private String prefix = "/api";
    }
}
