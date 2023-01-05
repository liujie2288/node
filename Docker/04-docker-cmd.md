# Docker 常用命令

## 基础命令

```bash
# 显示docker的版本信息
docker version
# 显示docker的系统信息，包括镜像和容器的数量
docker info
# 帮助命令
docker [cmd] --help
```

> 官方帮助文档地址：https://docs.docker.com/engine/reference/commandline/cli/

## 镜像命令

- `docker images`：查看所有本地主机上的镜像。

```bash
$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   15 months ago   13.3kB

# 解释
REPOSITORY 镜像的仓库源
TAG 镜像的标签
Image ID 镜像的ID
CREATED 镜像的创建时间

# 可选项
-a --all  # 列出所有的镜像
-q --quiet  # 只显示镜像的ID
```

- `docker search  镜像名称关键字`: 根据名称搜索 docker 镜像仓库，列出与名称匹配的镜像。

```bash
$ docker search mysql
NAME                            DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                           MySQL is a widely used, open-source relation…   13643     [OK]
mariadb                         MariaDB Server is a high performing open sou…   5214      [OK]
phpmyadmin                      phpMyAdmin - A web interface for MySQL and M…   716       [OK]

# 可选项
-f, --filter filter   根据条件筛选输出结果

# 筛选stars大于10000的mysql镜像
$ docker search mysql --filter stars=10000
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   13643     [OK]
```

- `docker pull 镜像名[:标签名]`：下载镜像，标签名不给，默认下载 latest 标签

```bash
$ docker pull mysql
Using default tag: latest  # 没有指定tag，默认为latest
latest: Pulling from library/mysql
0ed027b72ddc: Pull complete # 分层下载，不同版本之间可以复用
0296159747f1: Pull complete
3d2f9b664bd3: Pull complete
df6519f81c26: Pull complete
36bb5e56d458: Pull complete
054e8fde88d0: Pull complete
f2b494c50c7f: Pull complete
132bc0d471b8: Pull complete
135ec7033a05: Pull complete
5961f0272472: Pull complete
75b5f7a3d3a4: Pull complete
Digest: sha256:3d7ae561cf6095f6aca8eb7830e1d14734227b1fb4748092f2be2cfbccf7d614 # 签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest # 镜像真实地址

# 以下命令等价
$ docker pull mysql
$ docker pull docker.io/library/mysql:latest

# 下载指定版本
$ docker pull mysql:5.7
```

- `docker rmi 镜像ID/镜像名[:标签]`： 删除镜像

```bash
# 删除镜像指定版本
$ docker rmi mysql:5.7
# 删除全部的镜像 $() 中可以传入参数
$ docker rmi $(docker images -aq)
```

## 容器命令

创建容器必须要有镜像。下面在介绍容器之前先下载一个 centos 镜像。

```bash
docker pull centos
```

### 新建容器并启动

```bash
docker run [可选参数] image

# 参数说明
--name="Name"  容器名字
-d             后台方式运行
-p             指定容器端口
    -p 主机端口:容器端口（常用）
    -p 容器端口
-P             随机指定端口
-it            使用交互方式运行，进入容器查看内容

# 测试

$ docker run -it centos

[root@iZj6c6y40ev1bo8uaiac2wZ ~]$  docker run -it centos # 启动并进入centos
[root@d7667cfa0a30 /]$ ls # 查看容器内的centos系统
bin  etc   lib    lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@d7667cfa0a30 /]$ exit # 从容器中退回主机
exit

# 使用 exit 是退出容器
# 使用 ctrl + p + q 是返回进入容器之前的终端，容器不会停止
```

### 列出所有运行的容器

```bash
# 查看运行中的容器
docker ps
# 查看运行过的容器
docker ps -a
# 查看最近创建的容器
docker ps -n=1
# 只显示容器的编号
docker ps -q
```

### 删除容器

```bash
docker rm  容器ID  #删除指定的容器
docker rm $(docker ps -aq) # 删除所有的容器
```

### 启动和停止容器

```bash
docker start 容器ID   # 启动容器
docker restart 容器ID # 重启容器
docker stop 容器ID    # 停止当前正在运行的容器
docker kill 容器ID    # 强制停止当前容器
```

## 其它命令

### 后台启动容器

```bash
docker run -d 镜像名

[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker run -d centos
eeaffcd923f77def94a8154a910b9a24d02e83e2984e396853e2d726ec97c09d
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

#  问题：docker ps centos并没有启动起来

#  这是一个常见的坑，并不是没有启动起来，而是停止了
#  docker使用后台运行就必须要有一个前台进程，docker发现没有挂起或者对外提供服务的应用，就会自动停止。
```

### 查看日志

```bash
docker logs 容器ID

# 示例

# 1. 先启动一个容器，使用shell脚本每隔1秒输出kuangshen
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker run -d centos /bin/sh -c "while true;do echo kuangshen;sleep 1;done"
c2738f2150c93e4d3d93a6ff41dc7d69416c8509bc33d88a4d19903a6f1c7e8d
# 2. 查看启动的容器
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
c2738f2150c9   centos    "/bin/sh -c 'while t…"   4 seconds ago   Up 4 seconds             boring_rhodes
# 3. 查看输入日志
# -t 表示显示时间戳
# -f 表示跟随日志输出
# --tail string 表示输出多少条数，all表示全部
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker logs -f -t --tail all c2738f2150c9
```

### 查看容器内部进程信息

```bash
docker top 容器ID
```

### 查看容器的元数据

元数据比如：容器的 ID，容器启动的传递参数，容器生成使用的镜像，容器运行状态等信息

```bash
docker inspect 容器ID
```

### 进入当前正在运行的容器

我们通常使用后台的方式运行容器，当需要修改一些配置时，需要进入容器。

```bash
# 方式一
docker exec -it 容器id shell
# 方式二
docker attach 容器ID

# 测试
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
c2738f2150c9   centos    "/bin/sh -c 'while t…"   24 minutes ago   Up 11 minutes             boring_rhodes
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker exec -it c2738f2150c9 /bin/bash
[root@c2738f2150c9 /]$ ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```
