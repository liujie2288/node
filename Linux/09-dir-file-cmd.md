# 目录、文件操作命令

## 显示当前工作目录的绝对地址（pwd）

```bash
[root@liujie2288 ~]# pwd
/root
```

>绝对地址：相对于根目录的地址，Linux中根目录地址为 `/`
>
>当前工作目录为：当前运行命令的所在目录的绝对地址

## 列出目录的内容（ls）

```bash
# 语法：ls [选项] 目录/文件    如果目录/文件不提供默认就是当前工作目录
[root@liujie2288 ~]# ls
install.sh  test.js


# 选项：
# -a 列出所有文件，包含了隐藏文件/文件夹(以.开头)
# -l 列出文件的信息，包括属性，权限等。 

# 列出/home目录下的内容
[root@liujie2288 ~]# ls -l /home
total 32
drwx------ 3 admin admin 4096 Nov  7 11:26 admin
drwx------ 3 jay   jay   4096 Dec 23 08:25 jay
drwx------ 3 www   www   4096 Jan 15 00:28 www
```

> 小帖士：
>
> -  `ll` 命令是` ls -l` 的别名
> - `ls`命令展示出来的文件，文件夹，使用颜色来区分的。除此之外，我们可以看`ll`查看的首字符，如果是 **d** 就表示是一个文件夹。例如上面：**d**rwx------ 3 admin admin 4096 Nov  7 11:26 admin

## 进入一个目录（cd）

```bash
# 语法： cd 绝对/相对地址
[root@liujie2288 ~]# cd /home
[root@liujie2288 home]# ls
admin jay  www
[root@liujie2288 home]# cd admin
[root@liujie2288 admin]# 

# 其它语法
# cd ~  进入当前用户的home目录
# cd -  回到上一次所在目录
# cd ../ 回到上一级目录
```

## 创建文件夹（mkdir）

```bash
# 语法： mkdir [选项] 文件夹名称1  [可选：文件夹名称2] ...
[root@liujie2288 ~]# mkdir a
[root@liujie2288 ~]# ls
a  install.sh  test.js

# 可选项
# -p  创建嵌套的文件夹（如果父目录没有会自动创建）
[root@liujie2288 ~]# mkdir a/b/c  # 该命令是在目录a/b下创建c，如果没有目录a/b则会出现下面的错误，可以通过 -p 选项递归创建
mkdir: cannot create directory ‘a/b/c’: No such file or directory
[root@liujie2288 ~]# mkdir -p a/b/c   # 等同于 mkdir a a/b a/b/c 
```

##  删除文件夹（rmdir）

```bash
# 语法： rmdir [选项] 文件夹名称1  [可选：文件夹名称2] ...
[root@liujie2288 ~]# rmdir a
[root@liujie2288 ~]# 
# 可选项
# -p  嵌套删除文件夹
[root@liujie2288 ~]# rmdir -p a/b/c   # 这里的删除和mkdir -p 刚好相反
```

> 小帖士：`rmdir -p a/b/c` 时，如果a/b还有同级目录/a/c 将会删除失败，可以使用`rm -rf a`来删除目录a下所有文件和文件夹

## 创建空文件（touch）

```bash
# 语法： touch 文件名
touch index.js  # 当前工作目录下创建index.js文件
```

## 复制文件或目录（CP）

```bash
# 语法 cp [选项] source dest   复制source文件到dest
# 可选项
# -r  递归复制整个文件夹

# 复制单个文件
cp test.js /home  # 复制当前工作目录下的test.js到home目录下。注意，目的文件夹一定需要存在
cp test.js /home/test1.js   # 复制test.js文件到home目录下并重命名为test1.js，如果目录下已存在test1.js系统会询问是否覆盖
# 复制多个文件到目标文件夹
cp test.js test1.js /home # 复制多个文件到home文件夹
# 复制整个文件夹到一个新文件夹
cp -r admin admin1  # 复制当前工作目录下的admin文件夹到当前工作目录。注意，目的文件夹不存在会自动创建
# 复制文件夹下的文件到新文件夹
cp admin/* admin1  # 复制admin下所有文件到admin1文件夹中。这里使用通配符*匹配所有文件。注意，文件夹admin1必须存在

# 总结：复制文件时，必须保证目录文件夹存在。
```

