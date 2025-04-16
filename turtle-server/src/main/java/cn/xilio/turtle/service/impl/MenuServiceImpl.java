package cn.xilio.turtle.service.impl;

import cn.hutool.core.lang.tree.Tree;
import cn.hutool.core.lang.tree.TreeNode;
import cn.hutool.core.lang.tree.TreeNodeConfig;
import cn.hutool.core.lang.tree.TreeUtil;
import cn.xilio.turtle.core.BizException;
import cn.xilio.turtle.entity.Menu;
import cn.xilio.turtle.entity.MenuType;
import cn.xilio.turtle.repository.MenuRepository;
import cn.xilio.turtle.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private R2dbcEntityTemplate template;

    /**
     * 获取树形菜单结构 pid=0或者为空表示一级菜单
     *
     * @return 树形菜单
     */
    @Override
    public Mono<Object> getMenusByMenuType(MenuType menuType, String userId) {
        // 构建查询参数
        Criteria criteria = Criteria.where("status").is(1)
                .and("menu_type").is(menuType.getType()); // 筛选门户导航菜单
        // 构建查询语句
        Query query = Query.query(criteria)
                .sort(Sort.by(Sort.Direction.ASC, "sort"));

        // 查询所有启用状态的菜单
        return template.select(query, Menu.class)
                .collectList()
                .map(menus -> {
                    // 如果菜单列表为空，返回空树形结构
                    if (menus.isEmpty()) {
                        return Collections.emptyList(); // 避免 null，返回空列表
                    }
                    // 构建 TreeNode 列表
                    List<TreeNode<String>> nodeList = menus.stream()
                            .map(menu -> new TreeNode<>(
                                    menu.getId(),
                                    menu.getPid() == null ? "0" : menu.getPid(),
                                    menu.getLabel(),
                                    menu.getSort()
                            ))
                            .collect(Collectors.toList());

                    // 配置 TreeNodeConfig
                    TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
                    treeNodeConfig.setWeightKey("sort");
                    treeNodeConfig.setIdKey("id");
                    treeNodeConfig.setParentIdKey("pid");
                    treeNodeConfig.setNameKey("label");
                    treeNodeConfig.setChildrenKey("children");
                    treeNodeConfig.setDeep(3); // 设置最大递归深度

                    // 转换为树形结构
                    List<Tree<String>> treeList = TreeUtil.build(nodeList, "0", treeNodeConfig,
                            (treeNode, tree) -> {
                                tree.setId(treeNode.getId());
                                tree.setParentId(treeNode.getParentId());
                                tree.setWeight(treeNode.getWeight());
                                tree.setName(treeNode.getName());

                                // 添加扩展属性
                                Optional<Menu> menuOpt = menus.stream()
                                        .filter(m -> m.getId().equals(treeNode.getId()))
                                        .findFirst();
                                if (menuOpt.isPresent()) {
                                    Menu menu = menuOpt.get();
                                    tree.putExtra("icon", menu.getIcon());
                                    tree.putExtra("to", menu.getTo());
                                    tree.putExtra("target", menu.getTarget());
                                    tree.putExtra("type", menu.getType());
                                    tree.putExtra("badge", menu.getBadge());
                                    tree.putExtra("menuType", menu.getMenuType());
                                    tree.putExtra("status", menu.getStatus());
                                }
                            });

                    // 如果 treeList 为 null，返回空列表 如果直接返回空值会报错 Reactor模型不支持
                    return !ObjectUtils.isEmpty(treeList) ? treeList : Collections.emptyList();
                });
    }


}
