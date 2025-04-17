# Turtle

一个简洁且交互友好的个人写作网站，单页面交互设计，减少跳转疲劳，基于Nuxt SSR实现服务端渲染，更利于SEO；后端完全采用响应式编程。

## 项目截图
| ![登录后首页](doc/screenshot/login_after.png)     | ![未登录首页](doc/screenshot/login_before.png) |
|----------------------------------------------|-----------------------------------------|
| ​**​登录后首页​**​                                | ​**​未登录首页​**​                           |
| ![文章编辑器](doc/screenshot/editor.png)          | ![文章详情页](doc/screenshot/detail.png)     |
| ------------------------------------------   | ----------------------------------------------- |
| ​**​文章编辑器​**​                                | ​**​文章详情页​**​                           |
| ![密码输入页](doc/screenshot/post_pwd.png)        | ![搜索页面](doc/screenshot/search.png)      |
| -------------------------------------------- | ---------------------------------------- |
| ​**​加密文章​**​                                 | ​**​统一搜索​**​                            |

## 快速开始 
开发环境要求：
- 安装Jdk17即以上版本
- Maven环境 装最新版本即可
- Node 18及以上版本

1、启动服务端
- 创建MySQL数据库 脚本在resources/schema/turtle_mysql_v1.0.2.sql 并在application-mysql.yml中配置用户名和密码。

- 运行Setup即可启动服务端
  
2、启动前端
```shell
pnpm install

pnpm run dev
```
门户首页访问地址： 127.0.0.1:3000

管理端登陆地址：127.0.0.1:3000/console/login （用户名：admin  密码：123456）

## 技术栈

### 后端技术

- jdk17
- Spring Boot3 
- Web Flux 接口层
- Spring R2DBC 持久层
- R2DBC-MySQL 数据库驱动
- Baidu UID 百度唯一ID生成器
- MySQL
- Swagger UI
- Sa-Token 权限认证

### 前端技术

- Nuxt3
- Nuxt UI
- vite
- Node 18
- Cherry Markdown Editor

# License

 
