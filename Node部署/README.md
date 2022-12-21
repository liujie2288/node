# Node 应用部署

## 购买服务器

### 云服务器

云服务器厂商有阿里云，腾讯云，华为云，百度云，Vultr 等。我选择的是阿里云，因为用户较多，遇到问题网上有很多解决方案。

购买服务器提供的付费模式有：

- 包年包月
- 按量付费（根据自己的需要开关服务器，停机后部分资源不收费）
- 抢占式实例

一般选择包年包月，比较省心。

服务器配置，一般的个人网站选择 1 核 2G 内存就够了，如果网站用户较多可以根据实际情况增加配置。

服务器操作系统一般选择 CentOS，版本选择最高版本。

服务器分类（共享型，计算型，突发性能），存储等可以根据具体描述选择，个人开发使用，就越便宜越好。

### 轻量应用服务器

轻量应用服务器是什么？和云服务器有什么区别？如何开通轻量应用服务器，可参考阮一封[轻量应用服务器体验](http://www.ruanyifeng.com/blog/2022/06/cloud-server-getting-started-tutorial.html)

### 参考资料

- [从 0 到 1 实现记账本](https://juejin.cn/book/6966551262766563328/section/6967229569954742285)
- [node 开发和部署，从零到用域名访问系列教程](https://www.bilibili.com/video/BV1TE411E7uD?p=2&vd_source=7b645b98515ccbf1eb6818e68d373871)
- [轻量应用服务器体验](http://www.ruanyifeng.com/blog/2022/06/cloud-server-getting-started-tutorial.html)

## 购买域名

## 服务器远程连接

## 环境安装

- Nodejs
- MongoDB
- Nginx

### Node 环境安装

#### 安装 NVM

[nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 是一个 nodejs 版本管理工具，可以方便快速切换和安装不同版本的 nodejs。

bash 安装脚本：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

安装成功后的截图：

![](./nvm-install.png)

根据提示安装成功后需要重启终端或者手动执行以下脚本：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

> 也可以执行 `source /root/.bashrc` 让安装 nvm 时自动写入到 /root/.bashrc 文件中的脚本生效。

> 如果出现一下错误：
>
> ![](./nvm-install-error.png)
> 可以在[域名查询 IP](https://site.ip138.com/raw.githubusercontent.com/)的网站中查询域名对应的 ip 地址，然后添加到服务器的 hosts（/etc/hosts）文件中。

上面的操作执行完后，可以在命令行输入`nvm`查看帮助文档：

![](./nvm-cli-tip.png)

使用 nvm 安装 nodejs：

```bash
## 安装nodejs 16的最新版本
nvm install 16
## 安装nodejs 最新的LTS版本
nvm install --lts
## 切换使用版本node 16版本
nvm use 16
```

执行`node -v` 验证 node 是否安装成功。

![](./nvm-install-node.png)

> 如果安装 node 比较慢，可以切换 node 镜像。[中国镜像站](https://npmmirror.com/)。
>
> 终端执行：NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/ nvm install 16

#### nrm 安装

[nrm](https://github.com/Pana/nrm) 是一个便捷切换 npm 镜像源的工具。支持了 `npm`,`cnpm`,`taobao` 等镜像源。

```bash
# 全局安装nrm工具
npm instal -g nrm

# 查看nrm提供的镜像源
nrm ls

# 切换使用淘宝镜像源
nrm use taobao
```

#### pm2 安装

[pm2](https://github.com/Unitech/pm2)是一个带有负载均衡功能的 Node 应用的进程管理器。它能充分利用服务器多核性能，并能后台运行 nodejs 服务，当程序发生错误崩溃时，可以自动重启服务。

```bash
# 全局安装pm2工具
npm install -g pm2

# 安装完成后，检查是否安装成功
pm2 -v
```

### MongoDB 环境安装
