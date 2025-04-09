/*
 * Copyright (c) 2017 Baidu, Inc. All Rights Reserve.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.baidu.fsg.uid.worker.entity;

import com.baidu.fsg.uid.worker.WorkerNodeType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity for M_WORKER_NODE
 *
 * @author yutianbao
 */
@Data
@Table("WORKER_NODE")
public class WorkerNodeEntity {

    /**
     * Entity unique id (table unique)
     */
    @Id
    private Long id;

    /**
     * Type of CONTAINER: HostName, ACTUAL : IP.
     */
    @Column("HOST_NAME")
    private String hostName;

    /**
     * Type of CONTAINER: Port, ACTUAL : Timestamp + Random(0-10000)
     */
    private String port;

    /**
     * type of {@link WorkerNodeType}
     */
    private int type;

    /**
     * Worker launch date, default now
     */
    @Column("LAUNCH_DATE")
    private LocalDate launchDate = LocalDate.now();

    /**
     * Created time
     */
    private LocalDateTime created;

    /**
     * Last modified
     */
    private LocalDateTime modified;

}
