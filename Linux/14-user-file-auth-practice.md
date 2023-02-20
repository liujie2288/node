# 用户与文件权限操作实践

## 需求

模拟公司场景下的大数据、测试组，测试他们对文件的操作权限

## 具体操作

1. 首先创建2个用户组

   ```bash
   [root@liujie2288 ~]# groupadd bigdata
   [root@liujie2288 ~]# groupadd test
   [root@liujie2288 ~]# cat /etc/group
   bigdata:x:1007:
   test:x:1008:
   ```

2. 分别创建几个用户

   ```bash
   [root@liujie2288 ~]# useradd -g bigdata bd_user1
   [root@liujie2288 ~]# useradd -g bigdata bd_user2
   [root@liujie2288 ~]# useradd -g test test_user1
   [root@liujie2288 ~]# useradd -g test test_user2
   # 查看创建的bd_user1的用户ID以及用户组
   [root@liujie2288 ~]# id bd_user1
   uid=1006(bd_user1) gid=1007(bigdata) groups=1007(bigdata)
   # 查看刚才创建见的所有用户
   [root@liujie2288 ~]# cat /etc/passwd
   bd_user1:x:1006:1007::/home/bd_user1:/bin/bash
   bd_user2:x:1007:1007::/home/bd_user2:/bin/bash
   test_user1:x:1008:1008::/home/test_user1:/bin/bash
   test_user2:x:1009:1008::/home/test_user2:/bin/bash
   # 查看创建所有用户的home目录
   [root@liujie2288 ~]# ls /home
   bd_user2    test_user1 bd_user1     test_user2
   ```

3. 使用用户`bd_user1`，在它的主目录新增一个文件

   ```bash
   # 进入目录
   [root@liujie2288 ~]# su bd_user1
   [bd_user1@liujie2288 root]$ cd ~
   [bd_user1@liujie2288 ~]$ ls
   [bd_user1@liujie2288 ~]$ pwd
   /home/bd_user1
   # 创建一个代码文件
   echo  "console.log('hello world')" > test.js
   # 查看创建文件的权限
   [bd_user1@liujie2288 ~]$ ll
   -rw-r--r-- 1 bd_user1 bigdata 27 Feb 12 15:02 test.js
   ```

4. 切换用户`bd_user2`，进入`bd_user1`的主目录，发现没有进入权限

   ```bash
   # 退出bd_user1用户
   [root@liujie2288 ~]# exit
   # 切换到用户bd_user2
   [root@liujie2288 ~]# su bd_user2
   [bd_user2@liujie2288 root]$ cd ~
   [bd_user2@liujie2288 ~]$ cd /home/bd_user1
   bash: cd: ../bd_user1: Permission denied
   ```

5. 切换回root用户，为bd_user1的主目录添加所属用户组权限。

   ```bash
   # 退出bd_user1用户，返回root用户
   [root@liujie2288 ~]# exit
   # 进入/home目录
   [root@liujie2288 ~]# cd /home
   # 添bd_user1文件夹的所属用户组权限
   # 因为需要进入bd_user1文件夹，所以需要添加x权限
   # 进入目录后还需要读取bd_user1文件夹里的文件，所以需要添加r权限
   # 添加前 drwx------ 2 bd_user1   bigdata 4096 Feb 12 15:20 bd_user1
   [root@liujie2288 home]# chmod g+rx bd_user1
   # 添加后 drwx--x--- 2 bd_user1   bigdata 4096 Feb 12 15:20 bd_user1
   ```

6. 切换到bd_user2用户，现在可以进入到bd_user1的主文件夹，并且可以查看里面文件，但是我们发现只能查看里面的文件，并不能修改。

   ```bash
   [root@liujie2288 home]# su bd_user2
   [bd_user2@liujie2288 home]$ cd /home/bd_user1
   [bd_user2@liujie2288 bd_user1]$ ll
   total 4
   -rw-r--r-- 1 bd_user1 bigdata 27 Feb 12 15:02 test.js
   # 尝试修改test。js文件里面的内容，系统提示文件只读
   [bd_user2@liujie2288 bd_user1]$ vim test.js 
   ```

7. 切换到bd_user1用户，给文件添加所属用户组修改权限。

   ```bash
   [bd_user2@liujie2288 bd_user1]$ exit
   exit
   [root@liujie2288 home]# su bd_user1
   [bd_user1@liujie2288 home]$ cd /home/bd_user1/
   [bd_user1@liujie2288 ~]$ chmod g+w test.js 
   [bd_user1@liujie2288 ~]$ ll
   -rw-rw-r-- 1 bd_user1 bigdata 27 Feb 12 15:02 test.js
   ```

8. 现在使用bd_user2用户，发现可以修改文件了。（同一组内的用户可以互相访问文件，修改提交代码了）

   ```bash
   [bd_user1@liujie2288 ~]$ exit
   exit
   [root@liujie2288 home]# su bd_user2
   [bd_user2@liujie2288 home]$ cd /home/bd_user1
   # 进入test.js文件，随便添加一点内容保存
   [bd_user2@liujie2288 bd_user1]$ vim test.js 
   # 查看刚才添加的内容，发现修改成功
   [bd_user2@liujie2288 bd_user1]$ cat test.ks
   ```

9. 切换到测试组的test_user1，发现不能进入bd_user1用户的主目录，这里为其它用户添加bd_user1目录的访问权限。

   ```bash
   # 通过test_user1的身份进入bd_user1发现没有权限
   [root@liujie2288 ~]# su test_user1
   [test_user1@liujie2288 root]$ cd /home/bd_user1
   bash: cd: /home/bd_user1: Permission denied
   # 为其它用户添加进入和查看bd_user1的权限
   # 首先回到root用户，否则可能修改不了权限
   [test_user1@liujie2288 root]$ exit
   exit
   [root@liujie2288 ~]# chmod 755 /home/bd_user1
   [root@liujie2288 ~]# su test_user1
   [test_user1@liujie2288 root]$ cd /home/bd_user1
   [test_user1@liujie2288 bd_user1]$ ll
   -rw-rw-r-- 1 bd_user1 bigdata 54 Feb 12 15:56 test.js
   ```

10. 修改测试组用户test_user2的所属组到bigdata中，可以看到test_user2立刻具备了查看和进入bd_user1目录的权限。

    ```bash
    # 修改test_user2的分组到bigdata下
    [root@liujie2288 ~]# usermod -g bigdata test_user2
    [root@liujie2288 ~]# id test_user2
    uid=1009(test_user2) gid=1007(bigdata) groups=1007(bigdata)
    # 可以进入bg_user1目录，并可以修改里面的文件
    [root@liujie2288 ~]# su test_user2
    [test_user2@liujie2288 root]$ cd /home/bg_user1
    [test_user2@liujie2288 bd_user1]$ vim test.js 
    ```

## 总结

以上演示了公司内不同用户组操作文件的示例，实践了linux文件权限和用户管理相关操作，明白了linux如何管理多用户与文件权限。