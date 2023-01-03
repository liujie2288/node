# Docker 运行流程

以前面运行的`hello-world`程序来分析：

![](./images/docker-run-hello-world.png)

![](./images/docker-run-process.png)

1. 当`docker run  xxx`使，docker 会首先查看本地有没有镜像，如果没有就会像 docker 仓库查找，如果有就使用这个镜像运行

2. 查找 docker 仓库时，如果没有找到镜像，就返回查找失败错误，找到了就会下载这个镜像，然后再与运行这个镜像。
