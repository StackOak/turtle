package cn.xilio.turtle.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.xilio.turtle.config.TurtleProperties;
import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.service.FileService;
import cn.xilio.turtle.utils.WebUtils;
import com.baidu.fsg.uid.UidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {
    @Autowired
    private UidGenerator uidGenerator;
    @Autowired
    private TurtleProperties tp;
    @Value("${server.port}")
    private Integer port;

    /**
     * 上传图片
     *
     * @param filePartMono 图片
     * @return 图片存储全路径
     */
    @Override
    public Mono<String> uploadImage(Mono<FilePart> filePartMono, ServerWebExchange exchange) {
        return filePartMono
                .flatMap(filePart -> {

                    String fileName = filePart.filename();
                    String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                    if (!StringUtils.hasText(extension)) {
                        return Mono.error(new BizException("文件扩展名不能为空"));
                    }
                    List<String> allowedExtensions = Arrays.asList(tp.getUpload().getAllowedExtensions());
                    if (!allowedExtensions.contains(extension.toLowerCase())) {
                        return Mono.error(new BizException("文件扩展名不被支持"));
                    }
                    long uid = uidGenerator.getUID();
                    String uploadPath = tp.getUpload().getPath() + "/image";
                    FileUtil.mkdir(uploadPath);
                    Path path = Path.of(uploadPath, uid + "." + extension);
                    //获取 域名/IP:PORT
                    String domain = WebUtils.getDomain(exchange);
                    String url = domain + "/oss/file/image/" + uid + "." + extension;
                    return filePart.transferTo(path)
                            .then(Mono.just(url));
                })
                .defaultIfEmpty("没有提供上传图片！");
    }
}
