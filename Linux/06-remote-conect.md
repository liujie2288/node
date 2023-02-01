# 远程登录与退出

## 登录

通常工作过程中，公司使用真实的服务器或者云服务器，都不允许除运维以外的人员直接接触，因此就需要通过远程登录的方式来操作。

远程登录服务器有以下几种方式：

1. 使用ssh协议登录服务器：

```bash
# 语法：ssh 用户名@主机ip
# 第一次登录会提示输入密码
ssh root@47.243.206.107
```

> 免密登录，以及ssh更多内容，请参考[阮一峰SSH原理与运用](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

2. 使用Xshell（windows 推荐），SSH Secure Shell等工具连接。

## 退出登录

通过ssh协议连接远程主机后，可以在终端中执行**`exit`**命令退出连接。

## 上传、下载文件

登录之后通常伴随着远程上传、下载文件。有以下几种方式：

1. 使用`scp`命令上传文件

   ```bash
   # 上传本地文件到服务器。语法：scp 本地文件路径 远程用户名@ip地址:远程路径
   # 把本机/var/www/目录下的test.php文件上传到192.168.0.101这台服务器上的/var/www/目录中
   scp /var/www/test.php  codinglog@192.168.0.101:/var/www/
   
   # 上传目录到服务器。语法： scp -r 本地文件夹路径 远程用户名@ip地址:远程路径  -r表示递归操作
   # 把当前目录下的test目录上传到服务器的/var/www/ 目录
   scp -r test     codinglog@192.168.0.101:/var/www/
   
   # 从服务器下载文件。语法：scp 远程用户名@ip地址:远程路径 本地文件路径
   # 把192.168.0.101上的/home/kimi/test.txt的文件下载到 /tmp/local_destination
   scp codinglog@192.168.0.101:/home/kimi/test.txt 
   
   # 从服务器下载整个目录。语法：scp -r 远程用户名@ip地址:远程路径 本地文件夹路径
   scp -r codinglog@192.168.0.101 /home/kimi/test  /tmp/local_dir
   ```

2. 使用FTP工具可视化完成文件的上传与下载。常见的工具有xftp（Windows），Transmit（Mac）等





















