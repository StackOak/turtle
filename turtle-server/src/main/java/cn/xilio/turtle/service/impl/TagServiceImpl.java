package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.PageResponse;
import cn.xilio.turtle.entity.dto.TagDTO;
import cn.xilio.turtle.repository.TagRepository;
import cn.xilio.turtle.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private R2dbcEntityTemplate template;

    @Override
    public Mono<PageResponse<TagDTO>> getTags(int page, int size) {
        int offset = (page - 1) * size;
        return Mono.zip(
                tagRepository.findWithArticleCountPaginated(size, offset).collectList(),
                tagRepository.count()
        ).map(tuple -> {
            PageResponse<TagDTO> res = PageResponse.of(tuple.getT1());
            res.setTotal(tuple.getT2().intValue());
            res.setHasMore(((long) page * size) < tuple.getT2());
            return res;
        });
    }
}
