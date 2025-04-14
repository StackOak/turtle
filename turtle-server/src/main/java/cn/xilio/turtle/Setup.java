package cn.xilio.turtle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @Project Turtle
 * @Description 项目启动类
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
@SpringBootApplication(scanBasePackages = {"cn.xilio.turtle", "com.baidu.fsg.uid"})
public class Setup {

    public static void main(String[] args) {
        SpringApplication.run(Setup.class, args);
    }
}
