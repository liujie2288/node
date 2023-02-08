# Linux命令

终端可以看作是一个命令解释器，为我们提供了交互式的文本控制界面。

<img src="http://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/image-20230203075848454.png" alt="image-20230203075848454" style="zoom:36%;" />

我们可以通过终端控制台输入命令，由**系统调用层**进行解释并最终交给**内核**处理。比如，我们常见的命令有：

- **cd**：进入到一个目录中
- **ls**：查看目录下的文件列表
- ...

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/u=4254081281,628474157&fm=253&fmt=auto&app=138&f=PNG.png" alt="img" style="zoom: 67%;" />

## Shell

终端也称为Shell。Shell有多种不同是的实现，常见的 Shell 有：

- Bourne Shell(/user/bin/sh 或/bin/sh) 
- Bourne Again Shell(/bin/bash)
- C Shell(/usr/bin/csh)
- K Shell(/usr/bin/ksh)
- Shell for Root(/sbin/sh)
- Z Shell(zsh)
- ...

> 小帖士：在Unix中，执行解析程序的是Bourne Shell（sh），它进行较为强大和灵活的shell编程，但是在处理与用户的交互稍微差一点。所以后来Linux在它的基础上发展出了Bourne **Again** Shell（bash）

> 小帖士：bash功能比较多，较为复杂，所以在有一些的linux发行版中，对它做了一些简化和改进。例如（debian，ubantu中使用的 dash）

Bash 是Linux中默认的Shell工具，也是最常使用之一。

> 小帖士：
> cat /etc/shells 查看系统所有安装的所有 shell
> echo $SHELL 查看当前默认 Shell

## 帮助命令

### 查看命令的文档信息

Linux中存在许多的命令，在需要时可以通过`man 命令`查看命令文档信息。

```bash
# 语法： man 命令名称
man ls
```

> 小帖士：上下箭头滚动浏览，空格键往下翻页 ，`b`往上翻页。

### 内置命令和外部命令

一部分命令是直接内嵌在shell中的，系统启动之后随着shell一起加载，然后常驻内存中，这部分命令称为**内置命令**。常见的内置命令有：`cd`、`pwd`等。相应的其它命令被称为**外部命令**。

内置命令使用`man`可能无法直接查看命令的文档信息，可以使用以下方式来查看：

```bash
# 语法 man -f 内置命令
man -f pwd
# 输出多个版本文档信息
pwd (1)              - print name of current/working directory
pwd (n)              - Return the absolute path of the current working directory
# 查看具体版本
man 1 pwd
man n pwd
```

### help命令

`man`命令查看的命令相关信息比较全，如果只想知道命令如何使用，命令有哪些参数，可以使用`help`命令或者`--help`选项查看。

对于内置命令：

```bash
help pwd
```

外部命令无法通过`help`命令来查看帮助信息，需要通过`--help`选项查看：

```bash
ls --help
```

> 小帖士：内置命令和外部命令可以通过`type`命令来区分。
>
> ```bash
> [root@liujie2288 ~]# type cd 
> cd is a shell builtin
> [root@liujie2288 ~]# type ping
> ping is /usr/bin/ping
> ```

## 终端中常用快捷键

| 按键     | 说明                   |
| -------- | ---------------------- |
| ctrl + c | 终止当前运行的命令进程 |
| ctrl + l | 清屏，等同于clear命令  |
| tab建    | 自动补全当前输入       |
| 上，下箭 | 查找执行过的命令       |

