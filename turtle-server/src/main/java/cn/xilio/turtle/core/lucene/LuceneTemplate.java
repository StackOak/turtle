package cn.xilio.turtle.core.lucene;

import cn.xilio.turtle.core.PageResponse;
import cn.xilio.turtle.core.lucene.annotations.TDocument;
import cn.xilio.turtle.core.lucene.annotations.TField;
import cn.xilio.turtle.core.lucene.request.DeleteRequest;
import cn.xilio.turtle.core.lucene.request.GetRequest;
import cn.xilio.turtle.core.lucene.request.IndexRequest;
import cn.xilio.turtle.core.lucene.request.SearchRequest;
import org.apache.lucene.document.*;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.search.highlight.SimpleHTMLFormatter;
import org.apache.lucene.search.highlight.SimpleSpanFragmenter;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Paths;
import java.util.*;

/**
 * @Project Turtle
 * @Description LuceneTemplate 操作模版
 * @Author xilio
 * @Website https://xilio.cn
 * @Copyright (c) 2025 xilio. All Rights Reserved.
 */
public class LuceneTemplate {
    private final LuceneConfig config;
    // 存储每个indexName对应的Directory
    private final Map<String, Directory> directories = new HashMap<>();
    // 存储每个indexName对应的IndexWriter
    private final Map<String, IndexWriter> indexWriters = new HashMap<>();
    private final Map<String, IndexReader> indexReaders = new HashMap<>();
    private final Map<String, IndexSearcher> indexSearchers = new HashMap<>();
    private final Object lock = new Object();

    public LuceneTemplate(LuceneConfig config) {
        this.config = config;
    }

    // 初始化Directory和IndexWriter
    private void initialize(String indexName) throws IOException {
        synchronized (lock) {
            if (!directories.containsKey(indexName)) {
                String indexPath = Paths.get(config.getIndexPath(), indexName).toString();
                Directory directory = FSDirectory.open(Paths.get(indexPath));
                try {
                    IndexWriterConfig writerConfig = new IndexWriterConfig(config.getAnalyzer());
                    IndexWriter writer = new IndexWriter(directory, writerConfig);
                    directories.put(indexName, directory);
                    indexWriters.put(indexName, writer);
                } catch (IOException e) {
                    directory.close(); // 确保异常时关闭 Directory
                    throw e;
                }
            }
        }
    }

    // 添加或更新文档
    public <T> void index(IndexRequest<T> request) throws IOException {
        T document = request.getDocument();
        String id = request.getId();
        String indexName = getIndexName(document.getClass());

        // 初始化对应indexName的Directory和IndexWriter
        initialize(indexName);

        Document luceneDoc = toLuceneDocument(document, id);
        Term term = new Term("id", id);
        IndexWriter writer = indexWriters.get(indexName);
        writer.updateDocument(term, luceneDoc);
        writer.commit();
    }

    // 根据 ID 和 indexName 查询文档
    public <T> T get(GetRequest request, Class<T> tDocumentClass) throws IOException {
        String indexName = request.getIndex();
        String id = request.getId();

        // 验证参数
        if (indexName == null || indexName.isEmpty()) {
            throw new IllegalArgumentException("Index name cannot be null or empty");
        }
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID cannot be null or empty");
        }

        // 验证 indexName 是否匹配 @TDocument
        TDocument docAnnotation = tDocumentClass.getAnnotation(TDocument.class);
        if (docAnnotation == null || !docAnnotation.indexName().equals(indexName)) {
            throw new IllegalArgumentException("Index name " + indexName + " does not match @TDocument annotation for class " + tDocumentClass.getName());
        }

        // 确保对应indexName的Directory已初始化
        initialize(indexName);
        Directory directory = directories.get(indexName);

