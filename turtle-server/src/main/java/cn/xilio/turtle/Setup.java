package cn.xilio.turtle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(scanBasePackages = {"cn.xilio.turtle","com.baidu.fsg.uid"})
public class Setup {

    public static void main(String[] args) {
        SpringApplication.run(Setup.class, args);
    }
}
