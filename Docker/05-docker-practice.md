# Docker 实战

# 部署一个 Nginx 服务

```bash
# 搜索nignx关键字镜像
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker search nginx
NAME                                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                                             Official build of Nginx.                        17905     [OK]
linuxserver/nginx                                 An Nginx container, brought to you by LinuxS…   181
bitnami/nginx                                     Bitnami nginx Docker Image                      149                  [OK]

# 下载nginx镜像
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker pull nginx

# 运行nginx镜像
# -d 后台运行
# -p 设置主机与容器内部端口映射
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ docker run -d -p 7701:80 nginx
7902cd75437d2b32859661063220b78286884fb90fbbcd101a1d06884809fcb7

# 主机访问nginx，测试nginx是否启动成功，成功则输出nginx欢迎页面
[root@iZj6c6y40ev1bo8uaiac2wZ ~]$ curl localhost:7701
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
