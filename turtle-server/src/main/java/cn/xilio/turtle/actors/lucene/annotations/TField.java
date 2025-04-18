package cn.xilio.turtle.actors.lucene.annotations;


import cn.xilio.turtle.actors.lucene.FieldType;
import org.springframework.core.annotation.AliasFor;


import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Documented
@Inherited


public @interface TField {
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
    FieldType type() default FieldType.Auto;
}
