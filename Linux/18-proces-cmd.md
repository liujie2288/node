# 进程管理命令

进程是正在执行的一个程序或者命令，每个进程都是一个运行的实体，有自己的地址空间以及分配的系统资源。

## ps 查看系统进程

```bash
[root@liujie2288 ~]# ps
  PID TTY          TIME CMD
17866 pts/1    00:00:00 bash
19140 pts/1    00:00:00 ps
```

`ps` 命令默认只显示当前用户调用的进程以及和当前终端控制台相关联的进程。一些系统后台运行的服务和当前终端控制台没有关系，所以不会显示。另外，有一些服务也不是也当前用户执行的，所以也不会显示这些服务（系统中存在着一些伪用户，比如mysql程序会自动创建一个mysql用户）。

要想显示程序中所有的进程，可以结合以下选项参数：

| 选项 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| a    | 列出**带有终端**的**所有用户**进程。（不带终端的服务不会显示） |
| x    | 列出**当前用户的所有进程**。（包括没有终端的进程，比如一些系统服务） |
| u    | 面向用户友好的显示风格，可以显示额外的一些信息，比如进程占用的cpu资源百分比，进程占用的物理内存百分比等 |

通常情况下，我们使用`ps aux`来查看系统所有的进程的信息。

```bash
# 如果系统进程较多，可以结合管道符搜索想要查找的进程
# 查询和node相关的进程信息
ps aux | grep "node"
```

上面`ps`的参数是bsd规范的一种形式，还存在几个unix形式的选项参数用来查看进程信息：

| 选项 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| -e   | 列出所有进程。这里的所有进程包括所有用户的所有进程（包括带终端，不带终端，以及系统运行的一些服务等） |
| -f   | 显示进程的更多信息。里面可以查看到进程`PPID`                 |
| -u   | 列出某个用户关联的所有进程                                   |

```bash
# 查看系统所有进程
ps -ef
```

### ps aux 与 ps -ef 区别

`ps aux`和`ps-ef`都能查看当前系统所有的进程信息，但是他们表示的信息些许的区别：

#### ps aux信息列说明

- `USER`，当前进程是哪个用户创建的
- `PID`，当前进程的ID，由系统分配的
- `%CPU`，当前进程占比CPU资源百分比
- `%MEM`，当前进程占比内存资源百分比
- `VSZ`，当前进程占用的虚拟内存大小，单位KB
- `RSS`，当前进程占用的物理内存大小，单位KB
- `TTY`，当前进程是在哪个终端运行的。
- `STAT`，当前进程的运行状态。R表示运行状态，S代表睡眠状态，T代表暂停状态，Z代表僵尸状态，s表示包含子进程，l表示多线程，+表示前台展示，>表示当前进程的优先级很高，N表示一个比较低的优先级
- `START`，当前进程启动时间
- `TIME`，当前进程占用的cpu计算时间
- `COMMAND`，产生此进程的命令名

#### ps -ef信息列说明

`ps -ef`命令和`ps aux`命令输出结果类似，但是`ps -ef`输出信息多了一列PPID，表示当前进程的父进程是谁。

```bash
[root@liujie2288 ~]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 Feb02 ?        00:02:07 /usr/lib/systemd/systemd --switched-root --system --deserialize 22
root         2     0  0 Feb02 ?        00:00:00 [kthreadd]
...
```

Linux中两个最重要的两个进程：`systemd`和`kthreadd`，这两个进程是由系统启动的，他们负责启动其它的系统服务和管理系统中的线程。系统启动许多服务都是通过他们来启动的。

#### 总结

如果想要查看进程所占cpu的资源百分比或者所占内存百分比可以使用ps aux`，如果想要查看当前进程的父进程可以使用`ps -ef`。

## kill 终止进程

手动的关闭一个进程，可以用于关闭不需要的进程。

```bash
# 语法：
# kill [选项] 进程号（pid） 通过进程号杀死对应的进程
# killall 进程名称					通过进程名称杀死进程，可以同时杀死多个进程。支持通配符，在系统负载大变得慢时很有用
# 可选项
# -9 表示强制结束进程

kill 3841
```

## pstree 查看进程树

```bash
# 语法： pstree [选项]
# 可选项
# -p  显示进程的ID
# -u  显示进程的所属用户

ps -p
```

## top实时监控系统进程

```bash
# 语法： top [选项]
# 可选项
# -d 秒数   指定top命令每隔几秒刷新。默认3s
```
