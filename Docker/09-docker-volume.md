# 容器数据卷

在之前的 docker 学习中我们发现有几个问题：

1. 当部署 nginx 和 tomcat 容器时，如果需要修改配置或者部署项目，都需要进入到容器中，然后才能操作
2. 当部署一台 mysql 数据库容器时，数据保存在容器中，当删掉了容器就等于删掉了数据，非常的危险

docker 提供了数据卷的技术，可以让容器内和主机之间的数据进行同步，只需要设置好容器目录与主机目录之间的关系映射。

## 使用数据卷

数据卷的挂载有几种形式:

- 指定路径挂载
- 具名挂载
- 匿名挂载

下面是通过命令行，在容器启动时通过`-v`来指定路径挂载：

```bash
docker run -v 主机目录地址:容器内目录
```

### 使用测试

创建一个新容器，建立主机/home/ceshi 与 容器 /home 建立映射：

```bash
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
$ mysql -h 47.243.206.107 -P 7710 -u root -p

# 4. 输入密码，连接成功后，创建数据库test，测试查看是否会自动同步
$ create database test;

# 5. 查看主机上是否也同步新增了数据库文件
$ cd /home/mysql/data && ls

# 6. 测试一下，删除msyql容器，主机上的mysql数据是否被删除
```

通过以上数据卷挂载操作，以后我们对于容器的操作都可以在主机上进行，而不需要进入到容器内部。

### 具名和匿名挂载

```bash
# 匿名挂载：在挂载时只指定了容器内的路径，不指定主机路径
-v 容器内路径
# 示例：
$ docker run -d -P --name nginx01 -v /etc/nginx nginx

# 具名挂载：在挂载时指定一个数据卷名（注意不是路径，就是一个指定的名称）
-v 数据卷名:容器内路径
# 示例：
$ docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
```

## 数据卷相关命令

docker 数据卷相关操作命令，可以查看所有挂载的数据卷：

```bash
# 数据卷相关操作
$ docker volume --help
#  create      创建一个具名的数据卷
#  inspect     显示一个或多个数据卷的详细信息
#  ls          列出所有的数据卷
#  prune       删除所有未使用的数据卷
#  rm          删除一个或多个数据卷
# 查看所有数据卷卷
[root@iZj6c6y40ev1bo8uaiac2wZ data]$ docker volume ls
DRIVER    VOLUME NAME
local     0df5f1838151a80be374e0e27d750039fdb8703325597bf1fa672d38a3179b1e  # 匿名数据卷，这里的名称代表的是主机上的数据卷目录名称，由docker服务自动创建
local     5b993909ad84b6641ea441ca70ea348ea1a30ef382fb305ee78b9de6bd6e7d5e
local     juming-nginx # 具名数据卷
local     portainer_data # 具名数据卷

# 查看卷的详细信息（数据卷的目录地址等）
$ docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2023-01-09T11:24:17+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data", # 数据卷在主机上的目录地址
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]
```

所有数据卷都在`/var/lib/docker/volumes`目录下，每个目录下都会存在一个`_data`目录用来存放同步的数据。

```bash
# 比对数据卷_data目录下的文件 和 设置的映射容器路径下的文件

# _data目录下的文件
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ cd /var/lib/docker/volumes/juming-nginx/_data
[root@iZj6c6y40ev1bo8uaiac2wZ _data]$ ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  uwsgi_params

# nginx容器下的文件
[root@iZj6c6y40ev1bo8uaiac2wZ _data]$ docker exec -it 6feb85d9cf6f /bin/bash
root@6feb85d9cf6f:/$ cd /etc/nginx
root@6feb85d9cf6f:/etc/nginx$ ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  uwsgi_params
```

我们通过具名挂载可以方便的找到卷，大多数情况下都应该使用具名挂载。

## 设置容器挂载权限

在设置数据卷挂载时候，可以指定`ro`，`rw`来限定容器权限。

- `ro`：read only，只读。表示这个路径只能通过宿主机来操纵，容器内部无法操作
- `rw`：read write，可读，可写。

```bash
docker run -d -P --name nginx01 -v juming-nginx:/etc/nginx:ro nginx
```

