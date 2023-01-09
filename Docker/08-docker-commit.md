# commit 镜像

```bash
docker commit 提交容器为一个新的副本

# 命令和git相似
docker commit -m "提交描述信息" -a "作者" 容器id  目标镜像名:[TAG]
```

## 实战测试

```bash
# 1. 启动一个默认的 tomcat
$ docker run -d -p 7703:8080 tomcat

$ docker ps
CONTAINER ID   IMAGE
65c854c50c97   tomcat

# 2. 进入容器发现这个默认的 tomcat 么有 webapps 应用，镜像的原因，官方的镜像默认的 webapps 下面是没有文件的
# -it 以交互方式进入容器，不写 -it 则只是执行后面的命令，不会进入容器
$ docker exec -it 65c854c50c97 /bin/bash
$ ls webapps
# 3. 拷贝 webapps.dist 目录下的文件到 webapps 目录下
$ cp -r webapps.dist/* webapps
# 4. 退出容器（ctrl + p +q），将我们操作过的容器通过 commit 提交为一个镜像：我们以后就使用修改的镜像即可，这就是我们自己制作的一个镜像。
$ docker commit -m "add webapps" -a "jay" 65c854c50c97 mytomcat:1.0
# 5. 查看上面制作的镜像
$ docker images
# 6.  使用制作的镜像，看启动成功后是否直接可以访问到tomcat欢迎页面
$ docker run -p 7704:8080 mytomcat:1.0
```

## 比较制作前后的镜像 Layer

通过比对 tomcat 和 mytomcat 的 layer 层发现，mytomcat 新增了一层 Layer 代表的是拷贝 webapps 的发生的变化，其它层与制作的基础镜像相同。

```bash
$ docker inspect tomcat

Layers:[
  "sha256:11936051f93baf5a4fb090a8fa0999309b8173556f7826598e235e8a82127bce",
  "sha256:31892cc314cb1993ba1b8eb5f3002c4e9f099a9237af0d03d1893c6fcc559aab",
  "sha256:8bf42db0de72f74f4ef0c1d1743f5d54efc3491ee38f4af6d914a6032148b78e",
  "sha256:26a504e63be4c63395f216d70b1b8af52263a5289908df8e96a0e7c840813adc",
  "sha256:f9e18e59a5651609a1503ac17dcfc05856b5bea21e41595828471f02ad56a225",
  "sha256:832e177bb5008934e2f5ed723247c04e1dd220d59a90ce32000b7c22bd9d9b54",
  "sha256:3bb5258f46d2a511ddca2a4ec8f9091d676a116830a7f336815f02c4b34dbb23",
  "sha256:59c516e5b6fafa2e6b63d76492702371ca008ade6e37d931089fe368385041a0",
  "sha256:bd2befca2f7ef51f03b757caab549cc040a36143f3b7e3dab94fb308322f2953",
  "sha256:3e2ed6847c7a081bd90ab8805efcb39a2933a807627eb7a4016728f881430f5f",
  "sha256:eb1c8c7ba9030b7fa1323fe84984090d14762baeded6299fd65cb711b6578f92"
]
$ docker inspect mytomcat

Layers:[
  "sha256:11936051f93baf5a4fb090a8fa0999309b8173556f7826598e235e8a82127bce",
  "sha256:31892cc314cb1993ba1b8eb5f3002c4e9f099a9237af0d03d1893c6fcc559aab",
  "sha256:8bf42db0de72f74f4ef0c1d1743f5d54efc3491ee38f4af6d914a6032148b78e",
  "sha256:26a504e63be4c63395f216d70b1b8af52263a5289908df8e96a0e7c840813adc",
  "sha256:f9e18e59a5651609a1503ac17dcfc05856b5bea21e41595828471f02ad56a225",
  "sha256:832e177bb5008934e2f5ed723247c04e1dd220d59a90ce32000b7c22bd9d9b54",
  "sha256:3bb5258f46d2a511ddca2a4ec8f9091d676a116830a7f336815f02c4b34dbb23",
  "sha256:59c516e5b6fafa2e6b63d76492702371ca008ade6e37d931089fe368385041a0",
  "sha256:bd2befca2f7ef51f03b757caab549cc040a36143f3b7e3dab94fb308322f2953",
  "sha256:3e2ed6847c7a081bd90ab8805efcb39a2933a807627eb7a4016728f881430f5f"
]
```

## 总结

如果你想保存当前容器的状态，就可以通过 commit 来提交，获得一个镜像。就好比快照一样，记录当前容器信息来生成一个镜像。
