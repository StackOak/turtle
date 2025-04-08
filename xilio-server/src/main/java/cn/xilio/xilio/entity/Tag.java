package cn.xilio.xilio.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("tag")
public class Tag {
    @Id
    private Long id;
    private String name;
}
