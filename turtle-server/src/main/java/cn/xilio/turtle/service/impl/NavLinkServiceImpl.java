package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.entity.Category;
import cn.xilio.turtle.entity.CategoryType;
import cn.xilio.turtle.entity.NavLink;
import cn.xilio.turtle.entity.dto.CategoryLinkPair;
import cn.xilio.turtle.entity.dto.NavLinkCategoryDTO;
import cn.xilio.turtle.repository.NavLinkRepository;
import cn.xilio.turtle.service.NavLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Service
public class NavLinkServiceImpl implements NavLinkService {
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private NavLinkRepository navLinkRepository;

    @Override
    public Mono<List<NavLinkCategoryDTO>> getNavLinks() {
        return navLinkRepository.findNavLinks(CategoryType.NAV_LINK.getType())
                .groupBy(CategoryLinkPair::categoryId)
                .flatMap(groupedFlux -> groupedFlux.collectList().map(pairs -> {
                    Category category = pairs.get(0).toCategory();
                    List<NavLink> links = pairs.stream()
                            .map(CategoryLinkPair::toNavLink)
                            .filter(Objects::nonNull)
                            .toList();
                    return new NavLinkCategoryDTO(category, links);
                }))
                .collectList();
    }
}
