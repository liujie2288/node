# 用户组管理命令

Linux为了方便对用户进行集中管理，建立了用户组的机制，每个用户都有自己所归属的用户组，通过对组的管理，可以方便实现对于组内用户的管理。例如，当给组添加了相应权限后，组内的所有用户也都具备了这一权限。

在创建用户时系统会自动创建一个同名的用户组并将创建的用户添加到该组中。

## 新增组（groupadd）

```bash
# 语法： groupadd 组名

# 添加一个大数据组
groupadd big-data
```

## 删除组（groupdel）

```bash
# 语法： groupdel 组名

groupdel big-data
```

## 修改组（groupmod）

```bash
# 语法： groupmod [选项] 组名
# 可选项
# -n  修改组名
groupdel -n big-data big_data
```

## 查看组

```bash
cat /etc/group
```





