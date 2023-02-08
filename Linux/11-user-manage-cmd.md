# 用户管理命令

Linux是一个多用户操作系统，同一时间可能存在多个用户同时操作，所以我们需要对于用户进行管理，给予用户不同账号，以及对应的操作权限。

## 创建用户（useradd）

```bash
# 语法： useradd [选项]  用户名

# 可选项
# -d 指定用户的home目录，默认为/home目录下的用户名
# -g 指定用户所属的用户组

# 创建一个lucky的用户，创建成功在home目录下自动生成一个 lucky 的文件夹
useradd lucky
# 查看/home下的用户目录
[root@liujie2288 ~]# ll /home
drwx------ 2 lucky lucky 4096 Feb  5 18:22 lucky

# 创建用户yinuo并制定一个home目录的名字
[root@liujie2288 ~]# useradd -d /home/mianmian yinuo
[root@liujie2288 ~]# ll /home
drwx------ 2 lucky lucky 4096 Feb  5 18:22 lucky
drwx------ 2 yinuo yinuo 4096 Feb  5 18:27 mianmian
```

> 小帖士：
>
> 用户创建后，当使用户登录到服务器会自动进入用户目录。普通用户的用户目录存在于`/home`目录下，`root`用户的`home`目录为`/root`。

## 设置用户密码（passwd）

```bash
# 语法：passwd 用户名

# 设置lucky用户的密码，终端会提示让输入用户密码
passwd lucky
```

## 查看用户是否存在（id）

```bash
# 语法： id 用户名

# 输入一个不存在的用户名，系统提示用户不存在
[root@liujie2288 ~]# id xiaoming
id: xiaoming: no such user
# 输入一个存在的用户，终端显示用户的id，所属的用户组，以及用户组的ID
[root@liujie2288 ~]# id lucky
uid=1004(lucky) gid=1004(lucky) groups=1004(lucky)
```

## 查看系统中有哪些用户

```bash
cat /etc/password
[lucky@liujie2288 root]$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
mysql:x:1002:1002::/home/mysql:/sbin/nologin
jay:x:1003:1003::/home/jay:/bin/bash
saslauth:x:997:76:Saslauthd user:/run/saslauthd:/sbin/nologin
mongod:x:996:995:mongod:/var/lib/mongo:/bin/false
nginx:x:995:994:nginx user:/var/cache/nginx:/sbin/nologin
lucky:x:1004:1004::/home/lucky:/bin/bash
yinuo:x:1005:1005::/home/mianmian:/bin/bash
```

> 小帖士：
>
> 系统用户除了自己创建之外，还存在着系统以及应用程序自动创建的用户，这些用户主要是用与系统与程序的正常启动运行，不要修改，否则可能出现程序启动运行失败的问题。

## 切换用户（su）

```bash
# 语法： su 用户名 （su -- switch user）

# 切换到lucky用户，如果是root切换到lucky是不用输入密码的，否则需要输入对应密码
su lucky

su root

# 普通用户是无法查看其它用户的home目录的
[lucky@liujie2288 root]$ ls /admin
ls: cannot access /admin: No such file or directory
```

> 小帖士：
>
> 如果在同一个终端中通过`su`命令切换用户，可以使用`exit`返回之前进入的用户。例如：
>
> ```bash
> # 当前是root用户，通过su命令切换lucky
> [root@liujie2288 ~]# su lucky
> # 如果想要返回root用户，可以执行exit，当前也可以通过 su root 但是这需要输入root用户的密码
> [lucky@liujie2288 root]$ exit
> exit
> [root@liujie2288 ~]# 
> # 可以理解为一个栈的结构，每一次su进入新用户，就在栈上新加一个一层，exit命令即退出当前层的栈
> ```

## 查看当前的用户（whoami）

```bash
# 语法： whoami

[root@liujie2288 ~]# whoami
root
```

> 小帖士：
>
> 命令：`who am i` 可用于查看启动当前终端的用户信息：
>
> [root@liujie2288 ~]# who am i
> root     pts/1        2023-02-05 17:53 (100.104.189.47)
>
> `who am i`和`whoami`命令的区别是：`whoami`显示当前用户的用户名，而`who am i`则始终显示启动当前终端的用户名，即使在终端中切换了用户，`who am i`还是显示启动终端的用户。

## 删除用户（userdel）

```bash
# 语法：userdel [选项] 用户名
# 可选项
# -r  删除用户的同时，删除用户home目录

# 只删除用户lucky
userdel lucky
# 删除用户yinuo以及它的home目录
userdel -d yinuo
```

## 以超级管理员身份执行命令（sudo）

```bash
# 语法： sudo 命令

# 示例：

# 先切换到用户lucky
[root@liujie2288 ~]# su lucky
# 查看/root目录，系统提示没有权限
[lucky@liujie2288 root]$ ls
ls: cannot open directory .: Permission denied
# 使用sudo命令以超级管理身份查看
[lucky@liujie2288 root]$ sudo ls
# 提示输入密码
[sudo] password for lucky: 
# 输入密码后，提示当前用户没有在sudoer表中
lucky is not in the sudoers file.  This incident will be reported.
# 退出当前用户，返回到root用户
[lucky@liujie2288 root]$ exit
# 打开/etc/sudoers文件添加lucky用户到sudoers表中
[lucky@liujie2288 root]$ vim /etc/sudoers
# 打开的文件中找到以下内容位置，并添加 `lucky   ALL=(ALL)       ALL`，完成后强制保存`wq!`
# ## Allow root to run any commands anywhere 
root    ALL=(ALL)       ALL
lucky   ALL=(ALL)       ALL
# 如果不想每次输入密码，可以进行如下配置：
lucky   ALL=(ALL)       NOPASSWD: ALL
# 切换还lucky用户，再次尝试，发现查看成功
[root@liujie2288 ~]# su lucky
[lucky@liujie2288 root]$ ls
ls: cannot open directory .: Permission denied
[lucky@liujie2288 root]$ sudo ls
[sudo] password for lucky: 
file.txt  index1.txt  install.sh  test.js
[lucky@liujie2288 root]$ 
```

## 修改用户（usermod）

```bash
# 语法： usermod [选项] 用户名
# 可选项
# -g 修改用户组
# -d 指定用户的home目录，默认为/home目录下的用户名

# 将用户lucky的所属组修改为yinuo组
usermod -g  yinuo lucky
```

