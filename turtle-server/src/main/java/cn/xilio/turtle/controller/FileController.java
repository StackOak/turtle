package cn.xilio.turtle.controller;

import cn.xilio.turtle.core.Result;
import cn.xilio.turtle.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;
    @PostMapping(value = "upload-image",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,name = "图片上传")
    public Mono<Result> uploadImage(@RequestPart("file") Mono<FilePart> filePartMono) {
        return fileService.uploadImage(filePartMono).map(Result::success);
    }
}
