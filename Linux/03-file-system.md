# 文件系统

## Linux 目录结构

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3ljMTUxNTcwNzcxOA==,size_16,color_FFFFFF,t_70.png" alt="img" style="background:#fff;padding:16px" />

## 目录挂载点

在 Linux 中对于所有的文件都是分布在根目录`/`下，但是这并不代表根目录下的所有文件夹都存在于根分区中。Linux 中没有像 Windows 那样的硬盘分区概念，但是可以通过设置文件夹单独的目录挂载点来达到磁盘分区的目的。比如，boot 文件夹就对应一个单独 boot 挂载点（分区）。
