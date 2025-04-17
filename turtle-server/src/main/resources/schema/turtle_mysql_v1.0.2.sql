/*
 Navicat Premium Dump SQL

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : xilio

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 17/04/2025 19:03:04
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
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
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
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(32) NOT NULL COMMENT '分类ID（字符串）',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `description` text COMMENT '分类描述',
  `type` int NOT NULL DEFAULT '1' COMMENT '分类类型（1: 链接导航）',
  `sort` int DEFAULT '0' COMMENT '排序（越大越靠前）',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`) COMMENT '分类名称索引，加速搜索',
  KEY `idx_type` (`type`) COMMENT '分类类型索引，加速筛选'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='链接分类表';

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
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(32) NOT NULL COMMENT '导航项唯一标识符',
  `pid` varchar(32) DEFAULT NULL COMMENT '父级导航ID（用于多级菜单）',
  `label` varchar(20) NOT NULL COMMENT '导航显示名称',
  `icon` varchar(30) DEFAULT NULL COMMENT '导航图标类名或URL',
  `to` varchar(128) DEFAULT NULL COMMENT '导航跳转路径/URL',
  `target` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '链接打开方式（_self/_blank）',
  `type` int NOT NULL DEFAULT '1' COMMENT '导航类型 label link',
  `badge` varchar(10) DEFAULT NULL COMMENT '角标文字（如"New"）',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序权重（数字越大越靠前）',
  `remark` varchar(50) DEFAULT NULL COMMENT '备注信息',
  `menu_type` int NOT NULL DEFAULT '1' COMMENT '导航分类：1-门户导航菜单',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态：0-禁用 1-启用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_admin` int NOT NULL DEFAULT '0' COMMENT '是否管理员可见：1-管理员；0-公开',
  PRIMARY KEY (`id`),
  KEY `idx_pid` (`pid`),
  KEY `idx_sort` (`sort`),
  KEY `idx_nav_type` (`menu_type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统导航菜单表';

-- ----------------------------
-- Table structure for nav_link
-- ----------------------------
DROP TABLE IF EXISTS `nav_link`;
CREATE TABLE `nav_link` (
  `id` varchar(32) NOT NULL COMMENT '链接ID（字符串）',
  `cid` varchar(32) NOT NULL COMMENT '分类ID（字符串）',
  `title` varchar(100) NOT NULL COMMENT '链接标题',
  `url` varchar(255) NOT NULL COMMENT '链接地址',
  `description` text COMMENT '链接描述',
  `logo` varchar(255) DEFAULT NULL COMMENT '链接图标或Logo（URL/路径）',
  `sort` int DEFAULT '0' COMMENT '排序（越大越靠前）',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `idx_cid` (`cid`) COMMENT '分类ID索引，加速查询',
  KEY `idx_title` (`title`) COMMENT '标题索引，加速搜索'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='导航链接表';

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
) ENGINE=InnoDB AUTO_INCREMENT=540 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='DB WorkerID Assigner for UID Generator';

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `user` (`id`, `username`, `nickname`, `description`, `password`, `status`, `remark`, `created_at`, `updated_at`, `avatar`, `about_me`, `deleted`) VALUES ('1', 'admin', '张三', '热爱技术的程序员', '7458e1f3891c8e29d8e84b75a94cf5706893c1fe38cbce134a669a6042791ea1568d4e6f87b185911e5a57cd58eace803646f536bafad6d281f2b9ae3ada6fdd30ca228bd45600f37f8481000dc10d3ec84d3864ff5530ba08dcf598cbfb7e6a6c2a2743acb75ebe72889ffd040eccfd363b6243b055b13ff5813c81f4837cfc', 1, '测试用户', '2025-04-01 10:00:00', '2025-04-17 18:44:35', '/logo.jpeg', '# hello world\n', 0);

INSERT INTO `config` (`config_key`, `config_json`) VALUES ('law_config', '{\"icp_link\": \"http://icp.example.com\", \"copyright\": \"@Copyright (c) 2025 xilio. All Rights Reserved.\", \"icp_number\": \"IC1P证78522123456\", \"police_record\": \"公安备案号 415155125113\", \"police_record_link\": \"http://police.example.com\"}');
INSERT INTO `config` (`config_key`, `config_json`) VALUES ('seo_config', '{\"logo\": \"/logo.jpeg\", \"blog_name\": \"我的技术论坛\", \"site_title\": \"xilio\", \"site_favicon\": \"/favicon.ico\", \"site_keywords\": \"博客,技术,编程\", \"site_description\": \"一个技术分享博客\"}');
INSERT INTO `config` (`config_key`, `config_json`) VALUES ('social', '{\"gitee\": \"https://gitee.com/xilio\", \"github\": \"https://github.com/stackoak\"}');

INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_001', NULL, '主页', 'i-lucide-home', '/', '_self', 1, NULL, 1, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 11:42:09', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_002', NULL, '搜索', 'i-lucide-search', '/search', '_self', 1, NULL, 2, 'labelKey: search', 1, 1, '2025-04-16 11:42:09', '2025-04-16 11:42:09', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_004', NULL, '标签', 'i-lucide-tag', '/tag', '_self', 1, NULL, 4, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 11:42:09', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_005', NULL, '导航', 'i-ion:navigate-outline', '/nav', '_self', 1, NULL, 5, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 11:42:09', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_006', NULL, '关于我', 'ix:about', '/about', '_self', 1, NULL, 6, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 11:42:09', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_007', NULL, '创作中心', 'i-hugeicons:quill-write-02', '/console', '_blank', 1, NULL, 7, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-17 15:59:05', 1);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_008', NULL, 'GitHub', 'i-simple-icons-github', 'https://github.com/stackoak', '_blank', 1, NULL, 8, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 12:23:26', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_009', NULL, 'Gitee', 'i-simple-icons-gitee', 'https://gitee.com/xilio', '_blank', 1, NULL, 9, NULL, 1, 1, '2025-04-16 11:42:09', '2025-04-16 12:23:08', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_010', NULL, '监控中心', 'i-stash-dashboard-light', '/console', '_self', 1, NULL, 1, NULL, 2, 1, '2025-04-16 12:03:26', '2025-04-16 20:23:36', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_012', NULL, '关于我', 'ix:about', '/console/about', '_self', 1, NULL, 3, NULL, 2, 1, '2025-04-16 12:03:26', '2025-04-16 12:03:26', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menu_013', NULL, '网站配置', 'i-icon-park-outline-config', '/console/config', '_self', 1, NULL, 4, NULL, 2, 1, '2025-04-16 12:03:26', '2025-04-16 12:03:26', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menua_001', NULL, '内容管理', 'i-lucide-home', '/', '_self', 1, NULL, 1, NULL, 2, 1, '2025-04-16 12:16:46', '2025-04-16 12:18:25', 0);
INSERT INTO `menu` (`id`, `pid`, `label`, `icon`, `to`, `target`, `type`, `badge`, `sort`, `remark`, `menu_type`, `status`, `created_at`, `updated_at`, `is_admin`) VALUES ('menua_009', 'menua_001', '文章管理', 'i-simple-icons-gitee', '/console/article', '_self', 1, NULL, 2, NULL, 2, 1, '2025-04-16 12:16:46', '2025-04-16 12:20:04', 0);

INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('1', 'IOC框架', NULL, 1, 0, '2025-04-16 14:53:27', '2025-04-16 15:52:24');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('10', '搜索引擎', NULL, 1, 0, '2025-04-16 16:34:53', '2025-04-16 16:34:53');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('11', '大数据', NULL, 1, 0, '2025-04-16 16:43:51', '2025-04-16 16:43:51');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('12', '部署运维', NULL, 1, 0, '2025-04-16 16:55:36', '2025-04-16 16:55:36');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('13', '测试', NULL, 1, 0, '2025-04-16 17:02:41', '2025-04-16 17:02:41');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('14', '大佬', NULL, 1, 0, '2025-04-16 17:05:29', '2025-04-16 17:06:58');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('15', '中间件', NULL, 1, 0, '2025-04-16 17:18:26', '2025-04-16 17:18:26');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('16', '网络相关', NULL, 1, 0, '2025-04-16 17:30:01', '2025-04-16 17:30:01');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('2', '持久层', NULL, 1, 0, '2025-04-16 15:06:18', '2025-04-16 15:07:10');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('3', 'AI', NULL, 1, 0, '2025-04-16 15:52:04', '2025-04-16 15:52:04');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('4', '开发工具包', NULL, 1, 0, '2025-04-16 15:57:31', '2025-04-16 16:46:17');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('5', 'UI框架', NULL, 1, 0, '2025-04-16 16:01:30', '2025-04-16 16:01:34');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('6', '微服务', NULL, 1, 0, '2025-04-16 16:04:26', '2025-04-16 16:05:39');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('7', '前端', NULL, 1, 0, '2025-04-16 16:07:55', '2025-04-16 16:08:07');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('8', '数据库/缓存', NULL, 1, 0, '2025-04-16 16:27:32', '2025-04-16 17:39:46');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('9', '消息中间件', NULL, 1, 0, '2025-04-16 16:31:18', '2025-04-16 16:31:18');


INSERT INTO `article` (`id`, `title`, `description`, `content`, `view_count`, `created_at`, `updated_at`, `published_at`, `access_password`, `deleted`, `status`, `tag_names`, `is_protected`) VALUES ('4831235847431102464', '我的第一行代码叫Hello World', '我的第一篇文章', '# 介绍\n\n**Hello World**\n\n::: info 温馨提示\n这里可以写一写东西\n:::\n+++ java\n快速排序\n++- python\n快速排序\n++ c++\n快速排序\n+++\n\n```mermaid\npie\ntitle 世界上最好的语言\n\"A\" : 100\n\"B\" : 80\n\"C\" : 40\n\"D\" : 30\n```\n', 2, '2025-04-17 19:20:31', '2025-04-17 19:20:31', '2025-04-17 19:20:31', NULL, 0, 1, 'Java、C++', 0);
INSERT INTO `article_tag` (`article_id`, `tag_id`) VALUES ('4831235847431102464', '4831235847431102465');
INSERT INTO `article_tag` (`article_id`, `tag_id`) VALUES ('4831235847431102464', '4831235847431102466');
INSERT INTO `tag` (`name`, `created_at`, `id`) VALUES ('Java', '2025-04-17 19:20:31', '4831235847431102465');
INSERT INTO `tag` (`name`, `created_at`, `id`) VALUES ('C++', '2025-04-17 19:20:31', '4831235847431102466');

INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('1', 'IOC框架', NULL, 1, 0, '2025-04-16 14:53:27', '2025-04-16 15:52:24');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('10', '搜索引擎', NULL, 1, 0, '2025-04-16 16:34:53', '2025-04-16 16:34:53');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('11', '大数据', NULL, 1, 0, '2025-04-16 16:43:51', '2025-04-16 16:43:51');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('12', '部署运维', NULL, 1, 0, '2025-04-16 16:55:36', '2025-04-16 16:55:36');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('13', '测试', NULL, 1, 0, '2025-04-16 17:02:41', '2025-04-16 17:02:41');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('14', '大佬', NULL, 1, 0, '2025-04-16 17:05:29', '2025-04-16 17:06:58');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('15', '中间件', NULL, 1, 0, '2025-04-16 17:18:26', '2025-04-16 17:18:26');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('16', '网络相关', NULL, 1, 0, '2025-04-16 17:30:01', '2025-04-16 17:30:01');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('2', '持久层', NULL, 1, 0, '2025-04-16 15:06:18', '2025-04-16 15:07:10');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('3', 'AI', NULL, 1, 0, '2025-04-16 15:52:04', '2025-04-16 15:52:04');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('4', '开发工具包', NULL, 1, 0, '2025-04-16 15:57:31', '2025-04-16 16:46:17');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('5', 'UI框架', NULL, 1, 0, '2025-04-16 16:01:30', '2025-04-16 16:01:34');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('6', '微服务', NULL, 1, 0, '2025-04-16 16:04:26', '2025-04-16 16:05:39');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('7', '前端', NULL, 1, 0, '2025-04-16 16:07:55', '2025-04-16 16:08:07');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('8', '数据库/缓存', NULL, 1, 0, '2025-04-16 16:27:32', '2025-04-16 17:39:46');
INSERT INTO `category` (`id`, `name`, `description`, `type`, `sort`, `created_at`, `updated_at`) VALUES ('9', '消息中间件', NULL, 1, 0, '2025-04-16 16:31:18', '2025-04-16 16:31:18');


INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('1', '1', 'Spring', 'https://spring.io/', '核心开发框架', 'https://spring.io/img/logos/spring-initializr.svg', 0, '2025-04-16 14:53:11', '2025-04-16 15:48:53', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('10', '6', 'Nacos', 'https://nacos.io/', '注册中心、配置中心', NULL, 0, '2025-04-16 16:11:28', '2025-04-16 16:11:46', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('11', '3', 'Grok', 'https://x.com/i/grok', '马斯克AI', NULL, 0, '2025-04-16 16:23:06', '2025-04-16 16:23:06', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('12', '3', '元宝', 'https://yuanbao.tencent.com/', '腾讯', NULL, 0, '2025-04-16 16:25:03', '2025-04-16 16:25:03', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('13', '3', 'DeepSeek', 'https://www.deepseek.com/', '深度求索开源AI', NULL, 0, '2025-04-16 16:25:56', '2025-04-16 16:25:56', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('14', '8', 'Redis', 'https://redis.io/', '分布式缓存', NULL, 0, '2025-04-16 16:27:53', '2025-04-16 16:28:16', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('15', '8', 'MongoDB', 'https://www.mongodb.com/', '文档数据库 高并发', NULL, 0, '2025-04-16 16:29:34', '2025-04-16 16:29:47', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('16', '9', 'Kafka', 'https://kafka.apache.org/', '', NULL, 0, '2025-04-16 16:31:52', '2025-04-16 16:31:52', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('17', '9', 'RabbitMQ', 'https://www.rabbitmq.com/', NULL, NULL, 0, '2025-04-16 16:32:30', '2025-04-16 16:33:10', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('18', '9', 'ActiveMQ', 'https://activemq.apache.org/', NULL, NULL, 0, '2025-04-16 16:32:58', '2025-04-16 16:33:12', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('19', '10', 'Lucene', 'https://lucene.apache.org/', NULL, NULL, 0, '2025-04-16 16:35:12', '2025-04-16 16:35:12', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('2', '1', 'Spring Boot', 'https://spring.io/projects/spring-boot', '快速开发速度很快，很牛逼', 'https://spring.io/img/projects/spring-boot.svg', 0, '2025-04-16 15:06:52', '2025-04-16 15:47:37', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('20', '10', 'Elasticsearch', 'https://www.elastic.co/', NULL, NULL, 0, '2025-04-16 16:36:30', '2025-04-16 16:37:37', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('21', '2', 'Hibernate', 'https://hibernate.org/', NULL, NULL, 0, '2025-04-16 16:40:57', '2025-04-16 16:40:57', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('22', '2', 'JOOQ', 'https://www.jooq.org/', '编程式SQL查询', 'https://www.jooq.org/img/jooq-logo-white.png', 0, '2025-04-16 16:42:12', '2025-04-16 16:42:57', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('23', '11', 'Spark', 'https://spark.apache.org/', '分布式计算', '	https://spark.apache.org/images/spark-logo-rev.svg', 0, '2025-04-16 16:44:15', '2025-04-16 16:44:42', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('24', '11', 'Zookeeper', 'https://zookeeper.apache.org/', '分布式一致性', NULL, 0, '2025-04-16 16:45:36', '2025-04-16 16:45:46', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('25', '12', 'Jenkins', 'https://www.jenkins.io/', '持续集成', 'https://www.jenkins.io/images/logos/jenkins/jenkins.svg', 0, '2025-04-16 16:56:07', '2025-04-16 16:56:48', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('26', '12', 'GitLab', 'https://about.gitlab.com/', '源码管理', 'https://about.gitlab.com/nuxt-images/free-trial/free-trial-nav-logo.svg', 0, '2025-04-16 16:57:54', '2025-04-16 16:57:54', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('27', '12', 'Docker', 'https://www.docker.com/', '容器化', NULL, 0, '2025-04-16 16:59:35', '2025-04-16 16:59:35', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('28', '12', 'K8s', 'https://kubernetes.io/zh-cn/docs/home/', '云原生', NULL, 0, '2025-04-16 17:00:27', '2025-04-16 17:00:27', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('29', '13', 'JMeter', 'https://jmeter.apache.org/', '高并发压力测试', NULL, 0, '2025-04-16 17:03:35', '2025-04-16 17:03:35', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('3', '2', 'Mybatis', 'https://mybatis.org/mybatis-3/zh_CN/getting-started.html', '知名ORM框架', 'https://mybatis.org/images/mybatis-logo.png', 0, '2025-04-16 15:52:53', '2025-04-16 16:00:30', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('30', '14', 'Martin', 'https://martinfowler.com/', '架构、DDD', 'https://martinfowler.com/img/mf-dallas.jpg', 0, '2025-04-16 17:06:01', '2025-04-16 17:07:56', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('31', '12', 'Nginx', 'https://nginx.org/', '反向代理', 'https://nginx.org/img/nginx_logo.png', 0, '2025-04-16 17:12:01', '2025-04-16 17:17:12', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('32', '15', 'ShardingSphere', 'https://shardingsphere.apache.org/index_zh.html', '分库分表', 'https://shardingsphere.apache.org/images/firstSection/shardingSphereLogo.png', 0, '2025-04-16 17:19:04', '2025-04-16 17:19:23', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('33', '12', 'Git', 'https://git-scm.com/', '源码管理', NULL, 0, '2025-04-16 17:22:50', '2025-04-16 17:22:50', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('34', '6', 'Apollo', 'https://www.apolloconfig.com/#/', '配置中心', NULL, 0, '2025-04-16 17:25:08', '2025-04-16 17:25:31', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('35', '7', 'tailwindcss', 'https://www.tailwindcss.cn/', '不写css，只写html', NULL, 0, '2025-04-16 17:27:28', '2025-04-16 17:27:28', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('36', '16', 'Netty', 'https://netty.io/', '事件驱动、异步IO', NULL, 0, '2025-04-16 17:30:35', '2025-04-16 17:30:35', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('37', '15', 'XXL-JOB', 'https://www.xuxueli.com/xxl-job/', '分布式任务调度', 'https://www.xuxueli.com/doc/static/xxl-job/images/xxl-logo.jpg', 0, '2025-04-16 17:31:49', '2025-04-16 17:32:34', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('38', '16', 'Reactor', 'https://projectreactor.io/', '反应式、非阻塞', 'https://projectreactor.io/assets/img/reactor.png', 0, '2025-04-16 17:35:57', '2025-04-16 17:35:57', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('39', '8', 'memcached', 'https://memcached.org/', '分布式缓存', NULL, 0, '2025-04-16 17:40:15', '2025-04-16 17:40:15', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('4', '2', 'Mybatis Plus', 'https://baomidou.com/', 'Mybatis加强版', 'https://baomidou.com/assets/asset.cIbiVTt_.svg', 0, '2025-04-16 15:53:23', '2025-04-16 15:59:43', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('40', '16', 'Arthas', 'https://arthas.aliyun.com/doc/', 'JVM调优、监控', NULL, 0, '2025-04-16 17:55:11', '2025-04-16 17:55:11', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('41', '4', 'Mapstruct', 'https://mapstruct.org/', 'Bean转换', NULL, 0, '2025-04-16 18:03:26', '2025-04-16 18:03:26', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('5', '4', 'Hutool', 'https://hutool.cn/docs/#/', '常用工具类', 'https://plus.hutool.cn/images/logo.jpg\n', 0, '2025-04-16 15:58:01', '2025-04-16 16:00:07', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('6', '5', 'Nuxt UI', 'https://ui.nuxt.com/', NULL, NULL, 0, '2025-04-16 16:02:04', '2025-04-16 16:02:04', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('7', '6', 'Gateway', 'https://spring.io/projects/spring-cloud-gateway', 'Spring 网关', 'https://spring.io/img/projects/spring-boot.svg', 0, '2025-04-16 16:05:04', '2025-04-16 16:05:11', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('8', '7', 'Vue', 'https://cn.vuejs.org/guide/introduction.html', NULL, NULL, 0, '2025-04-16 16:08:28', '2025-04-16 16:09:42', 1);
INSERT INTO `nav_link` (`id`, `cid`, `title`, `url`, `description`, `logo`, `sort`, `created_at`, `updated_at`, `status`) VALUES ('9', '7', 'Nuxt', 'https://nuxt.com/', 'SSR服务端渲染', NULL, 0, '2025-04-16 16:09:38', '2025-04-16 16:09:38', 1);
