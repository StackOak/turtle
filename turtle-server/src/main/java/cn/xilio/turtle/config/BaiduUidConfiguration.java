package cn.xilio.turtle.config;

import com.baidu.fsg.uid.UidGenerator;
import com.baidu.fsg.uid.impl.CachedUidGenerator;
import com.baidu.fsg.uid.worker.DisposableWorkerIdAssigner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//bean 加载后才 WorkerNodeRepository
public class BaiduUidConfiguration {

    @Bean
    public DisposableWorkerIdAssigner disposableWorkerIdAssigner() {
        return new DisposableWorkerIdAssigner();
    }

    @Bean
    @ConditionalOnMissingBean(UidGenerator.class)
    public CachedUidGenerator uidGenerator(DisposableWorkerIdAssigner disposableWorkerIdAssigner) {
        CachedUidGenerator cachedUidGenerator = new CachedUidGenerator();
        cachedUidGenerator.setSeqBits(13);
        cachedUidGenerator.setTimeBits(29);
        cachedUidGenerator.setWorkerBits(21);
        cachedUidGenerator.setEpochStr("2016-05-20");
        cachedUidGenerator.setWorkerIdAssigner(disposableWorkerIdAssigner);
        return cachedUidGenerator;
    }
//    @Bean
//    @ConditionalOnMissingBean(UidGenerator.class)
//    public DefaultUidGenerator defaultUidGenerator(DisposableWorkerIdAssigner disposableWorkerIdAssigner) {
//        DefaultUidGenerator defaultUidGenerator = new DefaultUidGenerator();
//        defaultUidGenerator.setWorkerIdAssigner(disposableWorkerIdAssigner);
//        defaultUidGenerator.setSeqBits(13);
//        defaultUidGenerator.setTimeBits(29);
//        defaultUidGenerator.setWorkerBits(21);
//        defaultUidGenerator.setEpochStr("2016-05-20");
//        return defaultUidGenerator;
//    }
}
