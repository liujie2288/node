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

### 系统运行级别

在Linux中存在许多的服务，有一些服务是开机自启动的，那决定哪些服务开机自启动的条件就是**系统运行级别**。

在centos6中，系统服务的启动步骤为：

![centos-start-step](http://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/centos-start-step.png)

在centos6中，系统运行有以下几个级别：

- 级别0：系统停机状态
- 级别1：单用户工作状态，用于系统维护，禁止远程登录。类似安全模式，可用于修改root密码
- 级别2：多用户状态，不支持网络（不启动网络服务）
- 级别3：多用户状态，支持网络，登录后进入控制台命令模式
- 级别4：系统未使用，保留
- 级别5：登录后进入图形GUI模式
- 级别6：系统正常关闭并重启

常用的级别是：级别3和级别5。因为其它的几个级别都不能完全正常工作。

在centos7中，简化了运行级别，只保留了原来的运行级别3和级别5，分别用以下两种形式表示：

- multi-user.target  代表多用户服务组。等价于原来的级别3
- graphical.target  代表图形化服务组。等价于原来的级别5

在centos7中，查看和修改运行级别：

```bash
# 查看运行级别
# 在centos6中查看运行级别为：cat /etc/inittab
systemctl get-default
# 修改运行级别
# 这里 TARGET 取 multi-user 或者 graphical
systemctl set-default TARGET.target 
```

### 后台服务自启动管理

```bash
# 查看服务开机自启动状态
systemctl list-unit-files #  在centos6中使用chkconfig
# 开启服务开机自启动
# systemctl enable 服务名称
systemctl enable firewalld.service  # 设置开机时自动启动防火墙，在centos6中使用 chkconfig 服务名 on
# 关闭服务开机自启动
# systemctl disable 服务名称
systemctl disable firewalld.service # 关闭开机时自动启动防火墙 在centos6中使用 chkconfig 服务名 off
```

![image-20230202232245982](http://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/image-20230202232245982.png)

> 小帖士：许多服务名后都有一个字母`d`（例如：firewall**d**），这个d是`demons`的缩写，代表是守护进程。

##  关机启动命令

```bash
# 默认一分钟后关闭
shutdown
# 3分钟后关机
shutdown 3
# 取消关机命令
shutdown -c
```

Linux中执行`shutdown`命令1分钟后才会关机，主要是因为Linux为提高磁盘的读写能力，采用“预读迟写”的方式。当用户保存文件时，Linux不一定马上就将文件保存到磁盘中，而是将数据保存到缓冲区，等待缓冲区满后再写入磁盘。所以在系统关机时需要确保数据已经保存完成。当然也可以通过`sync`命令手动执行数据同步操作。

其它关机相关命令：

```bash
# 立刻关机，等同于shutdown now
poweroff
# 立刻将数据同步到磁盘中
sync
# 重启，等同于shutdown -r now 
reboot
```

以上的几种命令都可以通过shutdown来完成，具体可以通过 shutdown --help 查看













