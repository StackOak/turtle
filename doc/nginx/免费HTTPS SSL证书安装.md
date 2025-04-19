#CentOS安装cerbot工具依赖库

```
sudo dnf install epel-release
```

```
sudo dnf install certbot python3-certbot-nginx
```
查看版本，有版本输出表示成功
```
certbot --version
```

Nginx自动配置SSL证书

```
sudo certbot --nginx
```



