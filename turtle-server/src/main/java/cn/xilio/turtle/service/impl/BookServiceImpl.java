package cn.xilio.turtle.service.impl;


import cn.hutool.core.util.PageUtil;
import cn.xilio.turtle.core.common.SearchResult;
import cn.xilio.turtle.entity.Book;
import cn.xilio.turtle.entity.BookItem;
import cn.xilio.turtle.repository.BookRepository;
import cn.xilio.turtle.service.BookService;
import io.r2dbc.spi.Clob;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                    .columns("id", "title", "description", "cover", "sort") // 明确返回字段
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
     * 获取知识库大纲 【多叉树形结构】
     *
     * @param bookId 知识库ID
     * @return 知识库大纲
     */
    @Override
    public Mono<Object> getBookItems(String bookId) {
        // 查询指定书籍下状态正常且未删除的节点
        Query query = Query.query(
                Criteria.where("book_id").is(bookId)
                        .and("status").is(true)
                        .and("deleted").is(false)
        ).sort(org.springframework.data.domain.Sort.by("sort"));

        return template.select(BookItem.class)
                .matching(query)
                .all()
                .collectList()
                .map(this::buildTree)
                .map(tree -> tree); // 直接返回树形结构
    }

    /**
     * 将平面节点列表构建为树形结构。
     *
     * @param items 平面节点列表
     * @return 树形结构节点列表
     */
    private List<TreeNode> buildTree(List<BookItem> items) {
        List<TreeNode> tree = new ArrayList<>();
        Map<String, TreeNode> nodeMap = new HashMap<>();

        // 初始化节点映射
        for (BookItem item : items) {
            TreeNode node = new TreeNode();
            node.setId(item.getId());
            node.setLabel(item.getTitle());
            node.setIcon(item.getIcon());
            node.setContent(item.getContent());
            node.setDefaultExpanded(item.getIsExpanded() != null && item.getIsExpanded());
            node.setChildren(new ArrayList<>());
            nodeMap.put(item.getId(), node);
        }

        // 构建树形结构
        for (BookItem item : items) {
            TreeNode node = nodeMap.get(item.getId());
            if (item.getPid() != null && nodeMap.containsKey(item.getPid())) {
                nodeMap.get(item.getPid()).getChildren().add(node);
            } else {
                tree.add(node);
            }
        }

        // 清理空 children 和目录节点的 content
        nodeMap.values().forEach(node -> {
            if (node.getChildren().isEmpty()) {
                node.setChildren(null); // 叶子节点移除空 children
            } else {
                node.setContent(null); // 目录节点清除 content
            }
        });

        return tree;
    }

    /**
     * 树形节点 DTO，适配前端 UTree 组件。
     */
    @Data
    public static class TreeNode {
        private String id;
        private String label;
        private String icon;
        private String content;
        private Boolean defaultExpanded;
        private List<TreeNode> children;
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
