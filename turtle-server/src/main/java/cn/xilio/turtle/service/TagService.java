package cn.xilio.turtle.service;

import cn.xilio.turtle.core.common.PageResponse;
import cn.xilio.turtle.entity.dto.TagDTO;
import reactor.core.publisher.Mono;

public interface TagService {
    /**
     * 分页获取标签
     *
     * @param page 页，从1开始
     * @param size 每一页的数量
     * @return 标签列表
     */
    public Mono<PageResponse<TagDTO>> getTags(int page, int size);

}
