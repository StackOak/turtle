package cn.xilio.turtle.service;

import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

public interface FileService {
    /**
     * 上传图片
     * @param filePartMono 图片
     * @return 图片存储全路径
     */
    Mono<String> uploadImage(Mono<FilePart> filePartMono);

}
