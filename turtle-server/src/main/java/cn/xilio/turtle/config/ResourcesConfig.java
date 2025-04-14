package cn.xilio.turtle.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@RequiredArgsConstructor
public class ResourcesConfig implements WebFluxConfigurer {
    private final TurtleProperties properties;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/oss/file/**")
                .addResourceLocations("file:/" + properties.getUpload().getPath() + "/");
    }
}
