# Turtle 
 
## 开发环境运行
```bash
# npm
pnpm install
 
pnpm dev
```
 
## 生产环境运行

SSR服务端渲染部署这里提供两种方式，分别是Node和pm2

构建SSR生产环境
```bash
# pnpm
pnpm run build
```
Node部署 默认会启动3000端口号
```bash
# node
 node .output/server/index.mjs
```

pm2部署 如果没有需要自行安装

``` PM2
pm2 start .output/server/index.mjs
```
