package cn.xilio.turtle.service;

import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
/**
 * @Project Turtle
 * @Description 文件上传
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public interface FileService {
    /**
     * 上传图片
     * @param filePartMono 图片
     * @return 图片存储全路径
     */
    Mono<String> uploadImage(Mono<FilePart> filePartMono, ServerWebExchange exchange);

}
