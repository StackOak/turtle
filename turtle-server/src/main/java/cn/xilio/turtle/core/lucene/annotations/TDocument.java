package cn.xilio.turtle.core.lucene.annotations;

import org.springframework.data.annotation.Persistent;

import java.lang.annotation.*;

@Persistent
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface TDocument {
    /**
     * 索引名称
     */
    String indexName();
    /**
     * 是否存储id到source中
     */
    boolean storeIdInSource() default true;
}
