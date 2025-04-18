package cn.xilio.turtle.actors.lucene;

import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Documented
@Inherited
public @interface Field {
    @AliasFor("name")
    String value() default "";

    @AliasFor("value")
    String name() default "";

    /**
     * 是否索引
     */
    boolean index() default true;

    /**
     * 是否存储
     */
    boolean store() default false;
}
