package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.domain.entity.navlink.NavLink;
import cn.xilio.turtle.domain.dto.CategoryLinkPair;
import cn.xilio.turtle.domain.dto.NavLinkCategoryDTO;
import cn.xilio.turtle.repository.NavLinkRepository;
import cn.xilio.turtle.service.NavLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NavLinkServiceImpl implements NavLinkService {
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private NavLinkRepository navLinkRepository;

    @Override
    public Mono<List<NavLinkCategoryDTO>> getNavLinks() {
        return navLinkRepository.findNavLinks(1) // 查询 type=1 的分类
                .groupBy(CategoryLinkPair::getCategoryId)
                .flatMap(groupedFlux -> groupedFlux.collectList().map(pairs -> {
                    // 从第一行获取分类字段
                    CategoryLinkPair first = pairs.get(0);
                    String id = first.getCategoryId();
                    String name = first.getCategoryName();
                    String description = first.getCategoryDescription();
                    Integer type = first.getCategoryType();
                    Integer sort = first.getCategorySort();
                    LocalDateTime createdAt = first.getCategoryCreatedAt();
                    LocalDateTime updatedAt = first.getCategoryUpdatedAt();

                    // 构造 NavLink 列表
                    List<NavLink> links = new ArrayList<>();
                    for (CategoryLinkPair pair : pairs) {
                        NavLink link = pair.toNavLink();
                        if (link != null) {
                            links.add(link);
                        }
                    }

                    // 返回 NavLinkCategoryDTO
                    return new NavLinkCategoryDTO(id, name, description, type, sort, createdAt, updatedAt, links);
                }))
                .collectList();
    }
}
