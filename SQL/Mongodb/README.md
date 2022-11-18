# Mongodb 教程

## NoSQL

待完善

### NoSQL 与 Mysql 如何选择

待完善

## Mongodb 产品介绍

- Atlas： 云服务
- Enterprise： 企业版
- Community： 社区版

## Mongodb 版本及安装

> 官方地址：https://www.mongodb.com/docs/manual/installation/
> 菜鸟教程：https://www.runoob.com/mongodb/mongodb-osx-install.html

### 使用 brew 安装

```bash
brew tap mongodb/brew
brew install mongodb-community
```

启动服务：

```bash
brew services start mongodb-community
```

停止服务：

```bash
brew services stop mongodb-community
```

验证是否启动成功：

```bash
bashbrew services list
# 或者 ps aux | grep -v grep | grep mongod
```

使用终端连接 Mongodb：

```bash
mongosh
```
