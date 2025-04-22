package cn.xilio.turtle.controller;

import cn.xilio.turtle.domain.Result;
import cn.xilio.turtle.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
/**
 * @Project Turtle
 * @Description 文章上传接口
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;
    @PostMapping(value = "upload-image",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,name = "图片上传")
    public Mono<Result> uploadImage(@RequestPart("file") Mono<FilePart> filePartMono, ServerWebExchange exchange) {
        return fileService.uploadImage(filePartMono,exchange).map(Result::success);
    }
}
