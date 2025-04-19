
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v /var/lib/docker/mysql/data:/var/lib/mysql \
  -v /var/lib/docker/mysql/my.cnf:/etc/mysql/my.cnf \
  -p 3306:3306 \
  --restart unless-stopped \
  mysql:latest



