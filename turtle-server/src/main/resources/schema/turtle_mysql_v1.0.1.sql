/*
 Navicat Premium Dump SQL

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : turtle

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 14/04/2025 18:30:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(32) NOT NULL COMMENT '文章ID，主键自增',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `description` varchar(255) DEFAULT NULL COMMENT '文章简介',
  `content` text NOT NULL COMMENT '文章内容',
  `view_count` int unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `published_at` datetime DEFAULT NULL COMMENT '发布时间',
  `access_password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '访问密码（加密存储，可为空）',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '软删除标记：0未删除，1已删除',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1已发布，0草稿',
  `tag_names` varchar(255) DEFAULT NULL COMMENT '标签冗余列表，用分号分隔',
  `is_protected` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否受保护',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章表';

-- ----------------------------
-- Table structure for article_tag
-- ----------------------------
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag` (
  `article_id` varchar(32) NOT NULL COMMENT '文章ID',
  `tag_id` varchar(32) NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`article_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章与标签关联表';

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `config_key` varchar(50) NOT NULL COMMENT '配置键名',
  `config_json` json NOT NULL COMMENT '配置内容，JSON格式存储',
  PRIMARY KEY (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='配置表';

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `name` varchar(50) NOT NULL COMMENT '标签名称',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `id` varchar(32) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标签表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(32) NOT NULL COMMENT '用户ID，主键自增',
  `username` varchar(50) NOT NULL COMMENT '用户名，唯一标识',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `description` varchar(255) DEFAULT NULL COMMENT '用户简介',
  `password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码（加密存储）',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1启用，0禁用',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `about_me` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '关于我，详细介绍',
  `deleted` tinyint NOT NULL DEFAULT '0' COMMENT '软删除标记：0未删除，1已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';

-- ----------------------------
-- Table structure for WORKER_NODE
-- ----------------------------
DROP TABLE IF EXISTS `WORKER_NODE`;
CREATE TABLE `WORKER_NODE` (
  `ID` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment id',
  `HOST_NAME` varchar(64) NOT NULL COMMENT 'host name',
  `PORT` varchar(64) NOT NULL COMMENT 'port',
  `TYPE` int NOT NULL COMMENT 'node type: ACTUAL or CONTAINER',
  `LAUNCH_DATE` date NOT NULL COMMENT 'launch date',
  `MODIFIED` timestamp NOT NULL COMMENT 'modified time',
  `CREATED` timestamp NOT NULL COMMENT 'created time',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='DB WorkerID Assigner for UID Generator';

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `user` (`id`, `username`, `nickname`, `description`, `password`, `status`, `remark`, `created_at`, `updated_at`, `avatar`, `about_me`, `deleted`) VALUES ('1', 'admin', '张三', '热爱技术的程序员', '245d5d2e34340b276cb7c3a7a88f5949f359bca4ff60f180abed616e47140fe4de832473e68ae3544695c7a94e29541cecb809a4763d7de035a79def6e68108c2f86ebf22b280539360d2940a48725b9b6deb64ef46b8ff8ecb1304746cb8dba613b09d4bc52452b62b01d8032cfbc5c53bb1e1049546e227e3751644f41b3e6', 1, '测试用户', '2025-04-01 10:00:00', '2025-04-10 09:18:46', '/logo.jpeg', '# hello world', 0);


INSERT INTO `config` (`config_key`, `config_json`) VALUES ('law_config', '{\"icp_link\": \"http://icp.example.com\", \"copyright\": \"@Copyright (c) 2025 xilio. All Rights Reserved.\", \"icp_number\": \"IC1P证78522123456\", \"police_record\": \"公安备案号 415155125113\", \"police_record_link\": \"http://police.example.com\"}');
INSERT INTO `config` (`config_key`, `config_json`) VALUES ('seo_config', '{\"logo\": \"http://192.168.0.151:8000/oss/file/image/4826580790076416001.jpeg\", \"blog_name\": \"我的技术论坛\", \"site_title\": \"xilio\", \"site_favicon\": \"/favicon.ico\", \"site_keywords\": \"博客,技术,编程\", \"site_description\": \"一个技术分享博客\"}');
INSERT INTO `config` (`config_key`, `config_json`) VALUES ('social', '{\"gitee\": \"https://gitee.com/xilio\", \"github\": \"https://github.com/stackoak\"}');
