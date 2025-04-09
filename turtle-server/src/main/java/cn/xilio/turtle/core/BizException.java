package cn.xilio.turtle.core;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

/**
 *
 */
@Getter
@Setter
@ToString
public class BizException extends RuntimeException {
    private int code;
    private String msg;

    public BizException(int code, String message) {
        this.code = code;
        this.msg = message;
    }

    public BizException( String message,Throwable throwable) {
        this.code = HttpStatus.BAD_REQUEST.value();
        this.msg = message;
    }


    public BizException(String message) {
        this.code = HttpStatus.BAD_REQUEST.value();
        this.msg = message;
    }

    public static void noEmpty(String value,String msg) {
        if (!StringUtils.hasText(value)){
            throw new BizException(msg);
        }
    }

    public static void noNull(Object value,String msg) {
        if (ObjectUtils.isEmpty(value)){
            throw new BizException(msg);
        }
    }
    public static void exprNull(boolean expr,String msg) {
        if (expr){
            throw new BizException(msg);
        }
    }
}
