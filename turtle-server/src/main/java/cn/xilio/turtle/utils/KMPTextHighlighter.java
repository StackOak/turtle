package cn.xilio.turtle.utils;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * 基于 KMP 算法的文本高亮工具类
 */
public class KMPTextHighlighter {

    /**
     * 将文本中匹配关键字的部分添加颜色标签
     *
     * @param text       原始文本
     * @param keywords   关键字列表
     * @param color      颜色值（支持 HTML 颜色名或 #RRGGBB 格式，例如 "red" 或 "#FF0000"）
     * @param tag        使用的 HTML 标签（例如 "span" 或 "mark"）
     * @param ignoreCase 是否忽略大小写
     * @return 高亮后的文本
     */
    public static String highlight(String text, List<String> keywords, String color, String tag, boolean ignoreCase) {
        if (CollectionUtils.isEmpty(keywords)) {
            return text;
        }
        if (text == null || text.isEmpty() || keywords == null || keywords.isEmpty()) {
            return text != null ? text : "";
        }

        // 处理大小写
        String sourceText = ignoreCase ? text.toLowerCase() : text;
        List<String> processedKeywords = new ArrayList<>();
        for (String keyword : keywords) {
            processedKeywords.add(ignoreCase ? keyword.toLowerCase() : keyword);
        }

        // 使用 StringBuilder 构建结果
        StringBuilder result = new StringBuilder();
        int pos = 0; // 当前处理位置

        // 记录已高亮的位置，避免重复处理
        boolean[] highlighted = new boolean[text.length()];

        // 对每个关键字进行 KMP 匹配
        for (String keyword : processedKeywords) {
            int start = pos;
            while (start <= sourceText.length() - keyword.length()) {
                int matchPos = kmpSearch(sourceText, keyword, start);
                if (matchPos == -1) {
                    break; // 没有更多匹配
                }

                // 检查是否已被高亮
                boolean alreadyHighlighted = false;
                for (int i = matchPos; i < matchPos + keyword.length(); i++) {
                    if (highlighted[i]) {
                        alreadyHighlighted = true;
                        break;
                    }
                }

                if (!alreadyHighlighted) {
                    // 添加未高亮部分
                    if (pos < matchPos) {
                        result.append(text.substring(pos, matchPos));
                    }
                    // 添加高亮标签
                    String matchedText = text.substring(matchPos, matchPos + keyword.length());
                    result.append(String.format("<%s style=\"color: %s;\">%s</%s>", tag, color, matchedText, tag));
                    // 标记已高亮
                    for (int i = matchPos; i < matchPos + keyword.length(); i++) {
                        highlighted[i] = true;
                    }
                    pos = matchPos + keyword.length();
                } else {
                    start = matchPos + 1; // 跳过已高亮部分
                }
            }
        }

        // 添加剩余未处理部分
        if (pos < text.length()) {
            result.append(text.substring(pos));
        }

        return result.toString();
    }

    /**
     * KMP 算法实现
     *
     * @param text    文本
     * @param pattern 关键字
     * @param start   起始搜索位置
     * @return 匹配位置，-1 表示未找到
     */
    private static int kmpSearch(String text, String pattern, int start) {
        if (start > text.length() - pattern.length()) {
            return -1;
        }

        int[] next = computeNextArray(pattern);
        int i = start; // 文本指针
        int j = 0;     // 模式指针

        while (i < text.length()) {
            if (j == -1 || text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
                if (j == pattern.length()) {
                    return i - j; // 找到匹配，返回起始位置
                }
            } else {
                j = next[j]; // 回溯到 next 数组指示的位置
            }
        }
        return -1; // 未找到
    }

    /**
     * 计算 KMP 的 next 数组（部分匹配表）
     *
     * @param pattern 关键字
     * @return next 数组
     */
    private static int[] computeNextArray(String pattern) {
        int[] next = new int[pattern.length()];
        next[0] = -1;
        int i = 0; // 当前字符位置
        int j = -1; // 前缀位置

        while (i < pattern.length() - 1) {
            if (j == -1 || pattern.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
                next[i] = j;
            } else {
                j = next[j];
            }
        }
        return next;
    }

    /**
     * 重载方法，默认使用 span 标签和红色
     */
    public static String highlight(String text, List<String> keywords) {
        return highlight(text, keywords, "red", "span", true);
    }

    public static String highlight(String text, String keyword) {
        return highlight(text, List.of(keyword), "red", "span", true);
    }

    // 测试代码
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        String text = "Java is a great programming language, and java developers love it.";
        List<String> keywords = new ArrayList<>();
        keywords.add("Java");
        keywords.add("programming");

        // 高亮处理
        String result = highlight(text, keywords, "#FF0000", "span", true);
        System.out.println(result);

        // 使用默认设置
        String defaultResult = highlight(text, keywords);
        System.out.println(defaultResult);

        System.out.println("耗时：" + (System.currentTimeMillis() - start) + "ms");
    }
}