> 小帖士：
>
> 在执行`cp`复制文件时，如果目标目录下已经存在改文件，系统会提示是否覆盖文件？
>
> ![image-20230204173208410](http://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/image-20230204173208410.png)
>
> 为什么会提示呢？是因为`cp`执行的时候并不是执行的原生命令，而是在原生命令上添加一些默认参数，我们可以通过`type`命令查看：
>
> ```bash
> [root@liujie2288 home]# type cp
> cp is aliased to `cp -i'
> ```
>
> 如果想要关闭这种执行，可以在命令之前添加`\`，这样就表示执行原生命令：
>
> ```bash
> # \ + 命令，执行命令的原生cp命令
> [root@liujie2288 home]# \cp ceshi/test.js ceshi1
> ```

## 删除文件或目录（rm）

```bash
# 语法： rm [选项] 目录或者文件
# 可选项
# -r  递归删除目录中所有内容
# -f  强制执行删除操作，而不提示确认

# 删除单个文件
rm test/index.js  # 删除test目录下的index.js文件
# 递归删除目录以及目录下的所有内容
rm -rf test  # 删除test目录下所有内容，包括test目录
rm -rf test/* # 删除test目录下的所有内容，不包括test目录
# rm 默认用来删除文件，如果删除文件夹也需要结合-r来删除
rm -rf 文件夹名称
```

## 移动或重命名文件与目录（mv）

```bash
#语法：
# mv 旧文件名 新文件名 （重命名）
# mv 文件当前地址 新地址 （移动文件）
mv test.js /home # 移动test.js到home目录下
mv test.js test1.js # 重命名文件
```

## 查看文件内容（cat）

```bash
# 语法：cat [选项] 文件名   （猫一眼文件）

# 可选项
# -n 显示行号
cat index.js
```

## 查看文件头部内容

```bash
# 语法： head [选项] 文件名
# 可选项
# -n   查看文本从前往后多少行，默认10行
head index.js
head -n 20 index.js  # 查看index.js前20行内容
```

## 查看文件尾部内容

```bash
# 语法： tail [选项] 文件名
# 可选项
# -n   查看文本从后往前多少行，默认10行
# -f   显示文件最新追加的内容，监视文件变化（常用于实时查看追加的日志，ctrl+c 退出当前运行进程）
tail index.js
tail -n 20 index.js  # 查看index.js后20行内容
tail -f info.log  # 进入监视状态，实时查看追加的日志。（可另开一个终端，通过echo往info.log中输入内容，查看变化）
```

## 分屏显示文件内容（less）

`cat`命令一般用来查看小的文件，对于大的文件使用`less`可以让内容分屏查看。

```bash
# 语法： less 文件名

less index.html

## 与less配合使用的快捷键（和vim基本一致）
# 按键	 功能说明
# enter  一行行往下滚动
# 空格键  向下翻页
# b      向上翻页
# /字符串A   查找字符串A  （如果有多个匹配字符串，n往下搜索，N往上搜索）
```

> 小帖士：
>
> 分屏查看命令还有一个类似命令：**more**。`less`和`more` 有着类似的功能，但是`less`在加载内容是一段段加载而不是加载整个文件，所以要比`more`有更高的性能。

## 输出内容到控制台（echo）

```bash
# 语法： echo [选项] 文本内容
# 可选项
# -e 解析字符串中的转译字符
[root@liujie2288 ~]# echo "hello world"
hello world
# 默认原样输出
[root@liujie2288 ~]# echo "hello \n world"
hello \n world
# -e 选项，解析转移字符 \n 换行
[root@liujie2288 ~]# echo -e "hello \n world"
hello 
 world
```

##  输出重定向（>） 和 输出追加（>>）

通过使用`>`和`>>`可以将输出到终端的内容输出到文件中。如果文件不存在会自动创建

```bash
# 将文件输入到hello.txt中，如果文件不存在会自动创建，如果文件有内容，会覆盖内容
echo "hello world" > hello.txt
# 将ll输出结果覆盖file.txt中的内容
ll > file.txt
# 将ls输出结果追加到file.txt文件中
ls >> file.txt
# 查看上面操作后的file.txt文本内容
cat file.txt
```

## 软链接（ln）

软连接也称为符号连接，类似与window中的快捷方式。

```bash
# 语法： ln -s 原文件或目录  软连接名

# 建立/root/test.js 与/home目录下test的软连
ln -s /root/test.js  /home/test
# 建立admin文件夹的软连接admin1
ln -s /root/admin admin1

# ll命令查看建立的软链接，可以看到指向的真实文件，信息行第一个字符`l`表示当前文件是一个软连接文件
ll /home/test
lrwxrwxrwx 1 root  root    13 Feb  5 11:34 test -> /root/test.js

# 删除软连接(软连接也是一个文件，使用删除文件相同操作)
rm -f /home/test

# -P选项 查看软连接实际物理路径
cd 软连接名 && pwd -P
# -P选项 进入软连接实际物理路径
cd -P 软连接名
```

## 查看已执行过的历史命令（history）

```bash
# 语法： history

# 显示所有的历史
history
# 显示最近10条历史
history 10
# !应用hisotry对应编号的命令
!110 # 应用history历史记录第110号的命令
# 清除历史记录
history -c 
# history是一个内建命令，使用help查看更多说明
help history
```

