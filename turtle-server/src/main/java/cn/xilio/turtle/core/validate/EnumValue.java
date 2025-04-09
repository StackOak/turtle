package cn.xilio.turtle.core.validate;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER}) // 适用于字段和方法参数
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EnumValueValidator.class) // 指定验证器
public @interface EnumValue {
    String message() default "值必须在枚举范围内"; // 默认错误信息

    Class<?>[] groups() default {}; // 分组验证

    Class<? extends Payload>[] payload() default {}; // 有效负载

    Class<? extends Enum<?>> enumClass(); // 枚举类
}
