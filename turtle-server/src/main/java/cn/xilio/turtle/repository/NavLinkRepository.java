package cn.xilio.turtle.repository;


import cn.xilio.turtle.domain.entity.navlink.NavLink;
import cn.xilio.turtle.domain.dto.CategoryLinkPair;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface NavLinkRepository extends R2dbcRepository<NavLink, String> {
    @Query("""
        SELECT c.id AS category_id,
               c.name AS category_name,
               c.description AS category_description,
               c.type AS category_type,
               c.sort AS category_sort,
               c.created_at AS category_created_at,
               c.updated_at AS category_updated_at,
               l.id AS link_id,
               l.cid AS link_cid,
               l.title AS link_title,
               l.url AS link_url,
               l.description AS link_description,
               l.logo AS link_logo,
               l.sort AS link_sort,
               l.created_at AS link_created_at,
               l.updated_at AS link_updated_at,
               l.status AS link_status
        FROM category c
        LEFT JOIN nav_link l ON c.id = l.cid
        WHERE c.type = :type
        ORDER BY c.sort DESC, l.sort DESC
        """)
    Flux<CategoryLinkPair> findNavLinks(Integer type);
}
