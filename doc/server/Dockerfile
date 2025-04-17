FROM openjdk:17
# 设置工作目录
WORKDIR /app
# 复制jar
COPY target/turtle.jar app.jar
# 暴露端口
EXPOSE 8000
# 启动命令
ENTRYPOINT ["java", "-jar", "turtle.jar"]
