package cn.xilio.turtle.core.validate;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;

/**
 * 输入的值必须在一个[]范围内
 */
import java.util.stream.Collectors;

/**
 * 输入的值必须在一个整数范围内
 */
public class NumberInRangeValidator implements ConstraintValidator<NumberInList, Integer> {
    private List<Integer> allowedValues;
    private String message;
    @Override
    public void initialize(NumberInList constraintAnnotation) {
        // 将 int[] 转换为 List<Integer>
        this.allowedValues = Arrays.stream(constraintAnnotation.allowedValues())
                .boxed() // 将 int 转换为 Integer
                .collect(Collectors.toList());
        // 获取注解中的 message
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        // 如果值为空，默认通过验证
        if (value == null) {
            return true;
        }

        // 检查值是否在允许的范围内
        boolean isValid = allowedValues.contains(value);

        // 如果验证失败，封装自定义错误消息
        if (!isValid) {
            context.disableDefaultConstraintViolation(); // 禁用默认错误消息
            context.buildConstraintViolationWithTemplate(message) // 使用注解中的 message
                    .addConstraintViolation();
        }

        return isValid;
    }
}
