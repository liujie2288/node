# 文件查找类命令

## find 查找文件或目录

`find`命令将从指定的目录**向下递归**查找各个子目录，将满足条件的结果显示在终端。

```bash
# 语法: find [搜索范围] [选项]  搜索默认为当前工作目录
# 可选项
# -name 查询模式   按照文件名或者匹配模式搜索文件或者目录
# -user 用户名	    查找属于指定用户名的所有文件  
# -size 文件大小   按照指定文件大小查找文件。+n表示大于，-n表示小于，n表示等于。单位有：字节（c），千字节（k），兆字节（M），G

# 案例1，查找/home目录，名字为test.js的文件
[root@liujie2288 ~]# find /home -name test.js
# 案例2，查找/home目录，名字为txt结尾的文件和文件夹
[root@liujie2288 ~]# find /home -name "*.txt"
# 案例3，查找/home目录，属于用户jay的文件
[root@liujie2288 ~]# find /home -user jay
# 案例4，查找/home目录，文件大于20M的文件
[root@liujie2288 ~]# find /home -size +20M
```

## which 查找Linux命令可执行文件所在位置

```bash
# 语法：which 命令

# 案例: 查找ls命令可执行文件位置
[root@liujie2288 ~]# which ls
alias ls='ls --color=auto'
        /usr/bin/ls
```

## grep 搜索文件内容

```bash
# 语法：grep [选项] 查找内容  要查找文件
# 可选项
# -n 显示匹配行
# -r 递归搜索

# 示例1，搜索当前工作目录下所有文件内容包含hello的文件列表
# -r 表示递归搜索文件夹下的文件内容
[root@liujie2288 ~]# grep -rn hello *
index1.txt:hello world
index2.txt:hello world
```

## ｜ 管道符

管道符，“|”，表示将前一个命令的处理结果输出传递给后面的命令处理。

```bash
# 案例： 查找当前目录下文件名包含txt的文件
# 将ls的输出结果作为grep命令的查找内容
ls | grep txt
```

