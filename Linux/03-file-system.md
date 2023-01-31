# 文件系统

## Linux 目录结构

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3ljMTUxNTcwNzcxOA==,size_16,color_FFFFFF,t_70.png" alt="img" style="background:#fff;padding:16px" />

目录结构说明：

- bin（**bin**aries）：存放二进制可执行文件
- sbin（**s**uper user **bin**aries）：存放root用户（超级管理员）使用的二进制可执行文件
- lib（**lib**rary）：存放系统与程序运行所需要的共享库，类似windows下的system目录
- usr（**u**nix **s**hared **r**esources）：存放用户的应用程序和文件，类似于windows下的program files目录
- boot：存放用于系统启动的内核文件和引导装载程序文件
- etc（**etc**etera）：存放系统管理所需要的配置文件。比如hosts，mongod.conf等
- dev（**dev**ice）：存放设备文件，比如cpu文件，disk文件等。**在Linux中一切皆文件**
- home：用户的主目录，里面的各个子目录名即为用户
- root：root用户的主目录
- opt（**opt**ional）：用户存放第三方软件
- media：Linux识别可移动媒体设备（U盘，光驱），并将此目录作为这些媒体设备的默认挂载点
- mnt（mount）：某些设备的挂载点，用户可以在此挂载设备
- proc（**proc**ess）：进程目录，存放系统硬件以及进程的一些信息
- run ：存放当前系统运行以来所有的实时信息，临时的文件系统，系统重启就没了
- srv（services）：存放系统服务相关信息
- sys：存放系统硬件信息的相关文件
- tmp（temporary）：存放临时文件
- var（**var**iables）：可变目录，存放经常变化的内容，如系统日志

## 目录挂载点

Linux 中所有的文件都分布在根目录`/`下，但是这并不代表根目录下的所有文件夹都存在于根分区中。目录结构表示的是目录之间的逻辑关系，目录/文件之间实际存储的相对位置与目录结构关系并不相同。

Linux中可以通过设置目录挂载的方式来实现分区的目的。例如，boot 文件夹就对应一个单独 boot 挂载点（分区）。
