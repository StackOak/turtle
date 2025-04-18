package cn.xilio.turtle.actors.lucene;

import org.springframework.data.annotation.Persistent;

import java.lang.annotation.*;

@Persistent
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface Document {
    /**
     * 索引名称
     */
    String indexName();

    /**
     * 是否创建索引
     */
    boolean createIndex() default true;

    /**
     * 是否存储id到source中
     */
    boolean storeIdInSource() default true;

}
