package cn.xilio.xilio.service.impl;

import cn.xilio.xilio.repository.ArticleRepository;
import cn.xilio.xilio.service.ArticleService;
import com.baidu.fsg.uid.UidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private UidGenerator uidGenerator;
    @Autowired
    private R2dbcEntityTemplate template;
}
