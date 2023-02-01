# 系统管理

## Linux中的进程和服务

计算机中一个正在执行的程序或命令，被叫做“进程”。计算机启动后，一直存在、常驻内存的进程，被叫做“服务”。

## 服务管理

### Centos6版本管理服务的方式（了解）

使用`service`管理服务：

```bash
# 语法：service 服务名 start | stop | restart | status

# 查看网络服务状态
service network status 
```

> `service`是一个系统命令，存放在`/usr/sbin`目录下。

查看服务：

```bash
# /etc/init.d 目录下所有可执行文件就代表一个服务
cd /etc/init.d
ls -al
```

>  备注：如果系统Centos7，这里只列出了SysV 服务，这是早期类似Unix服务管理方式



### Centos7版本管理服务的方式（重点掌握）

使用`systemctl`管理服务：

```bash
# 语法：systemctl start | stop | restart | status 服务名 

# 查看网络服务状态
systemctl status network
```

查看服务：

```bash
# /usr/lib/systemd 存放在所有系统服务的目录
cd /usr/lib/systemd/system
ls -al
```

`/usr/lib/systemd/system`目录下，以`.service`结尾的文件就是一个服务，以`.target`结尾的文件就是一组服务。

## 系统运行级别



















