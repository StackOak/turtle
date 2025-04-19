package cn.xilio.turtle.actors.lucene;

import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;
import cn.xilio.turtle.actors.lucene.request.DeleteRequest;
import cn.xilio.turtle.actors.lucene.request.GetRequest;
import cn.xilio.turtle.actors.lucene.request.IndexRequest;
import org.apache.lucene.document.*;
import org.apache.lucene.index.*;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class LuceneTemplate {
    private final LuceneConfig config;
    // 存储每个indexName对应的Directory
    private final Map<String, Directory> directories = new HashMap<>();
    // 存储每个indexName对应的IndexWriter
    private final Map<String, IndexWriter> indexWriters = new HashMap<>();

    public LuceneTemplate(LuceneConfig config) {
        this.config = config;
    }

    // 初始化Directory和IndexWriter
    private void initialize(String indexName) throws IOException {
        if (!directories.containsKey(indexName)) {
            // 为每个indexName创建独立的目录
            String indexPath = Paths.get(config.getIndexPath(), indexName).toString();
            Directory directory = FSDirectory.open(Paths.get(indexPath));
            IndexWriterConfig writerConfig = new IndexWriterConfig(config.getAnalyzer());
            IndexWriter writer = new IndexWriter(directory, writerConfig);
            directories.put(indexName, directory);
            indexWriters.put(indexName, writer);
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
        for (IndexWriter writer : indexWriters.values()) {
            if (writer != null) writer.close();
        }
        for (Directory dir : directories.values()) {
            if (dir != null) dir.close();
        }
        directories.clear();
        indexWriters.clear();
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
                    } else {
                        // 不存储索引 只存储数据用于查询
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
        });

        return doc;
    }


    // 将 Lucene Document 转换为对象
    private <T> T toObject(Document doc, Class<T> clazz) throws IOException {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();
            for (Field field : clazz.getDeclaredFields()) {
                field.setAccessible(true);
                TField fieldAnnotation = field.getAnnotation(TField.class);
                if (fieldAnnotation != null) {
                    String fieldName = field.getName();
                    String value = doc.get(fieldName);
                    if (value != null) {
                        setFieldValue(field, instance, value);
                    }
                }
            }
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
}