        try (IndexReader reader = DirectoryReader.open(directory)) {
            IndexSearcher searcher = new IndexSearcher(reader);
            // 不再需要过滤_index字段，直接查询id
            Query query = new TermQuery(new Term("id", id));
            TopDocs topDocs = searcher.search(query, 1);
            if (topDocs.scoreDocs.length > 0) {
                Document doc = searcher.doc(topDocs.scoreDocs[0].doc);
                return toObject(doc, tDocumentClass);
            }
            return null;
        }
    }

    // 删除文档
    public void deleteIndex(DeleteRequest deleteRequest) throws IOException {
        String indexName = deleteRequest.getIndex();
        String id = deleteRequest.getId();

        // 验证参数
        if (indexName == null || indexName.isEmpty()) {
            throw new IllegalArgumentException("Index name cannot be null or empty");
        }
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID cannot be null or empty");
        }
        // 确保对应indexName的Directory已初始化
        initialize(indexName);
        IndexWriter writer = indexWriters.get(indexName);

        // 不再需要过滤_index字段，直接删除id对应的文档
        Query query = new TermQuery(new Term("id", id));
        writer.deleteDocuments(query);
        writer.commit();
    }

    // 关闭资源
    public void close() throws IOException {
        synchronized (lock) {
            for (IndexWriter writer : indexWriters.values()) {
                if (writer != null) writer.close();
            }
            for (Directory dir : directories.values()) {
                if (dir != null) dir.close();
            }
            directories.clear();
            indexWriters.clear();
            indexReaders.clear();
            indexSearchers.clear();
        }
    }

    // 获取索引名称
    private String getIndexName(Class<?> clazz) {
        TDocument docAnnotation = clazz.getAnnotation(TDocument.class);
        if (docAnnotation == null) {
            throw new IllegalArgumentException("Class must be annotated with @TDocument");
        }
        return docAnnotation.indexName();
    }

    // 将对象转换为 Lucene Document
    private <T> Document toLuceneDocument(T document, String id) throws IOException {
        Class<?> clazz = document.getClass();
        TDocument annotation = clazz.getAnnotation(TDocument.class);
        if (annotation == null) {
            throw new IllegalArgumentException("Class must be annotated with @TDocument");
        }
        Document doc = new Document();
        if (annotation.storeIdInSource()) {
            StringField idField = new StringField("id", id, org.apache.lucene.document.Field.Store.YES);
            doc.add(idField);
        }

        ReflectionUtils.doWithFields(clazz, field -> {
            ReflectionUtils.makeAccessible(field);
            TField fieldAnnotation = field.getAnnotation(TField.class);
            if (fieldAnnotation != null) {
                String fieldName = field.getName();
                Object value = ReflectionUtils.getField(field, document);
                if (!ObjectUtils.isEmpty(value)) {
                    boolean index = fieldAnnotation.index();
                    boolean store = fieldAnnotation.store();
                    if (!index && !store) {
                        return;
                    }

                    // 检查字段是否为 List 类型
                    if (field.getType() == List.class) {
                        List<?> listValue = (List<?>) value;
                        // 确保 List 元素是 String 类型
                        if (!listValue.isEmpty() && listValue.get(0) instanceof String) {
                            List<String> stringList = (List<String>) listValue;
                            if (index) {
                                // 索引字段：为每个元素创建 TextField
                                for (String item : stringList) {
                                    doc.add(new TextField(fieldName, item, org.apache.lucene.document.Field.Store.YES));
                                }
                            } else if (store) {
                                // 仅存储：为每个元素创建 StoredField
                                for (String item : stringList) {
                                    doc.add(new StoredField(fieldName, item));
                                }
                            }
                        }
                    } else {
                        // 非 List 类型的字段，按原有逻辑处理
                        FieldType fieldType = null;
                        if (field.getType() == String.class) {
                            fieldType = FieldType.Text;
                        }
                        if (field.getType() == Integer.class || field.getType() == int.class) {
                            fieldType = FieldType.Integer;
                        }
                        if (field.getType() == Long.class || field.getType() == long.class) {
                            fieldType = FieldType.Long;
                        }
                        if (field.getType() == Float.class || field.getType() == float.class) {
                            fieldType = FieldType.Float;
                        }
                        if (field.getType() == Double.class || field.getType() == double.class) {
                            fieldType = FieldType.Double;
                        }
                        if (field.getType() == Boolean.class || field.getType() == boolean.class) {
                            fieldType = FieldType.Boolean;
                        }
                        if (index) {
                            switch (Objects.requireNonNull(fieldType)) {
                                case Text:
                                    doc.add(new TextField(fieldName, value.toString(), org.apache.lucene.document.Field.Store.YES));
                                    break;
                                case Integer:
                                    doc.add(new IntPoint(fieldName, (Integer) value));
                                    doc.add(new StoredField(fieldName, (Integer) value));
                                    break;
                                case Long:
                                    doc.add(new LongPoint(fieldName, (Long) value));
                                    doc.add(new StoredField(fieldName, (Long) value));
                                    break;
                                case Float:
                                    doc.add(new FloatPoint(fieldName, (Float) value));
                                    doc.add(new StoredField(fieldName, (Float) value));
                                    break;
                                case Double:
                                    doc.add(new DoublePoint(fieldName, (Double) value));
                                    doc.add(new StoredField(fieldName, (Double) value));
                                    break;
                                case Boolean:
                                    doc.add(new StoredField(fieldName, String.valueOf(value)));
                                    break;
                                default:
                                    break;
                            }
                        } else if (store) {
                            if (field.getType() == Integer.class || field.getType() == int.class) {
                                doc.add(new StoredField(fieldName, (Integer) value));
                            }
                            if (field.getType() == String.class) {
                                doc.add(new StoredField(fieldName, value.toString()));
                            }
                            if (field.getType() == Long.class || field.getType() == long.class) {
                                doc.add(new StoredField(fieldName, (Long) value));
                            }
                            if (field.getType() == Float.class || field.getType() == float.class) {
                                doc.add(new StoredField(fieldName, (Float) value));
                            }
                            if (field.getType() == Double.class || field.getType() == double.class) {
                                doc.add(new StoredField(fieldName, (Double) value));
                            }
                            if (field.getType() == Boolean.class || field.getType() == boolean.class) {
                                doc.add(new StoredField(fieldName, String.valueOf(value)));
                            }
                        }
                    }
                }
            }
        });

        return doc;
    }

    // 将 Lucene Document 转换为对象
    private <T> T toObject(Document doc, Class<T> clazz) throws IOException {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();
            ReflectionUtils.doWithFields(clazz, field -> {
                ReflectionUtils.makeAccessible(field);
                TField fieldAnnotation = field.getAnnotation(TField.class);
                if (fieldAnnotation != null) {
                    String fieldName = field.getName();
                    // 检查字段是否为 List 类型
                    if (field.getType() == List.class) {
                        String[] values = doc.getValues(fieldName);
                        if (values != null && values.length > 0) {
                            List<String> listValue = Arrays.asList(values);
                            field.set(instance, listValue);
                        }
                    } else {
                        // 非 List 类型的字段，按原有逻辑处理
                        String value = doc.get(fieldName);
                        if (value != null) {
                            setFieldValue(field, instance, value);
                        }
                    }
                }
            });
            return instance;
        } catch (Exception e) {
            throw new IOException("Failed to convert document to object", e);
        }
    }

    // 设置字段值
    private void setFieldValue(Field field, Object instance, String value) throws IllegalAccessException {
        Class<?> type = field.getType();
        if (type == String.class) {
            field.set(instance, value);
        } else if (type == Integer.class || type == int.class) {
            field.set(instance, Integer.parseInt(value));
        } else if (type == Long.class || type == long.class) {
            field.set(instance, Long.parseLong(value));
        } else if (type == Float.class || type == float.class) {
            field.set(instance, Float.parseFloat(value));
        } else if (type == Double.class || type == double.class) {
            field.set(instance, Double.parseDouble(value));
        } else if (type == Boolean.class || type == boolean.class) {
            field.set(instance, Boolean.parseBoolean(value));
        }
    }


    public <T> PageResponse<T> search(SearchRequest request, Class<T> clazz) throws IOException {
        // 1. 参数校验
        if (request == null || StringUtils.isEmpty(request.getIndex()) || StringUtils.isEmpty(request.getKeyword()) || request.getPage() == null || request.getSize() == null) {
            return PageResponse.empty();
        }

        // 2. 验证 indexName 是否匹配 @TDocument
        String indexName = request.getIndex();
        TDocument docAnnotation = clazz.getAnnotation(TDocument.class);
        if (docAnnotation == null || !docAnnotation.indexName().equals(indexName)) {
            throw new IllegalArgumentException("Index name " + indexName + " does not match @TDocument annotation for class " + clazz.getName());
        }

        // 3. 初始化 Directory
        initialize(indexName);
        Directory directory = directories.get(indexName);

        // 4. 动态创建 IndexReader 和 IndexSearcher
        IndexReader reader;
        IndexSearcher searcher;
        try {
            reader = DirectoryReader.open(directory);
        } catch (IndexNotFoundException e) {
            // 索引不存在（目录为空或无提交），返回空结果
            return PageResponse.empty();
        }
        searcher = new IndexSearcher(reader);

        try {
            // 5. 动态获取需要搜索和高亮的字段（index=true 的字段）
            List<String> searchableFields = new ArrayList<>();
            ReflectionUtils.doWithFields(clazz, field -> {
                TField fieldAnnotation = field.getAnnotation(TField.class);
                if (fieldAnnotation != null && fieldAnnotation.index()) {
                    searchableFields.add(field.getName());
                }
            });

            if (searchableFields.isEmpty()) {
                return PageResponse.empty(); // 没有可搜索的字段，返回空结果
            }

            // 6. 构建查询（使用 BooleanQuery）
            BooleanQuery.Builder queryBuilder = new BooleanQuery.Builder();
            for (String field : searchableFields) {
                QueryParser parser = new QueryParser(field, config.getAnalyzer());
                try {
                    Query fieldQuery = parser.parse(request.getKeyword());
                    queryBuilder.add(fieldQuery, BooleanClause.Occur.SHOULD);
                } catch (ParseException e) {
                    throw new IOException("Failed to parse query for field " + field + ": " + request.getKeyword(), e);
                }
            }
            Query query = queryBuilder.build();

            // 7. 分页参数（外部 page 从 1 开始）
            int page = Math.max(1, request.getPage());
            int size = Math.max(1, request.getSize());
            int from = (page - 1) * size;

            // 8. 执行搜索（使用 searchAfter 优化深分页）
            TopDocs topDocs;
            if (page == 1) {
                topDocs = searcher.search(query, size);
            } else {
                TopDocs previousPageDocs = searcher.search(query, from);
                if (previousPageDocs.scoreDocs.length < from) {
                    return PageResponse.empty();
                }
                ScoreDoc lastDoc = previousPageDocs.scoreDocs[from - 1];
                topDocs = searcher.searchAfter(lastDoc, query, size);
            }

            int totalHits = (int) topDocs.totalHits.value;
            boolean hasMore = topDocs.scoreDocs.length == size && (from + size) < totalHits;

            // 9. 高亮显示设置
            SimpleHTMLFormatter formatter = new SimpleHTMLFormatter("<span color=red>", "</span>");
            QueryScorer scorer = new QueryScorer(query);
            Highlighter highlighter = new Highlighter(formatter, scorer);
            highlighter.setTextFragmenter(new SimpleSpanFragmenter(scorer, 100));

            // 10. 转换文档为对象并高亮
            List<T> records = new ArrayList<>();
            for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
                Document doc = searcher.doc(scoreDoc.doc);
                T record = toObjectWithHighlight(doc, clazz, highlighter, request.getKeyword(), searchableFields);
                records.add(record);
            }

            // 11. 返回分页响应
            return PageResponse.of(records, totalHits, page, size, hasMore);
        } finally {
            reader.close(); // 确保 IndexReader 关闭
        }
    }

    // 辅助方法：将 Lucene Document 转换为 Java 对象，并应用高亮
    private <T> T toObjectWithHighlight(Document doc, Class<T> clazz, Highlighter highlighter, String keyword, List<String> searchableFields) throws IOException {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();
            ReflectionUtils.doWithFields(clazz, field -> {
                ReflectionUtils.makeAccessible(field);
                TField fieldAnnotation = field.getAnnotation(TField.class);
                if (fieldAnnotation != null) {
                    String fieldName = field.getName();
                    IndexableField indexableField = doc.getField(fieldName);
                    if (indexableField != null) {
                        if (fieldAnnotation.index() && searchableFields.contains(fieldName) && field.getType() == List.class) {
                            String[] fieldValues = doc.getValues(fieldName);
                            if (fieldValues != null && fieldValues.length > 0) {
                                List<String> highlightedList = new ArrayList<>();
                                for (String fieldValue : fieldValues) {
                                    try {
                                        String highlightedValue = highlighter.getBestFragment(config.getAnalyzer(), fieldName, fieldValue);
                                        highlightedList.add(highlightedValue != null ? highlightedValue : fieldValue);
                                    } catch (Exception e) {
                                        highlightedList.add(fieldValue); // 高亮失败，使用原始值
                                    }
                                }
                                field.set(instance, highlightedList);
                            }
                        } else if (fieldAnnotation.index() && searchableFields.contains(fieldName) && field.getType() == String.class) {
                            String fieldValue = doc.get(fieldName);
                            if (fieldValue != null) {
                                try {
                                    String highlightedValue = highlighter.getBestFragment(config.getAnalyzer(), fieldName, fieldValue);
                                    if (highlightedValue != null) {
                                        fieldValue = highlightedValue;
                                    }
                                } catch (Exception e) {
                                    // 高亮失败，使用原始值
                                }
                                field.set(instance, fieldValue);
                            }
                        } else {
                            // 非高亮字段，按原有逻辑处理
                            if (field.getType() == List.class) {
                                String[] values = doc.getValues(fieldName);
                                if (values != null && values.length > 0) {
                                    List<String> listValue = Arrays.asList(values);
                                    field.set(instance, listValue);
                                }
                            } else {
                                setFieldValue(field, instance, indexableField.stringValue());
                            }
                        }
                    }
                }
            });
            return instance;
        } catch (Exception e) {
            throw new IOException("Failed to convert Document to object: " + clazz.getName(), e);
        }
    }
}
