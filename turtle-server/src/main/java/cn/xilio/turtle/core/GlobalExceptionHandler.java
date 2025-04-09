package cn.xilio.turtle.core;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 处理所有其他Exception异常
    @ExceptionHandler(Exception.class)
    public Mono<Result> handleAllExceptions(Exception ex) {
        ex.printStackTrace();
        return Mono.just(Result.error(HttpStatus.OK.value(), ex.getMessage()));
    }

    @ExceptionHandler(NotLoginException.class)
    public Mono<Result> handleNotLoginException(NotLoginException e) {
        return Mono.just(Result.error(HttpStatus.UNAUTHORIZED.value(), "未认证"));
    }

    @ExceptionHandler(NotPermissionException.class)
    public Mono<Result> handleNotPermissionException(NotPermissionException e) {
        return Mono.just(Result.error(HttpStatus.UNAUTHORIZED.value(), "无权限"));
    }

    // 处理自定义BizException异常
    @ExceptionHandler(BizException.class)
    public Mono<Result> handleCustomException(BizException ex) {
        ex.printStackTrace();
        return Mono.just(Result.error(ex.getCode(), ex.getMsg()));
    }

    @ExceptionHandler(BindException.class)
    public Mono<Result> bindExceptionHandler(BindException e) {
        e.printStackTrace();
        return Mono.just(Result.error(HttpStatus.BAD_REQUEST.value(), e.getBindingResult().getFieldErrors().get(0).getDefaultMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Mono<Result> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        e.printStackTrace();
        return Mono.just(Result.error(HttpStatus.BAD_REQUEST.value(), e.getBindingResult().getFieldErrors().get(0).getDefaultMessage()));
    }
}
