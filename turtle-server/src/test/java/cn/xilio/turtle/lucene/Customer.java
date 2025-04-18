package cn.xilio.turtle.lucene;

import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;

@TDocument(indexName = "customers")
public class Customer {
    @TField(name = "company", index = true, store = true)
    private String company;

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
}
