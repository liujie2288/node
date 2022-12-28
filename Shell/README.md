# Shell 入门

## Shell 是什么

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

## Shell 分类

常见的 Shell 有：

- Bourne Shell(/user/bin/sh 或/bin/sh)
- Bourne Again Shell(/bin/bash)
- C Shell(/usr/bin/csh)
- K Shell(/usr/bin/ksh)
- Shell for Root(/sbin/sh)
- ...

本文重点介绍`/bin/bash`。我们一般不区分 Bourne Shell 和 Bourne Again Shell，所以，像 `#!/bin/sh`，它同样也可以改为 `#!/bin/bash`。

## 第一个 Shell 脚本

打开终端程序，输入以下命令：

```bash
echo "hello world"
```

或者新建一个文件`test.sh`，然后输入以下内容：

```shell
#!/usr/bin/bash
echo "hello world"
```

然后终端中执行文件：

```bash
./test.sh
```

执行时如果提示：`permission denied: ./test.sh`，可以通过`chmod +x ./test.sh`使文件具有执行权限

> 注意：
>
> - !# 是告诉系统后面的路径是解释当前脚本执行的程序
> - 执行文件必须是相对地址，表示从当前目录中查找文件，否则将从系统变量所指定的目录（默认有/bin,/sbin,/usr/bin,/usr/sbin 等）查找文件

## Shell 变量

### 定义变量

```bash
name=jay
```

定义变量注意事项：

1. 不能使用除英文字符，数字，下划线之外的字符。
2. 变量名不能有空格
3. 不能使用 bash
