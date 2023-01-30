# Linux 概述

## Linux 是什么

Linux 是一个操作系统（操作电脑硬件的软件）。常见的操作系统有 Window，Mac OS，Linux。

## Linux 的诞生

Linux 的作者是 Linus Torvalds（李纳斯-托瓦兹）。

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5.png" alt="img" style="zoom:25%;" />

在上大学期间 Linus 对 Unix 有着浓厚的兴趣，于 1991 年 9 月在 Minix（Unix 的变种，Unix 不开源）的基础上开发完成了类似 Unix 的操作系统的内核（0.01版本），并命名为 Linux。

## Unix

Unix是很早期的一个操作系统，它起源于贝尔实验室，由作者Ken Thompson编写，其目的是为了实现一个分时操作系统。

> 分时操作系统是使一台计算机采用时间片轮转的方式同时为几个、几十个甚至几百个用户服务的一种操作系统

Unix系统早期采用汇编语言开发，存在着开发低效的问题，为了快速高效开发，作者Dennis Ritcheis编写了一套高级语言---B语言，但由于它是解释性语言，执行效率没有机器码高，然后又由Dennis Ritcheis在此基础上升级改造，添加了数据类型等功能，支持静态编译为机器码执行，并命名为 C语言。

## Linux和Unix渊源

Unix运行性能高效、稳定，很多银行、机构都在使用。但是由于Unix不开源，后出现了各种各样的商业发行版本。

- **Solaris** ：由Sun公司研发，后被Oracle收购，运行在高性能的主机上，要求单机硬件高。
- **IBM-AIX**：由IBM公司研发，同Solaris一样要求运行在高性能主机上。
- **HP-UX**：由惠普公司研发，同Solaris一样要求运行在高性能主机上。
- **BSD**：由美国加州大学伯克利分校研发，后衍生了一个开源版本**FreeBSD**，由于其开源以及开源协议要求自由，得到了快速发展。后面在BSD以及FreeBSD的基础上又衍生出了**Darwin**系统，它是**Mac OS**操作系统的前生。

上面都是Unix的商业付费版本，为了教学和研究，由大学教授Andrew Tanenbaum开发了一套完全开源的类Unix操作系统**Minix**。Linus 在大学期间也是基于此操作系统，对它进行升级和优化，完成了Linux内核的0.01版本，并免费开源。

> 小知识：Git的作者也是Linus。随着Liunx项目参与的人员越来越多，为了更方便的管理代码，Linus开发了分布式代码管理工具git。

## Linux系统架构

Liunx系统由以下几部分组成：

- 计算机硬件
- 内核：用于操作计算机硬件。Linus早期开源发布的就是这部分的代码---Linux Kernel。
- 系统调用：用于应用软件与内核通讯的媒介。
- 应用程序：运行的计算机软件。

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/u=4254081281,628474157&fm=253&fmt=auto&app=138&f=PNG.png" alt="img" style="zoom: 67%;" />



## Linux系统发行版

在相同的内核基础上可以安装不同的应用程序， 比如为了可视化操作安装了可视化操作软件，或者为了高性能取消了可视化等软件的安装。这就造成多个Linux发行版本：

- Debian系列，代表产品：ubuntu
- RedHat系列，代表产品： centos
- ...

![img](https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RSWl8yMDAw,size_16,color_FFFFFF,t_70.png)

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=.jpeg" alt="img"  />



## Linux VS Windows

Windows的优点：图形化界面，用户上手容易，软件系统庞大

Windows的缺点：封闭，可定制性差，系统以及部分软件收费

Window应用场景为：个人电脑操作系统

Linux的优点：系统和软件开源免费，有较高的安全性，可定制，运行效率高

Linux的缺点：新手入门较困难，有一定的学习成本，由于免费部分软件的质量和体验欠缺

Linux应用场景为：服务器操作系统大多为Linux





























