package cn.xilio.turtle;


import cn.xilio.turtle.core.security.SecureManager;
import cn.xilio.turtle.entity.Article;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexRequest;

/**
 * 密码生成工具类
 */
public abstract class PasswordGeneratorUtils {

    public static void main(String[] args) {
        IndexRequest.Builder<Object> objectBuilder = new IndexRequest.Builder<>();
        objectBuilder.id("1").document(new Article());

        ElasticsearchClient elasticsearchClient = new ElasticsearchClient(null);


        SecureManager secureManager = new SecureManager();
        //将生成的密码保存到user表中的password字段
        secureManager.encrypt("123456").doOnNext(System.out::println).block();
    }
}
