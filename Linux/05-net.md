# 网络配置和系统管理操作

## 配置网络IP地址

### 查看网络接口配置

```bash
ifconfig
```

### 测试主机之间的网络是连通性

```bash
ping IP地址
ping 域名
```

### 修改静态IP

通常情况下为了更好的管理多台虚拟机，防止虚拟机/服务器每次重启后ip发生变化，我们需要设置静态IP。

修改`/etc/sysconfig/network-scripts/`目录下的 `ifcfg-`开头的文件：

```
# 修改dhcp为static
BOOTPROTO=static
# 添加IP地址
IPADDR=172.17.0.2
# 添加网关
GATEWAY=172.17.0.1
# 添加域名解析器
DNS1=172.17.0.1
```

然后重启网络：

```bash
service network restart
# 查看网络是否生效
ifconfig
```

### 设置容器静态IP

在容器创建启动时，通过`--ip`指定IP地址（必须在自己创建的网络下才能指定--ip）

```bash
docker run -it --name centos02 --hostname centos02 --network 网络名 --ip 网络IP地址  centos
```

## 配置主机名

### 修改主机名

```bash
# 查看主机名
hostname
# 修改主机名,重启后生效
vim /etc/hostname

# 另一种查询和修改hostname的方式
# 查看hostnamne信息
hostnamectl
   Static hostname: liujie2288
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 20201228113502924739250506992733
           Boot ID: 5cefc2dc6b2948e08dabb46b6f8c1e28
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-1160.81.1.el7.x86_64
      Architecture: x86-64
# 修改主机名，不需要重启就可以生效
hostnamectl set-hostname liujie2288
```

### 设置容器主机名

1. 如果容器还未启动，可以在启动时设置`--hostname` 参数

   ```bash
   # 设置容器名称和容器主机名称都为centos01
   docker run -it --name centos01 --hostname centos01 centos
   ```

2. 如果容器启动了：

   ```bash
   # 第一步，查看容器的详细信息，查看HostnamePath的位置
   docker inspect 容器ID
   # 第二步，停掉容器以及docker服务
   docker stop 容器ID
   systemctl stop docker
   # 第三步，修改容器主机名称
   # 修改前，先查看那些地方使用了现在分配的容器名称，修改前最好把文件备份
   cd 容器HostnamePath的目录
   grep 容器ID *
   # 第四步，修改完成后重启docker以及容器
   systemctl start docker
   docker start 容器ID
   # 第五步，查看容器内部主机名是否修改成功
   ```

### 修改hosts映射文件

为了方便使用主机名访问机器（ip地址难记且输入麻烦），可以配置host映射。

修改本机上的`/etc/hosts`文件，添加主机与ip映射，例如：

```host
192.168.0.101   centos01
192.168.0.102   centos02
192.168.0.103   centos03
```

