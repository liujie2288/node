# 容器数据卷

在之前的 docker 学习中我们发现有几个问题：

1. 当部署 nginx 和 tomcat 容器时，如果需要修改配置或者部署项目，都需要进入到容器中，然后才能操作
2. 当部署一台 mysql 数据库容器时，数据保存在容器中，当删掉了容器就等于删掉了数据，非常的危险

docker 提供了数据卷的技术，可以让容器内和主机之间的数据进行同步，只需要设置好容器目录与主机目录之间的关系映射。

## 使用数据卷

### 使用命令行来挂载

```bash
docker run -v 主机目录地址:容器内目录
```

### 使用测试

```bash
# 测试， 使用主机/home/ceshi 与 容器 /home 建立映射

# 1. 进入home目录
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ cd /home
# 2. 确认home目录下没有ceshi这个目录
[root@iZj6c6y40ev1bo8uaiac2wZ home]$ ls
admin  jay  www
# 3. 基于centos镜像创建一个新容器，并建立主机/home/ceshi 与容器/home的关系
# 注意这里不能使用-d运行，而是需要使用-it进入，保持一个连接，否则centos容器会自动退出，前面的内容有讲到
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker run -it -v /home/ceshi:/home centos
# 4. ctrl + p + q退出容器环境(不终止容器执行)，然后查看home目录下文件，发现多了一个ceshi文件夹，这表示容器与主机目录之间已经建立映射关系
[root@57a4c3f92fb1 /]$ [root@iZj6c6y40ev1bo8uaiac2wZ home]$ cd /home&& ls
admin  ceshi  jay  www
# 5. 进入容器/home目录，测试在容器中添加文件后，主机/home/ceshi是否也同步新增了一个文件
[root@iZj6c6y40ev1bo8uaiac2wZ home]$ docker ps
[root@iZj6c6y40ev1bo8uaiac2wZ home]$ docker exec -it 57a4c3f92fb1 /bin/bash
[root@57a4c3f92fb1 /]$ cd /home
[root@57a4c3f92fb1 home]$ touch test.js
# 6. ctrl + p + q退出容器，返回主机
[root@57a4c3f92fb1 home]$ read escape sequence
# 7. 查看主机/home/ceshi目录下也新增了一个文件
[root@iZj6c6y40ev1bo8uaiac2wZ home]$ ls ceshi
test.js
```

> 补充说明：
>
> 1. 就算容器停止，也是可以正常同步的
> 2. 可以使用 `docker inspect 容器ID` 查看容器的挂载情况
>
> ```bash
> docker insepct 57a4c3f92fb1
>
> Mounts字段代表的就是容器数据卷挂载信息，可以存在多个，所以用数组表示
>
> "Mounts": [
>   {
>       "Type": "bind",
>       # 主机内地址
>       "Source": "/home/ceshi",
>       # docker容器内的地址
>       "Destination": "/home",
>       "Mode": "",
>       "RW": true,
>       "Propagation": "rprivate"
>   }
> ],
> ```

### 实战：Mysql 同步数据

```bash
# 1. 下载镜像mysql 5.7版本
$ docker pull mysql:5.7

# 2. 创建 mysql 容器
# (1). 需要做数据挂载，映射mysql的配置文件以及数据库到主机
# (2). 安装启动mysql，需要设置密码，参考安装地址：https://hub.docker.com/_/mysql

# -d 后台运行
# -p 本机端口7710映射容器端口3306
# -v 配置数据卷挂载，本地/home/mysql/conf与容器/etc/mysql/conf.d同步，本地/home/mysql/data:与容器/var/lib/mysql同步；
# -e 配置环境变量，设置mysql数据库密码
$ docker run -d -p 7710:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7

# 3. 测试连接远程数据库
mysql -h 47.243.206.107 -P 7710 -u root -p
```

通过以上数据卷挂载操作，以后我们对于容器的操作都可以在主机上进行，而不需要进入到容器内部。
