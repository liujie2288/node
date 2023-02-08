# 时间日期类操作命令

## 显示当前时间（date）

```bash
# 语法： date

# date 显示当前时间
# date +%Y 显示当前的年份
# date +%m 显示当前的月份
# date +%d 显示当前是那一天
# date +%Y-%m-%d 显示年-月-日
# date "+%Y-%m-%d %H:%M:%S" 显示年-月-日 时:分：秒
# date +%s 显示秒数时间戳

[root@liujie2288 admin]# date
Sun Feb  5 13:19:05 CST 2023
[root@liujie2288 ~]# date +%Y-%m-%d
2023-02-05
```

## 显示非当前时间（date）

```bash
# 语法： date -d 时间字符串

date -d "1 days ago"  # 显示昨天时间
date -d "-1 days ago" # 显示明天时间
date -d "1 month ago" # 显示上一月的当前时间
```

## 设置系统时间（date）

```bash
# 语法： date -s 时间字符串

# 设置系统时间为：
date -s "2027-12-12 12:12:12"

# 还原系统时间
ntpdate 时间服务器  # 时间服务器自行百度查询（试一试：us.pool.ntp.org）
```

## 查看系统日历（cal）

```bash
# 语法： cal [可选项]

# 查看当前月份日历
cal 
# 查看某一年的日历
cal 2027
```

