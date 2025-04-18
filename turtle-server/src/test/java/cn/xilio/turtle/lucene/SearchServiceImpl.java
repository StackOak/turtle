//package cn.xilio.turtle.actors.lucene;
//
//import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import com.stackoak.stackoak.application.actors.security.StpKit;
//import com.stackoak.stackoak.common.data.article.Article;
//import com.stackoak.stackoak.common.data.article.ArticleId;
//import com.stackoak.stackoak.common.data.search.SearchHistory;
//import com.stackoak.stackoak.common.data.search.SearchRequest;
//import org.apache.commons.compress.utils.IOUtils;
//import org.apache.commons.lang3.ObjectUtils;
//import org.apache.commons.lang3.StringUtils;
//import org.apache.lucene.analysis.Analyzer;
//import org.apache.lucene.document.*;
//import org.apache.lucene.index.*;
//import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
//import org.apache.lucene.queryparser.classic.QueryParser;
//import org.apache.lucene.search.*;
//import org.apache.lucene.search.highlight.*;
//import org.apache.lucene.store.Directory;
//import org.apache.lucene.store.FSDirectory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import org.wltea.analyzer.lucene.IKAnalyzer;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Paths;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class SearchServiceImpl implements ISearchService {
//    private final static String INDEX_DIR = "store/lucene/index";
//    private final static String ARTICLE_INDEX = INDEX_DIR + "/article";
//    private static final String[] SEARCH_FIELDS = {"title", "description", "content"};
//    private static final int MAX_FRAGMENT_SIZE = 200;
//    private static final int MAX_PAGE_SIZE = 100; // 最大分页大小限制
//    @Autowired
//    private ISearchHistoryService searchHistoryService;
//
//    /**
//     * 保存文章索引
//     *
//     * @param article 文章信息
//     * @return
//     */
//    @Override
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
//            doc.add(new StringField("viewCount", String.valueOf(article.getViewCount()), Field.Store.YES));
//            doc.add(new StringField("commentCount", String.valueOf(article.getCommentCount()), Field.Store.YES));
//            doc.add(new StringField("publishTime", String.valueOf(article.getPublishTime()), Field.Store.YES));
//            doc.add(new StringField("collectCount", String.valueOf(article.getCollectCount()), Field.Store.YES));
//            doc.add(new StringField("cover", String.valueOf(article.getCover()), Field.Store.YES));
//
//            //TextField 分词 建索引 存储
//            doc.add(new TextField("title", article.getTitle(), Field.Store.YES));
//            doc.add(new TextField("description", article.getDescription(), Field.Store.YES));
//            //TextField 分词 建索引 存储
//            doc.add(new TextField("content", article.getContent(), Field.Store.YES));
//            //如果没有查询结果，添加
//            if (topDocs != null && topDocs.totalHits.value == 0) {
//                indexWriter.addDocument(doc);
//                //否则，更新
//            } else {
//                indexWriter.updateDocument(new Term("id", article.getId()), doc);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("添加索引库出错：" + e.getMessage());
//        } finally {
//            if (indexWriter != null) {
//                try {
//                    indexWriter.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//            if (indexReader != null) {
//                try {
//                    indexReader.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//            if (directory != null) {
//                try {
//                    directory.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//            if (analyzer != null) {
//                analyzer.close();
//            }
//        }
//        return 1;
//    }
//
//    /**
//     * @param articleId
//     * @return
//     */
//    @Override
//    public int deleteIndex(ArticleId articleId) {
//        //删除全文检索
//        IndexWriter indexWriter = null;
//        Directory directory = null;
//        try (Analyzer analyzer = new IKAnalyzer()) {
//            directory = FSDirectory.open(Paths.get(ARTICLE_INDEX));
//            IndexWriterConfig writerConfig = new IndexWriterConfig(analyzer);
//            indexWriter = new IndexWriter(directory, writerConfig);
//            //根据id字段进行删除
//            indexWriter.deleteDocuments(new Term("id", articleId.aid()));
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("删除索引库出错：" + e.getMessage());
//        } finally {
//            if (indexWriter != null) {
//                try {
//                    indexWriter.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//            if (directory != null) {
//                try {
//                    directory.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//        return 0;
//    }
//
//    /**
//     * 全文搜索文章
//     *
//     * @param keyword 搜索关键字
//     * @param request 搜索请求（包含分页信息）
//     * @return 分页的文章搜索结果
//     */
//    @Override
//    @Transactional(rollbackFor = Exception.class)
//    public Page<Article> fullTextSearch(String keyword, SearchRequest request) throws IOException {
//        // 参数校验
//        int page = Math.max(1, request.getPage());
//        int limit = Math.min(Math.max(1, request.getSize()), MAX_PAGE_SIZE);
//        Page<Article> pageData = new Page<>(page, limit);
//        List<Article> searchList = new ArrayList<>();
//
//        Directory directory = null;
//        IndexReader indexReader = null;
//        try (Analyzer analyzer = new IKAnalyzer(true)) {
//            // 打开索引目录
//            directory = FSDirectory.open(Paths.get(ARTICLE_INDEX));
//            indexReader = DirectoryReader.open(directory);
//            IndexSearcher indexSearcher = new IndexSearcher(indexReader);
//
//            // 处理关键字
//            String sanitizedKeyword = StringUtils.defaultIfBlank(keyword, "*:*");
//            QueryParser queryParser = new MultiFieldQueryParser(SEARCH_FIELDS, analyzer);
//            Query query = queryParser.parse(QueryParser.escape(sanitizedKeyword));
//
//            // 单次查询获取总数和分页数据
//            int totalHits = searchAndPaginate(indexSearcher, query, page, limit, searchList, analyzer);
//
//            // 设置分页信息
//            pageData.setTotal(totalHits);
//            pageData.setRecords(searchList);
//
//            // 记录搜索历史 异步记录
//            if (StpKit.USER.isLogin()) {
//                String userId = StpKit.USER.getLoginIdAsString();
//                if (StringUtils.isNotBlank(userId) && !sanitizedKeyword.equals("*:*")) {
//                    SearchHistory searchHistory = searchHistoryService.getSearchHistory(userId, keyword);
//                    if (ObjectUtils.isEmpty(searchHistory)) {
//                        searchHistoryService.save(new SearchHistory(userId, sanitizedKeyword));
//                    }
//                }
//            }
//            return pageData;
//
//        } catch (Exception e) {
//            throw new RuntimeException("全文检索出错：" + e.getMessage(), e);
//        } finally {
//            indexReader.close();
//            directory.close();
//
//        }
//    }
//
//    /**
//     * 执行搜索并分页
//     *
//     * @param searcher   索引搜索器
//     * @param query      查询对象
//     * @param page       当前页码
//     * @param limit      每页大小
//     * @param searchList 结果列表
//     * @param analyzer   分词器
//     * @return 总记录数
//     * @throws IOException IO异常
//     */
//    private int searchAndPaginate(IndexSearcher searcher, Query query, int page, int limit,
//                                  List<Article> searchList, Analyzer analyzer) throws IOException, InvalidTokenOffsetsException {
//        // 查询足够多的记录以支持分页
//        int maxDocsToFetch = page * limit;
//        TopDocs topDocs = searcher.search(query, maxDocsToFetch);
//
//        int totalHits = (int) topDocs.totalHits.value;
//        if (totalHits == 0) {
//            return 0;
//        }
//
//        // 计算分页范围
//        int startIndex = (page - 1) * limit;
//        int endIndex = Math.min(startIndex + limit, totalHits);
//
//        if (startIndex >= totalHits) {
//            return totalHits; // 返回总数但无数据
//        }
//
//        // 高亮处理
//        QueryScorer queryScorer = new QueryScorer(query);
//        SimpleSpanFragmenter fragmenter = new SimpleSpanFragmenter(queryScorer, MAX_FRAGMENT_SIZE);
//        SimpleHTMLFormatter formatter = new SimpleHTMLFormatter("<b><font color='red'>", "</font></b>");
//        Highlighter highlighter = new Highlighter(formatter, queryScorer);
//        highlighter.setTextFragmenter(fragmenter);
//
//        // 提取当前页数据
//        ScoreDoc[] scoreDocs = topDocs.scoreDocs;
//        for (int i = startIndex; i < endIndex; i++) {
//            Document doc = searcher.doc(scoreDocs[i].doc);
//            Article article = buildArticleFromDoc(doc, analyzer, highlighter);
//            searchList.add(article);
//        }
//
//        return totalHits;
//    }
//
//    /**
//     * 从 Lucene Document 构建 Article 对象
//     */
//    private Article buildArticleFromDoc(Document doc, Analyzer analyzer, Highlighter highlighter) throws IOException, InvalidTokenOffsetsException {
//        Article article = new Article();
//        String id = doc.get("id");
//        if (StringUtils.isBlank(id)) {
//            return article;
//        }
//
//        article.setId(id);
//
//        String title = doc.get("title");
//        String description = doc.get("description");
//        String content = doc.get("content");
//
//        String titleFragment = highlighter.getBestFragment(analyzer, "title", title);
//        String descFragment = highlighter.getBestFragment(analyzer, "description", description);
//        String contentFragment = highlighter.getBestFragment(analyzer, "content", content);
//
//        article.setTitle(StringUtils.defaultIfBlank(titleFragment, title));
//        article.setContent(StringUtils.defaultIfBlank(descFragment, StringUtils.defaultIfBlank(contentFragment, content)));
//
//        article.setLikeCount(parseIntField(doc.get("likeCount"), 0));
//        article.setViewCount(parseIntField(doc.get("viewCount"), 0));
//        article.setCommentCount(parseIntField(doc.get("commentCount"), 0));
//        article.setCollectCount(parseIntField(doc.get("collectCount"), 0));
//
//        String publishTime = doc.get("publishTime");
//        article.setPublishTime(StringUtils.isNotBlank(publishTime) ? LocalDateTime.parse(publishTime) : null);
//        article.setCover(doc.get("cover"));
//
//        return article;
//    }
//
//    private int parseIntField(String value, int defaultValue) {
//        try {
//            return StringUtils.isNotBlank(value) ? Integer.parseInt(value) : defaultValue;
//        } catch (NumberFormatException e) {
//            return defaultValue;
//        }
//    }
//
//
////    public IPage<Article> fullTextSearch(String keyword, SearchRequest request) {
////        int page = request.getPage();
////        int limit = request.getSize();
////        List<Article> searchList = new ArrayList<>(10);
////        Page<Article> pageData = new Page<>(page, limit);
////        File indexFile = new File(ARTICLE_INDEX);
////        File[] files = indexFile.listFiles();
////        //沒有索引文件，不然沒有查詢結果
////        if (files == null || files.length == 0) {
////            pageData.setSize(0);
////            pageData.setTotal(0);
////            pageData.setCurrent(page);
////            pageData.setRecords(new ArrayList<>());
////            return pageData;
////        }
////        IndexReader indexReader = null;
////        Directory directory = null;
////        try (Analyzer analyzer = new IKAnalyzer()) {
////            directory = FSDirectory.open(Paths.get(ARTICLE_INDEX));
////            //多项查询条件
////            QueryParser queryParser = new MultiFieldQueryParser(new String[]{"title", "description", "content",
////                    "likeCount", "viewCount", "commentCount", "collectCount", "publishTime", "cover"}, analyzer);
////            //单项
////            //QueryParser queryParser = new QueryParser("title", analyzer);
////            Query query = queryParser.parse(StringUtils.hasText(keyword) ? keyword : "*:*");
////            indexReader = DirectoryReader.open(directory);
////            //索引查询对象
////            IndexSearcher indexSearcher = new IndexSearcher(indexReader);
////            TopDocs topDocs = indexSearcher.search(query, 1);
////            //获取条数
////            int total = (int) topDocs.totalHits.value;
////            pageData.setTotal(total);
//////            int realPage = total % limit == 0 ? total / limit : total / limit + 1;
//////            pageData.setPages(realPage);
////            //获取结果集
////            ScoreDoc lastSd = null;
////            if (page > 1) {
////                int num = limit * (page - 1);
////                TopDocs tds = indexSearcher.search(query, num);
////                lastSd = tds.scoreDocs[num - 1];
////
////            }
////            //通过最后一个元素去搜索下一页的元素 如果lastSd为null，查询第一页
////            TopDocs tds = indexSearcher.searchAfter(lastSd, query, limit);
////            QueryScorer queryScorer = new QueryScorer(query);
////            //最佳摘要
////            SimpleSpanFragmenter fragmenter = new SimpleSpanFragmenter(queryScorer, 200);
////            //高亮前后标签
////            SimpleHTMLFormatter formatter = new SimpleHTMLFormatter("<b><font color='red'>", "</font></b>");
////            //高亮对象
////            Highlighter highlighter = new Highlighter(formatter, queryScorer);
////            //设置高亮最佳摘要
////            highlighter.setTextFragmenter(fragmenter);
////            //遍历查询结果 把标题和内容替换为带高亮的最佳摘要
////            for (ScoreDoc sd : tds.scoreDocs) {
////                Document doc = indexSearcher.doc(sd.doc);
////                Article article = new Article();
////                String id = doc.get("id");
////                //获取标题的最佳摘要
////                String titleBestFragment = highlighter.getBestFragment(analyzer, "title", doc.get("title"));
////                String descBestFragment = highlighter.getBestFragment(analyzer, "description", doc.get("description"));
////                String contentBestFragment = highlighter.getBestFragment(analyzer, "content", doc.get("content"));
////                article.setId(id);
////                article.setLikeCount(Integer.valueOf(doc.get("likeCount")));
////                article.setViewCount(Integer.valueOf(doc.get("viewCount")));
////                article.setCommentCount(Integer.valueOf(doc.get("commentCount")));
////                article.setCollectCount(Integer.valueOf(doc.get("collectCount")));
////                article.setPublishTime(LocalDateTime.parse(doc.get("publishTime")));
////                article.setCover(doc.get("cover"));
////                article.setTitle(titleBestFragment);
////                //article.setDescription(descBestFragment);
////                article.setContent(contentBestFragment);
////                if (ObjectUtils.isEmpty(titleBestFragment)) {
////                    article.setTitle(doc.get("title"));
////                }
////                if (ObjectUtils.isEmpty(descBestFragment)) {
////                    if (ObjectUtils.isEmpty(contentBestFragment)) {
////                        article.setContent(doc.get("content"));
////                    } else {
////                        article.setContent(contentBestFragment);
////                    }
////
////                } else {
////                    article.setContent(descBestFragment);
////                }
////
////                searchList.add(article);
////            }
////            pageData.setCurrent(page);
////            pageData.setRecords(searchList);
////            return pageData;
////        } catch (Exception e) {
////            e.printStackTrace();
////            throw new RuntimeException("全文檢索出错：" + e.getMessage());
////        } finally {
////            if (indexReader != null) {
////                try {
////                    indexReader.close();
////                } catch (IOException e) {
////                    e.printStackTrace();
////                }
////            }
////            if (directory != null) {
////                try {
////                    directory.close();
////                } catch (IOException e) {
////                    e.printStackTrace();
////                }
////            }
////        }
////
////    }
//
//}
