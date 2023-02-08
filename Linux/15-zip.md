# 压缩、解压、打包命令

## gzip/gunzip压缩

```bash
# 语法： 
# gzip 文件名1 文件名2 ... （功能描述：压缩文件，将文件压缩为"文件名.gz"）
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
[root@liujie2288 ~]# gzip test.js
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js.gz
# gunzip 文件.gz  文件2.gz ...（功能描述：解压文件）
[root@liujie2288 ~]# gunzip test.js.gz 
[root@liujie2288 ~]# ls
file.txt  index1.txt  install.sh  test.js
```

注意事项：

1. 只能压缩文件，不能压缩目录
2. 压缩和解压不保留原文件
3. 同时多个文件压缩会产生多个压缩包

## zip/unzip压缩

```bash
# 语法：
# zip [选项] 文件
```

## tar 打包



