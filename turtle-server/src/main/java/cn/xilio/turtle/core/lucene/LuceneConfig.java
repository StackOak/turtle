package cn.xilio.turtle.core.lucene;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;

public class LuceneConfig {
    private String indexPath = "./lucene_index"; // 默认索引存储路径
    private Analyzer analyzer = new StandardAnalyzer(); // 默认分词器

    public LuceneConfig() {}

    public LuceneConfig(String indexPath, Analyzer analyzer) {
        this.indexPath = indexPath;
        this.analyzer = analyzer != null ? analyzer : new StandardAnalyzer();
    }

    public String getIndexPath() {
        return indexPath;
    }

    public void setIndexPath(String indexPath) {
        this.indexPath = indexPath;
    }

    public Analyzer getAnalyzer() {
        return analyzer;
    }

    public void setAnalyzer(Analyzer analyzer) {
        this.analyzer = analyzer;
    }
}