## 使用 Dockerfile 设置数据挂载卷

Dockerfile 是用来构建 docker 镜像的构建文件。

```bash
# 1. 创建一个工作目录
$ cd /home && mkdir docker-volume-by-dockerfile && cd docker-volume-by-dockerfile

# 2. 创建一个dockfile文件
$ vim dockerfile1
# 文章内的内容形式： 指令（要求大写）    参数
# 设置容器继承自一个基础镜像centos
FROM centos
# 设置容器的匿名数据卷挂载目录dir1,dir2
VOLUME ["dir1","dir2"]
# 构建成功后，通过echo输出构建成功标识
CMD echo "---end---"
# 构建成功后，设置默认控制台
CMD /bin/bash

# 3. 执行docker build构建命令，构建镜像
-f 指定构建文件dockerfile的位置
-t 指定镜像的名称以及版本号
. 指定构建的上下文
$ docker build -f dockerfile1 -t mycentos:1.0 .
# 下面是构建输出日志
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos
 ---> 5d0da3dc9764
Step 2/4 : VOLUME ["dir1","dir2"]
 ---> Using cache
 ---> bebbc7e80d1d
Step 3/4 : CMD echo "---end---"
 ---> Using cache
 ---> 9c9f0ca0ace8
Step 4/4 : CMD /bin/bash
 ---> Using cache
 ---> 7de3445767d7
Successfully built 7de3445767d7
Successfully tagged mycentos:1.0

# 4. 构建成功，查看新创建的镜像
$ docker images

# 5. 使用创建的镜像生成一个新容器
$ docker run -it --name mycentos01 mycentos:1.0
# 6. 查看里面的文件，发现了生成镜像指定的数据挂载文件夹dir1和dir2
$ ls
bin  dev  dir1  dir2  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# 7. ctrl + p +  q返回主机，查看容器内部数据卷映射关系(Mounts字段)，可以看到容器与宿主机建立了目录dir1,dir2的映射关系
$ docker inspect mycentos01
 "Mounts": [
    {
        "Type": "volume",
        "Name": "9ab8b7655b1d9cf850b3eb7d1498b6948b937d735220b0430cfa24784cbc952e",
        "Source": "/var/lib/docker/volumes/9ab8b7655b1d9cf850b3eb7d1498b6948b937d735220b0430cfa24784cbc952e/_data",
        "Destination": "dir1",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    },
    {
        "Type": "volume",
        "Name": "8dc82371fe9667aeeb5917d22b7c43aa258111560fda53704c122abdab62c3b6",
        "Source": "/var/lib/docker/volumes/8dc82371fe9667aeeb5917d22b7c43aa258111560fda53704c122abdab62c3b6/_data",
        "Destination": "dir2",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```

这种设置数据卷的方式是使用的比较多的方式，因为我们通常会构建自己的镜像！

假设构建镜像时没有挂载卷，要自己手动通过`-v`来设置数据挂载卷。

## 容器之间共享数据

上面的数据卷挂载是绑定宿主机和容器之间的关系。docker 也支持在容器与容器之间建立数据同步映射，方便实现数据备份功能。

```bash
--volume-from 容器名

# 示例

#  创建一个容器
$ docker run -it --name mycentos01 mycentos:1.0

# 创建一个需要继承容器数据卷的新容器
$ docker run -it --name mycentos02 --volumes-from mycentos01 mycentos:1.0

# 在mycentos01中dir1目录下新建一个文件
$ docker attach mycentos01
$ cd dir1 && touch index.js

# 然后去mycentos02中查看dir1目录下是否有新增的同步文件
$ docker attach mycentos02
$ ls
```

测试发现：

1. 在 mycentos01,mycentos02 中的 dir1,dir2 目录中修改的文件都会自动同步
2. 删除容器 mycentos01，mycetnos02 同步的数据依然存在（宿主机的数据卷没有被删除）

### 实战：多个 Mysql 实现数据共享

```bash
# 使用匿名卷不指定宿主机目录
$ docker run -d -p 7710:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7
# 使用--volumes-from 继承上一个容器的数据卷同步功能
$ docker run -d -p 7711:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01 mysql:5.7
```
