

package cn.xilio.turtle.actors.lucene;



/**
 * 字段类型
 */

public enum FieldType {
    Auto("auto"),
    None("none"),
    Binary("binary"),
    Keyword("keyword"),
    Text("text"),
    Date("date"),
    DateNanos("date_nanos"),
    Boolean("boolean"),
    Object("object"),
    Integer("integer"),
    Long("long"),
    Short("short"),
    Byte("byte"),
    Float("float"),
    Double("double");

    private final String jsonValue;

    private FieldType(String jsonValue) {
        this.jsonValue = jsonValue;
    }

    public String jsonValue() {
        return this.jsonValue;
    }
}
