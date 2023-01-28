# docker compose 容器编排

在实际情况中，可能存在同时启动多个容器的情况。比如，我们需要同时启动 tomcat 容器，mysql 容器，redis 容器时，如果手动的一个个启动，那么比较麻烦。如果再将集群部署考虑进去，那么启动的容器会非常多。因此 docker 提供了一种更简单的方式，来管理多个容器的联动。

## docker compose 简介

docker compose 是 docker 公司推出的一个工具软件，它可以管理多个 docker 容器组成一个应用。你需要使用 YAML 格式编写一个配置文件`docker-compose.yml`，并在里面定义好容器之间的调用关系。然后通过一个命令就可以同时启动/关闭这些容器。

```bash
# 查看compose所有命令
$ docker compose --help
# 查看docker compose 版本信息
$ docker compose version
# 启动所有服务
$ docker compose up
# 停止所有服务
$ docker compose stop
```

## docker compose 安装

在之前安装 docker 时也并一并安装了，可以通过`docker compose version`查看是否安装成功，如果还未安装吗，请参考[官方文档](https://docs.docker.com/compose/install/)。

## 实战：搭建一个 WordPress 应用

使用 compose 同时启动 wordpress web 程序 以及 wordpress mysql 程序。

新建`docker-compose.yml`文件，编写以下内容：

```yaml
#指定 docker compose 规范的版本
version: "3.1"

# 定义所有的 service 信息, services 下面的第一级别的 key 既是一个 service 的名称
services:
  wordpress:
    image:
      wordpress
      # 定义容器重启策略
    restart: always
    ports:
      - 7766:80
    # 定义环境变量
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    # 定义数据卷挂载
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_RANDOM_ROOT_PASSWORD: "1"
    volumes:
      - db_data:/var/lib/mysql
# 定义数据卷
volumes:
  wordpress:
  db_data:
```

启动容器：

```bash
$ docker compose up
```

通过 IP+端口访问 wordpress 应用，我这里是：[http://47.243.206.107:7766/](http://47.243.206.107:7766/)

停止后删除容器数据：

```bash
$ docker compose stop
$ docker compose rm
```
