package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.IndexRequest;
import cn.xilio.turtle.actors.lucene.LuceneClient;
import cn.xilio.turtle.actors.lucene.LuceneConfig;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.DeleteRequest;
import org.apache.lucene.analysis.standard.StandardAnalyzer;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        // 配置 Lucene
        LuceneConfig config = new LuceneConfig("./lucene_index", new StandardAnalyzer());
        LuceneClient client = new LuceneClient(config);

        // 创建用户
        User user = new User();
        user.setName("Alice1");
        user.setAge(25);
        IndexRequest<User> request = new IndexRequest<>(user, "1");
        client.index(request);
        client.deleteIndex("1");
        // 查询用户
        User foundUser = client.get("users", "1", User.class);
        if (foundUser != null) {
            System.out.println("Found user: " + foundUser.getName() + ", " + foundUser.getAge());
        } else {
            System.out.println("User not found");
        }

        // 关闭客户端
        client.close();

        ElasticsearchClient elasticsearchClient = new ElasticsearchClient(null);
        DeleteRequest.Builder user1 = new DeleteRequest.Builder()
                .index("user")
                .id("1");
        elasticsearchClient.delete()
    }
}
