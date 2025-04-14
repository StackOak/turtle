package cn.xilio.turtle.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import java.time.LocalDateTime;


@Data
@Table("nav")
public class Nav {

    /**
     * 导航项唯一标识符
     */
    @Id
    private String id;

    /**
     * 父级导航ID（用于多级菜单）
     */
    private String pid;

    /**
     * 导航显示名称
     */
    private String label;

    /**
     * 导航图标类名或URL
     */
    private String icon;

    /**
     * 导航跳转路径/URL
     */
    private String to;

    /**
     * 链接打开方式（_self/_blank）
     */
    private String target = "_self";

    /**
     * 导航类型 label link
     */
    private Integer type = 1;

    /**
     * 角标文字（如"New"）
     */
    private String badge;

    /**
     * 排序权重（数字越大越靠前）
     */
    private Integer sort = 0;

    /**
     * 备注信息
     */
    private String remark;

    /**
     * 导航分类：1-门户导航菜单
     */
    private Integer navType = 1;

    /**
     * 状态：0-禁用 1-启用
     */
    private Integer status = 1;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
