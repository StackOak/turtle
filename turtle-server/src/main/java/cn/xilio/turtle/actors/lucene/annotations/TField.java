package cn.xilio.turtle.actors.lucene.annotations;


import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Documented
@Inherited
public @interface TField {
    /**
     * 是否索引
     */
    boolean index() default false;

    /**
     * 是否存储
     */
    boolean store() default false;
}
