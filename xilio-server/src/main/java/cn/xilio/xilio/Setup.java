package cn.xilio.xilio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(scanBasePackages = {"cn.xilio.xilio","com.baidu.fsg.uid"})
public class Setup {

    public static void main(String[] args) {
        SpringApplication.run(Setup.class, args);
    }

}
