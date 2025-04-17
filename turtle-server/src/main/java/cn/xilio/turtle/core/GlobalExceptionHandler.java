package cn.xilio.turtle.core;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.xilio.turtle.core.common.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 处理所有其他Exception异常
    @ExceptionHandler(Exception.class)
    public Mono<Result> handleAllExceptions(Exception ex) {
        logger.debug("系统异常", ex);
        return Mono.just(Result.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage()));
    }

    @ExceptionHandler(NotLoginException.class)
    public Mono<Result> handleNotLoginException(NotLoginException ex) {
        logger.debug("用户未认证", ex);
        return Mono.just(Result.error(HttpStatus.UNAUTHORIZED.value(), "未认证"));
    }

    @ExceptionHandler(NotPermissionException.class)
    public Mono<Result> handleNotPermissionException(NotPermissionException ex) {
        logger.debug("没有对资源的访问权限", ex);
        return Mono.just(Result.error(HttpStatus.UNAUTHORIZED.value(), "无权限"));
    }

    // 处理自定义BizException异常
    @ExceptionHandler(BizException.class)
    public Mono<Result> handleCustomException(BizException ex) {
        logger.debug("业务异常", ex);
        return Mono.just(Result.error(ex.getCode(), ex.getMsg()));
    }

    @ExceptionHandler(BindException.class)
    public Mono<Result> bindExceptionHandler(BindException ex) {
        logger.debug("请求参数校验不通过", ex);
        return Mono.just(Result.error(HttpStatus.BAD_REQUEST.value(), ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage()));
    }

    @ExceptionHandler(ServerWebInputException.class)
    public Mono<Result> handleServerWebInputException(ServerWebInputException ex) {
        String error = ((WebExchangeBindException) ex).getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        logger.debug("请求参数异常: {}", error);
        return Mono.just(Result.error(HttpStatus.BAD_REQUEST.value(), error));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Mono<Result> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {
        logger.debug("方法参数校验不通过", ex);
        return Mono.just(Result.error(HttpStatus.BAD_REQUEST.value(), ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage()));
    }
}
