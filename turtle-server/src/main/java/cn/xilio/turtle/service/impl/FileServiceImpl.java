package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.service.FileService;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileServiceImpl implements FileService {
    /**
     * 上传图片
     *
     * @param filePartMono 图片
     * @return 图片存储全路径
     */
    @Override
    public Mono<String> uploadImage(Mono<FilePart> filePartMono) {
        return filePartMono
            .flatMap(filePart -> {
            String fileName = filePart.filename();
            Path filePath = Paths.get(uploadDir, fileName);
            return filePart.transferTo(filePath)
                    .then(Mono.just("File uploaded successfully: " + fileName));
        })
                .defaultIfEmpty("No file provided");
    }
}
