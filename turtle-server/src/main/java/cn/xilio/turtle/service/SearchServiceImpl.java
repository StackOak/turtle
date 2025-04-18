//package cn.xilio.turtle.service;
//
//
//import cn.xilio.turtle.entity.Article;
//import org.apache.lucene.analysis.Analyzer;
//import org.apache.lucene.document.*;
//import org.apache.lucene.index.*;
//import org.apache.lucene.queryparser.classic.QueryParser;
//import org.apache.lucene.search.*;
//import org.apache.lucene.store.Directory;
//import org.apache.lucene.store.FSDirectory;
//import org.springframework.stereotype.Service;
//
//import org.wltea.analyzer.lucene.IKAnalyzer;
//
//import java.io.File;
//import java.nio.file.Paths;
//
//@Service
//public class SearchServiceImpl {
//    private final static String INDEX_DIR = "store/lucene/index";
//    private final static String ARTICLE_INDEX = INDEX_DIR + "/article";
//
//    /**
//     * 保存文章索引
//     *
//     * @param article 文章信息
//     * @return
//     */
//    public int saveIndex(Article article) {
//        IndexWriter indexWriter = null;
//        IndexReader indexReader = null;
//        Directory directory = null;
//        Analyzer analyzer = null;
//        try {
//            //创建索引目录文件
//            File indexFile = new File(ARTICLE_INDEX);
//            File[] files = indexFile.listFiles();
//            // 1. 创建分词器,分析文档，对文档进行分词
//            analyzer = new IKAnalyzer();
//            // 2. 创建Directory对象,声明索引库的位置
//            directory = FSDirectory.open(Paths.get(ARTICLE_INDEX));
//            // 3. 创建IndexWriteConfig对象，写入索引需要的配置
//            IndexWriterConfig writerConfig = new IndexWriterConfig(analyzer);
//            // 4.创建IndexWriter写入对象
//            indexWriter = new IndexWriter(directory, writerConfig);
//            // 5.写入到索引库，通过IndexWriter添加文档对象document
//            Document doc = new Document();
//            //查询是否有该索引，没有添加，有则更新
//            TopDocs topDocs = null;
//            //判断索引目录文件是否存在文件，如果没有文件，则为首次添加，有文件，则查询id是否已经存在
//            if (files != null && files.length != 0) {
//                //创建查询对象
//                QueryParser queryParser = new QueryParser("id", analyzer);
//                Query query = queryParser.parse(article.getId());
//                indexReader = DirectoryReader.open(directory);
//                IndexSearcher indexSearcher = new IndexSearcher(indexReader);
//                //查询获取命中条目
//                topDocs = indexSearcher.search(query, 1);
//            }
//            //StringField 不分词 直接建索引 存储
//            doc.add(new StringField("id", article.getId(), Field.Store.YES));
//            doc.add(new StringField("likeCount", String.valueOf(article.getLikeCount()), Field.Store.YES));
//
//            //TextField 分词 建索引 存储
//            doc.add(new TextField("title", article.getTitle(), Field.Store.YES));
//            doc.add(new TextField("description", article.getDescription(), Field.Store.YES));
//            doc.add(new TextField("content", article.getContent(), Field.Store.YES));
//            //如果没有查询结果，添加
//            if (topDocs != null && topDocs.totalHits.value == 0) {
//                indexWriter.addDocument(doc);
//                //否则，更新
//            } else {
//                indexWriter.updateDocument(new Term("id", article.getId()), doc);
//            }
//        } catch (Exception e) {
//
//        } finally {
//
//
//        }
//        return 1;
//    }
//
//
//    public int deleteIndex(String id) {
//        //删除全文检索
//        IndexWriter indexWriter;
//        Directory directory;
//        try (Analyzer analyzer = new IKAnalyzer()) {
//            directory = FSDirectory.open(Paths.get(ARTICLE_INDEX));
//            IndexWriterConfig writerConfig = new IndexWriterConfig(analyzer);
//            indexWriter = new IndexWriter(directory, writerConfig);
//            //根据id字段进行删除
//            indexWriter.deleteDocuments(new Term("id", id));
//        } catch (Exception e) {
//
//        }
//        return 0;
//    }
//
//
//}
