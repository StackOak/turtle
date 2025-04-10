package cn.xilio.turtle.service.impl;

import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.entity.Article;
import cn.xilio.turtle.entity.dto.SearchResult;
import cn.xilio.turtle.entity.dto.SearchType;
import cn.xilio.turtle.repository.ArticleRepository;
import cn.xilio.turtle.service.ArticleService;
import cn.xilio.turtle.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.data.relational.core.query.Criteria.where;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private R2dbcEntityTemplate template;

    @Override
    public Mono<SearchResult> search(String keyword, Integer type, Integer page, Integer size) {
        if (SearchType.ARTICLE.equals(SearchType.fromType(type))) {
            Criteria criteria = where("status").is(1).and(where("deleted").is(0))
                    .and(where("title").like("%" + keyword + "%"));
            Query baseQuery = Query.query(criteria);
            Mono<Long> totalMono = template.count(baseQuery, Article.class);
            return totalMono.flatMap(total -> {
                if (total == 0) {
                    return Mono.just(SearchResult.empty());
                }
                // 计算总页数
                int totalPages = (int) Math.ceil(total.doubleValue() / size);

                // 如果输入页数超过总页数，使用最后一页
                int actualPage = Math.min(page, totalPages);

                // 计算实际的偏移量
                long offset = (long) (actualPage - 1) * size;
                int actualLimit = size;

                // 构建分页查询
                Query pageQuery = Query.query(criteria)
                        .columns("id", "title", "published_at", "view_count", "tag_names")
                        .sort(Sort.by(Sort.Direction.DESC, "published_at"))
                        .offset(offset)
                        .limit(actualLimit);
                // 如果超出页码范围，返回空结果
                if (page > totalPages) {
                    return Mono.just(SearchResult.empty());
                }
                return template.select(pageQuery, Article.class)
                        .collectList()
                        .map(articles -> SearchResult.of(articles, total.intValue(), totalPages, articles.size()));
            });
        }
        return Mono.empty();
    }
}
