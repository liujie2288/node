# 压缩、解压、打包命令

## gzip/gunzip压缩

```bash
# gzip语法： 
# gzip 文件名1 文件名2 ... （功能描述：压缩文件，将文件压缩为"文件名.gz"）

## 示例：gzip压缩多个文件
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
[root@liujie2288 ~]# gzip test.js
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js.gz


# gunzip语法：
# gunzip 文件.gz  文件2.gz ...（功能描述：解压文件）

## 示例：gunzip解压
[root@liujie2288 ~]# gunzip test.js.gz 
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
```

注意事项：

1. 只能压缩文件，不能压缩目录
2. 压缩和解压不保留原文件
3. 同时多个文件压缩会产生多个压缩包

## zip/unzip压缩

zip命令在window和linux上都通用，并且压缩后保留源文件

```bash
# zip语法：
# zip [选项] 压缩的内容（可以是多个文件或者目录）
# 可选项
# -r 压缩目录

# 示例1：压缩文件test.js和file.txt到mypackage.zip中
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
[root@liujie2288 ~]# zip mypackage.zip test.js file.txt  
  adding: test.js (deflated 7%)
  adding: file.txt (deflated 60%)
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  mypackage.zip  test.js

# 示例2：压缩整个home目录
[root@liujie2288 ~]# zip -r home.zip /home  



# unzip语法：
# unzip [选项] XXX.zip
# 可选项
# -d 指定定解压后输出的目录

# 示例1：解压zip包
[root@liujie2288 ~]# unzip -d ../ mypackage.zip 
Archive:  mypackage.zip
  inflating: ../test.js              
  inflating: ../file.txt             
[root@liujie2288 ~]# ls ../
bin   dev  file.txt  lib    lost+found  mnt  patch  root  sbin  sys      tmp  var
boot  etc  home      lib64  media       opt  proc   run   srv   test.js  usr  www
```

## tar 打包

tar本身并不是一个压缩工具，主要用于打包归档。但是它提供了压缩的功能。

tar的打包和解包都用的一个命令`tar`，可以根据不同的选项来指定当前具体是打包还是解包工作。

```bash
# 语法: tar [选项]  压缩后的文件名（一般为xxx.tar.gz）  要打包的内容（可以是多个文件或者目录）
# 可选项
# -c   执行打包工作
# -x   执行解包工作
# -z   打包同时压缩
# -f   指定打包后文件名
# -C   指定解压的输出目录
# -v   显示详细信息 

## 示例1: 打包多个文件
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
[root@liujie2288 ~]# tar -cf txt.zip  file.txt index1.txt 
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js  txt.zip

## 示例2: 打包压缩home目录到当前用户home目录中(注意打包目录必须相对于当前的工作地址，不能写绝对路径)
[root@liujie2288 ~]# cd /
[root@liujie2288 /]# tar -czf ~/home.tar.gz home/
[root@liujie2288 /]# ls ~
file.txt  home.tar.gz  index1.txt  install.sh  test.js  txt.zip

## 示例3：解包到当前工作目录中
[root@liujie2288 ~]# tar -xvf txt.zip
file.txt
index1.txt
```

`tar`可以结合其它的压缩和加密模式进行灵活调整，而且打包效率相对高一些，所以实际应用中比较常用这个命令。