package cn.xilio.turtle.entity;

import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
public enum SearchType {
    ARTICLE(1, "搜索文章");

    private final Integer type;
    private final String desc;

    private static final Map<Integer, SearchType> TYPE_MAP;

    static {
        TYPE_MAP = Arrays.stream(values()).collect(Collectors.toMap(
                        SearchType::getType,
                        Function.identity()));
    }

    SearchType(Integer type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public static SearchType fromType(Integer type) {
        return TYPE_MAP.get(type);
    }

    public static boolean isValidType(Integer type) {
        return TYPE_MAP.containsKey(type);
    }
}
