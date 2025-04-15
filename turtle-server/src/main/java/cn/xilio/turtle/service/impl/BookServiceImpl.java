package cn.xilio.turtle.service.impl;


import cn.hutool.core.util.PageUtil;
import cn.xilio.turtle.core.common.SearchResult;
import cn.xilio.turtle.entity.Book;
import cn.xilio.turtle.repository.BookRepository;
import cn.xilio.turtle.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import static org.springframework.data.relational.core.query.Criteria.where;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private R2dbcEntityTemplate template;
    @Autowired
    private BookRepository bookRepository;
    /**
     * 获取书籍列表
     *
     * @param keyword 查询关键字
     * @param page    分页
     * @param size    记录数
     * @return 知识库列表
     */
    @Override
    public Mono<SearchResult<Book>> getBooks(String keyword, int page, int size) {
        // 构建基础查询条件（status=1且未删除）
        Criteria criteria = where("status").is(1)
                .and("deleted").is(0);

        // 添加关键字模糊查询条件
        if (StringUtils.hasText(keyword)) {
            criteria = criteria.and(
                    where("title").like("%" + keyword + "%")
                            .or("description").like("%" + keyword + "%")
            );
        }

        // 先查询总数
        Mono<Long> totalMono = template.count(Query.query(criteria), Book.class);

        Criteria finalCriteria = criteria;
        return totalMono.flatMap(total -> {
            // 处理空结果
            if (total == 0) {
                return Mono.just(SearchResult.empty());
            }

            // 计算实际页码（防止超出范围）
            int totalPages = PageUtil.totalPage(total.intValue(), size);
            int actualPage = Math.min(page, totalPages);

            // 构建分页查询
            Query pageQuery = Query.query(finalCriteria)
                    .columns("id", "title", "description", "cover","sort") // 明确返回字段
                    .sort(Sort.by(Sort.Direction.DESC, "sort")) // 按创建时间降序
                    .offset((long) (actualPage - 1) * size)
                    .limit(size);

            // 如果请求页码超出范围返回空
            if (page > totalPages) {
                return Mono.just(SearchResult.empty());
            }

            // 执行分页查询
            return template.select(pageQuery, Book.class)
                    .collectList()
                    .map(books -> SearchResult.of(
                            books,
                            total.intValue(),
                            totalPages,
                            books.size(),
                            actualPage < totalPages
                    ));
        });
    }

    /**
     * 获取知识库大纲
     *
     * @param bookId 知识库ID
     * @return 知识库大纲
     */
    @Override
    public Mono<Object> getBookItems(String bookId) {

        return null;
    }

    /**
     * 知识库Item节点内容
     *
     * @param itemId 节点编号
     * @return 内容详情
     */
    @Override
    public Mono<Object> getBookContent(String itemId) {
        return null;
    }

}
