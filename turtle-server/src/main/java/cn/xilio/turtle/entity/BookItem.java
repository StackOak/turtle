package cn.xilio.turtle.entity;

import io.r2dbc.spi.Clob;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * 知识库节点实体类，对应数据库表 book_item。
 * 用于存储知识库的树形结构节点信息，包括目录和叶子节点的标题、内容等。
 */
@Data
@Table("book_item")
public class BookItem {

    /**
     * 节点ID，主键，唯一标识每个节点。
     */
    @Id
    @Column("id")
    private String id;

    /**
     * 所属书籍ID，关联 book 表，表示节点所属的书籍。
     */
    @Column("book_id")
    private String bookId;

    /**
     * 父节点ID，为空表示根节点，用于构建树形结构。
     */
    @Column("pid")
    private String pid;

    /**
     * 节点标题，显示为目录名或文件名。
     */
    @Column("title")
    private String title;

    /**
     * 节点内容，仅叶子节点存储 Markdown 内容，目录节点为空。
     */
    @Column("content")
    private Clob content;

    /**
     * 节点图标，例如文件类型图标（如 i-vscode-icons-file-type-typescript）。
     */
    @Column("icon")
    private String icon;

    /**
     * 排序值，控制节点在树形结构中的显示顺序，默认值为 0。
     */
    @Column("sort")
    private Integer sort;

    /**
     * 是否默认展开，1 表示展开，0 表示折叠。
     */
    @Column("is_expanded")
    private Boolean isExpanded;

    /**
     * 创建时间，自动设置为记录插入时的服务器时间。
     */
    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;

    /**
     * 更新时间，自动更新为记录修改时的服务器时间。
     */
    @LastModifiedDate
    @Column("updated_at")
    private LocalDateTime updatedAt;

    /**
     * 状态，1 表示正常，0 表示禁用。
     */
    @Column("status")
    private Boolean status;

    /**
     * 删除标记，1 表示已删除，0 表示未删除。
     */
    @Column("deleted")
    private Boolean deleted;
}
