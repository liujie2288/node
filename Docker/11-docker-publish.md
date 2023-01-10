# 发布镜像

## 发布到 docker hub

1. 地址 [https://hub.docker.com/](https://hub.docker.com/) 注册自己的账号
2. 确定这个账号可以登录
3. 在我们服务器上提交自己的镜像

```bash
[root@iZj6c6y40ev1bo8uaiac2wZ dockerfile]$ docker login --help

Usage:  docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username

# 格式
docker login -u 用户名
```

4. 登录完毕后就可以提交镜像了(docker push)

```bash

```

## 发布到阿里云容器服务
