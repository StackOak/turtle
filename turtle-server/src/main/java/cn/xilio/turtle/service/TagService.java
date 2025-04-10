package cn.xilio.turtle.service;

import cn.xilio.turtle.core.common.PageResponse;
import cn.xilio.turtle.entity.dto.TagDTO;
import reactor.core.publisher.Mono;

public interface TagService {

    public Mono<PageResponse<TagDTO>>getTags(int page, int size);

}
