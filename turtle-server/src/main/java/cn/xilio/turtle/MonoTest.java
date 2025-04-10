package cn.xilio.turtle;

import reactor.core.publisher.Mono;

public class MonoTest
{

    public static void main(String[] args) {
        Mono.just("hello world").then(Mono.error(new RuntimeException("error"))).then();
    }
}
