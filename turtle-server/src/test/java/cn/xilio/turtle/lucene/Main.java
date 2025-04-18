package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.*;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        // 配置 Lucene
        LuceneConfig config = new LuceneConfig("./lucene_index", new org.apache.lucene.analysis.standard.StandardAnalyzer());
        LuceneClient client = new LuceneClient(config);

        // 索引 User
        User user = new User();
        user.setName("Alice");
        user.setAge(25);
        client.index(new IndexRequest<>(user, "1"));

        // 索引 Customer
        Customer customer = new Customer();
        customer.setCompany("Acme Corp");
        client.index(new IndexRequest<>(customer, "1")); // 相同 ID

        // 查询 User
        User foundUser = client.get(GetRequest.builder().index("users").id("1").build(), User.class);
        System.out.println("User: " + (foundUser != null ? foundUser.getName() + ", " + foundUser.getAge() : "Not found"));

        // 查询 Customer
        Customer foundCustomer = client.get(GetRequest.builder().index("customers").id("1").build(), Customer.class);
        System.out.println("Customer: " + (foundCustomer != null ? foundCustomer.getCompany() : "Not found"));

        // 删除 User
        client.deleteIndex(DeleteRequest.builder().index("users").id("1").build());
        foundUser = client.get(GetRequest.builder().index("users").id("1").build(), User.class);
        System.out.println("User after delete: " + (foundUser != null ? foundUser.getName() : "Not found"));

        // 验证 Customer 未被删除
        foundCustomer = client.get(GetRequest.builder().index("customers").id("1").build(), Customer.class);
        System.out.println("Customer after user delete: " + (foundCustomer != null ? foundCustomer.getCompany() : "Not found"));

        // 关闭客户端
        client.close();
    }
}
