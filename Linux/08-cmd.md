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

Linux中存在许多的命令，
