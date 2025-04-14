# Turtle

一个高性能、简洁且交互友好的个人写作网站，响应式编程。

## 项目截图


## 快速开始
开发环境要求：
- 安装Jdk17即以上版本
- Maven环境 装最新版本即可
- Node 18及以上版本

1、启动服务端
- 创建MySQL数据库 脚本在resources/schema/turtle_mysql_v1.0.1.sql 并在application-mysql.yml中配置用户名和密码。

- 运行Setup即可启动服务端
2、启动前端
```shell
pnpm install

pnpm run dev
```
门户默认访问页面是 127.0.0.1:3000

管理端登陆页面访问：127.0.0.1:3000/console/login 用户名：admin  密码：123456

## 技术栈

### 后端技术

- jdk17
- Spring Boot3
- Web Flux
- Spring R2DBC
- Baidu UID
- MySQL
- Swagger UI
- Sa-Token

### 前端技术

- Nuxt3
- Nuxt UI
- vite
- Node 18
- Cherry Markdown Editor

# License

 
