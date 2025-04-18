package cn.xilio.turtle.actors.lucene;

import cn.xilio.turtle.actors.lucene.annotations.TDocument;
import cn.xilio.turtle.actors.lucene.annotations.TField;

import org.apache.lucene.document.*;
import org.apache.lucene.index.*;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Paths;

public class LuceneClient {
    private final LuceneConfig config;
    private Directory directory;
    private IndexWriter indexWriter;

    public LuceneClient(LuceneConfig config)  {
        this.config = config;
        try {
            initialize();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 初始化 Lucene 环境
    private void initialize() throws IOException {
        directory = FSDirectory.open(Paths.get(config.getIndexPath()));
        IndexWriterConfig writerConfig = new IndexWriterConfig(config.getAnalyzer());
        indexWriter = new IndexWriter(directory, writerConfig);
    }

    // 添加或更新文档
    public <T> void index(IndexRequest<T> request) throws IOException {
        T document = request.getDocument();
        String id = request.getId();
        Document luceneDoc = toLuceneDocument(document, id);
        Term term = new Term("id", id);
        indexWriter.updateDocument(term, luceneDoc);
        indexWriter.commit();
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

        try (IndexReader reader = DirectoryReader.open(directory)) {
            IndexSearcher searcher = new IndexSearcher(reader);
            BooleanQuery query = new BooleanQuery.Builder()
                    .add(new TermQuery(new Term("_index", indexName)), BooleanClause.Occur.MUST)
                    .add(new TermQuery(new Term("id", id)), BooleanClause.Occur.MUST)
                    .build();
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

        BooleanQuery query = new BooleanQuery.Builder()
                .add(new TermQuery(new Term("_index", indexName)), BooleanClause.Occur.MUST)
                .add(new TermQuery(new Term("id", id)), BooleanClause.Occur.MUST)
                .build();
        indexWriter.deleteDocuments(query);
        indexWriter.commit();
    }

    // 关闭资源
    public void close() throws IOException {
        if (indexWriter != null) indexWriter.close();
        if (directory != null) directory.close();
    }

    // 将对象转换为 Lucene Document
    private <T> Document toLuceneDocument(T document, String id) throws IOException {
        Document luceneDoc = new Document();
        Class<?> clazz = document.getClass();
        TDocument docAnnotation = clazz.getAnnotation(TDocument.class);
        if (docAnnotation == null) {
            throw new IllegalArgumentException("Class must be annotated with @TDocument");
        }

        // 添加 _index 字段，记录索引名称
        luceneDoc.add(new StringField("_index", docAnnotation.indexName(),  org.apache.lucene.document.Field.Store.YES));
        // 添加 ID 字段
        luceneDoc.add(new StringField("id", id,  org.apache.lucene.document.Field.Store.YES));
        if (docAnnotation.storeIdInSource()) {
            luceneDoc.add(new StringField("_id", id,  org.apache.lucene.document.Field.Store.YES));
        }

        // 解析字段
        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);
            TField fieldAnnotation = field.getAnnotation(TField.class);
            if (fieldAnnotation != null) {
                try {
                    Object value = field.get(document);
                    if (value != null) {
                        String fieldName = fieldAnnotation.name().isEmpty() ? field.getName() : fieldAnnotation.name();
                        luceneDoc.add(createLuceneField(fieldName, value, fieldAnnotation, field.getType()));
                    }
                } catch (IllegalAccessException e) {
                    throw new IOException("Failed to access field: " + field.getName(), e);
                }
            }
        }
        return luceneDoc;
    }

    // 创建 Lucene 字段
    private org.apache.lucene.document.Field createLuceneField(String name, Object value, TField fieldAnnotation, Class<?> fieldType) {
        FieldType type = fieldAnnotation.type();
        boolean store = fieldAnnotation.store();

        // 处理 Auto 类型，根据字段的 Java 类型推断
        if (type == FieldType.Auto) {
            if (fieldType == String.class) {
                type = FieldType.Text;
            } else if (fieldType == Integer.class || fieldType == int.class) {
                type = FieldType.Integer;
            } else if (fieldType == Long.class || fieldType == long.class) {
                type = FieldType.Long;
            } else if (fieldType == Float.class || fieldType == float.class) {
                type = FieldType.Float;
            } else if (fieldType == Double.class || fieldType == double.class) {
                type = FieldType.Double;
            } else if (fieldType == Boolean.class || fieldType == boolean.class) {
                type = FieldType.Boolean;
            } else {
                type = FieldType.Text;
            }
        }

        return switch (type) {
            case Keyword -> new StringField(name, value.toString(), store ?  org.apache.lucene.document.Field.Store.YES :  org.apache.lucene.document.Field.Store.NO);
            case Text -> new TextField(name, value.toString(), store ?  org.apache.lucene.document.Field.Store.YES :  org.apache.lucene.document.Field.Store.NO);
            case Integer -> new IntPoint(name, (Integer) value);
            case Long -> new LongPoint(name, (Long) value);
            case Float -> new FloatPoint(name, (Float) value);
            case Double -> new DoublePoint(name, (Double) value);
            case Boolean -> new StringField(name, value.toString(), store ?  org.apache.lucene.document.Field.Store.YES :  org.apache.lucene.document.Field.Store.NO);
            case Date -> new StringField(name, value.toString(), store ?  org.apache.lucene.document.Field.Store.YES :  org.apache.lucene.document.Field.Store.NO);
            default -> new TextField(name, value.toString(), store ?  org.apache.lucene.document.Field.Store.YES :  org.apache.lucene.document.Field.Store.NO);
        };
    }

    // 将 Lucene Document 转换为对象
    private <T> T toObject(Document doc, Class<T> clazz) throws IOException {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();
            for (Field field : clazz.getDeclaredFields()) {
                field.setAccessible(true);
                TField fieldAnnotation = field.getAnnotation(TField.class);
                if (fieldAnnotation != null) {
                    String fieldName = fieldAnnotation.name().isEmpty() ? field.getName() : fieldAnnotation.name();
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
