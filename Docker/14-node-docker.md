# Nodejs 应用容器化教程

> 本教程来自于[官方教程](https://docs.docker.com/language/nodejs/)，以下将以更为精简的笔记来完成对内容的记录和学习。其目的是为了：
>
> 1. 巩固对 docker 的学习；
> 2. 今后可以通过这篇文章快速回顾 docker 知识要点

文章主要内容：

- 构建镜像
- 运行容器
- 开发一个应用程序
- 运行测试
- 配置 CI/CD
- 部署应用

## 构建镜像

在构建镜像之前我们需要先编写一个 nodejs 应用。

首先创建一个项目`node-docker`，编写一个简单的服务脚本。

```js
// server.js
const express = require("express");

const app = express();

app.use(function (req, res) {
  res.send("hello world");
});

app.listen(process.env.SERVER_PORT, function () {
  console.log(`server at http://localhost:${process.env.SERVER_PORT}`);
});
```

### 创建 dockerfile

```docker
# 基于node12.18.1版本作为基础镜像，更多信息参考：https://docs.docker.com/build/building/base-images/
FROM node:12.18.1
# 设定应用程序运行的环境变量
ENV NODE_ENV production
# 设置容器内部工作目录，方便进入容器直接执行其他命令，而不需要每次都cd到该目录中
WORKDIR /app
# 将源代码拷贝到镜像中（如果文件是压缩包会自动解压）
COPY . .
# 安装生产环境依赖
RUN npm install --production
# 容器启动时，自动启动node服务
CMD node server.js
```

拷贝源代码时，不需要拷贝 node_modules 目录，创建 `.dockerignore` 文件，添加文件排除。

```docker
node_modules
```

### 构建镜像

```bash
$ docker build -t node-docker .
```

`docker build`命令用于构建镜像。`-t`参数指定镜像名称和版本号。更多参数通过`docker build --help`查看。

注意构建命令的最后有一个`.`，它表示构建上下文，它可以是本机路径或者 URL，用于在构建时查找文件。

### 查看的构建镜像

```bash
$ docker images

REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
node-docker   latest    c0ecec69ac1f   12 minutes ago   922MB
```

### 其他镜像命令

```bash
# 为镜像打一个标签（新的版本）
$ docker tag 源镜像名  目标镜像名
# 删除镜像
$ docker rmi 镜像名称
```

## 运行容器

上面构建好镜像后，我们可以运行该镜像，运行时 docker 会创建一个容器。

> 容器是一个操作系统进程，这个进程是独立的，有自己独立的文件系统，网络以及进程。

运行容器使用`docker run  镜像名:镜像版本`命令。

> 不写镜像版本默认为 latest

```bash
$ docker run node-docker
server at http://localhost:7744
```

运行后发现会自动启动 node 服务，并提示运行在 7744 端口上的，但是当你访问 localhost:7744 时发现服务被拒绝，这是因为容器是被隔离的。

要想在外部访问到容器内部的服务，需要通过`-p`参数手动映射容器内部端口到宿主机上。

```bash
$ docker run -p 3310:7744 node-docker
```

以上通过 3310 端口向外提供容器内部 7744 端口上的服务。这样我们就可以通过 http://localhost:3310 来访问了。

### 后台运行

到现在我们的终端连接到容器来运行服务，docker 提供了`-d`方式后台运行服务。

```bash
$ docker run -d -p 3310:7744 node-docker
ce02b3179f0f10085db9edfccd731101868f58631bdf918ca490ff6fd223a93b
```

运行后，程序启动后台运行成功，并返回容器 ID。

### 命名容器

运行容器时，docker 会自动生成一个名称，我们可以通过`--name`指定一个名称。

```bash
$ docker run -d -p 3310:7744 --name node-docker node-docker
```

### 其它容器命令

```bash
# 列出运行中的容器信息（容器ID，使用的镜像，创建容器的时间，状态，端口映射等）
$ docker ps
# 列出所有的容器（包括已停止）
$ docker ps --all
# 停止容器
$ docker stop 容器id/容器名称
# 重启容器
$ docker restart 容器id/容器名称
# 删除容器
$ docker rm 容器名称或者容器ID
# 删除容器复合语法：删除所有容器
# -f 表示强制删除，包括运行中的容器
# $()内部允许其他查询
# -aq 表示查询所有容器，并返回所有容器的id，详细信息查看 docker ps --help
$ docker rm -f $(docker ps -aq)
```

## 开发一个应用程序

以下使用 express + mongodb 完成一个简单增删改查应用。

### 创建 Mongodb 服务容器

首先创建 Mongodb 数据卷和 Mongodb 配置卷

```bash
$ docker volume create mongodb
$ docker volume create mongodb_config
```

启动 Mongodb 容器，配置数据卷映射，并对外暴露 7733 端口。

```bash
$ docker run -d -v mongodb:/data/db -v mongodb_config:/data/configdb -p 7733:27017 --name mongodb mongo
```

### 修改应用程序

添加 db 模块：

```js
const { MongoClient } = require("mongodb");

let client,
  db,
  obj = {};

async function main() {
  client = new MongoClient("mongodb://localhost:7733");
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db("node-docker");
}

main();

Object.defineProperties(obj, {
  client: {
    get() {
      return client;
    },
  },
  db: {
    get() {
      return db;
    },
  },
});

module.exports = obj;
```

修改 server.js 入口文件

```js
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post("/add", async function (req, res) {
  const collection = db.db.collection("notes");
  const data = await collection.insertOne(req.body);
  res.send(data);
});

app.get("/list", async function (req, res) {
  const collection = db.db.collection("notes");
  const doc = await collection.find().toArray();
  res.send(doc);
});

app.listen(7744, function () {
  console.log("server at http://localhost:7744");
});
```

### 重新构建并重启 node-docker 镜像

```bash
# 重新构建node-docker镜像
$ docker build --tag node-docker .
# 重新运行node-docker镜像
$ docker run -d -p 3310:7744 --name rest-node-docker node-docker
```

测试访问：

1. 插入数据

```bash
$ curl --request POST \
  --url http://localhost:7744/add \
  --header 'content-type: application/json' \
  --data '{"title": "this is a note", "content": "this is a note that I wanted to take while I was working on writing a blog post."}'
```

2. 查询插入的数据

```bash
$ curl http://localhost:7744/list
```

### 使用 compose 同时启动多个容器

上面的应用我们需要先启动 mongodb 服务然后再启动 node 服务，为了本地开发方便，下面将使用 compose 来同时启动多个容器服务。

新建`docker-compose.dev.yml`文件，添加以下内容：

```yml

```
