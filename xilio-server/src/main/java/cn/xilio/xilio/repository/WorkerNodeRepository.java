package cn.xilio.xilio.repository;

import com.baidu.fsg.uid.worker.entity.WorkerNodeEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

/**
 * 暂时放在这个包
 */
public interface WorkerNodeRepository extends ReactiveCrudRepository<WorkerNodeEntity, Long> {
    @Query("SELECT ID, HOST_NAME, PORT, TYPE, LAUNCH_DATE, MODIFIED, CREATED " +
           "FROM WORKER_NODE " +
           "WHERE HOST_NAME = :host AND PORT = :port")
    Mono<WorkerNodeEntity> getWorkerNodeByHostPort(String host, String port);
}
