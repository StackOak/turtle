package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.PageResponse;
import cn.xilio.turtle.entity.dto.TagDTO;
import cn.xilio.turtle.repository.TagRepository;
import cn.xilio.turtle.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Mono<PageResponse<TagDTO>> getTags(int page, int size) {
        int offset = (page - 1) * size;
        return Mono.zip(
                tagRepository.findWithArticleCountPaginated(size, offset).collectList(),
                tagRepository.countTags()
        ).map(tuple -> {
            PageResponse<TagDTO> response = new PageResponse<>();
            response.setData(tuple.getT1());
            response.setTotal(tuple.getT2());
            response.setHasMore((page * size) < tuple.getT2());
            return response;
        });
    }
}
