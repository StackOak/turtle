package cn.xilio.xilio.service;

import cn.xilio.xilio.core.PageResponse;
import cn.xilio.xilio.entity.Tag;
import cn.xilio.xilio.entity.dto.TagDTO;
import reactor.core.publisher.Mono;

public interface TagService {

    public Mono<PageResponse<TagDTO>>getTags(int page, int size);

}
