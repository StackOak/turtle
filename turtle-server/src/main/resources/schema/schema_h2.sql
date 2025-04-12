
CREATE TABLE article (
                         id VARCHAR(32) NOT NULL,
                         title VARCHAR(100) NOT NULL,
                         description VARCHAR(255),
                         content CLOB NOT NULL,
                         view_count INT NOT NULL DEFAULT 0,
                         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         published_at TIMESTAMP,
                         access_password VARCHAR(1024),
                         deleted TINYINT NOT NULL DEFAULT 0,
                         status TINYINT NOT NULL DEFAULT 1,
                         tag_names VARCHAR(255),
                         is_protected BOOLEAN NOT NULL DEFAULT FALSE,
                         PRIMARY KEY (id)
);
CREATE TABLE tag (
                     name VARCHAR(50) NOT NULL,
                     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                     id VARCHAR(32) NOT NULL,
                     PRIMARY KEY (id),
                     CONSTRAINT uniq_name UNIQUE (name)
);
CREATE TABLE article_tag (
                             article_id VARCHAR(32) NOT NULL,
                             tag_id VARCHAR(32) NOT NULL,
                             PRIMARY KEY (article_id, tag_id),
                             FOREIGN KEY (article_id) REFERENCES article(id),
                             FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE config (
                        config_key VARCHAR(50) NOT NULL,
                        config_json CLOB NOT NULL,
                        PRIMARY KEY (config_key)
);




CREATE TABLE "user" (
                        id VARCHAR(32) NOT NULL,
                        username VARCHAR(50) NOT NULL,
                        nickname VARCHAR(50) NOT NULL,
                        description VARCHAR(255),
                        password VARCHAR(1024) NOT NULL,
                        status TINYINT NOT NULL DEFAULT 1,
                        remark VARCHAR(255),
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        avatar VARCHAR(255),
                        about_me CLOB,
                        deleted TINYINT NOT NULL DEFAULT 0,
                        PRIMARY KEY (id),
                        CONSTRAINT uniq_username UNIQUE (username)
);


CREATE TABLE worker_node (
                             id BIGINT AUTO_INCREMENT NOT NULL,
                             host_name VARCHAR(64) NOT NULL,
                             port VARCHAR(64) NOT NULL,
                             type INT NOT NULL,
                             launch_date DATE NOT NULL,
                             modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             PRIMARY KEY (id)
);

