# Mongoose

Mongoose 是一个以对象模型操作 mongodb 的工具包。

## Mongoose vs mongodb

待完善...

## 安装

```bash
yarn add mongoose
```

## 快速开始

```js
const mongoose = require("mongoose");

main().catch((err) => console.log("MongoDB数据库错误", err));

async function main() {
  // 连接到test数据库
  await mongoose.connect("mongodb://localhost:27017/test");

  console.log("MongoDB 数据库连接成功");

  // 初始化一个scheme(表结构)
  const DogSchema = new mongoose.Schema({
    name: String,
  });

  // 将scheme编译成model
  const Dog = mongoose.model("Dog", DogSchema);

  // 创建一条数据
  const lucky = new Dog({ name: "lucky" });

  // 将数据同步到mongodb中
  const result = await lucky.save();
  console.log("保存到mongodb的结果为：", result);

  // 查询Dog model中所有的数据
  const dogs = await Dog.find();
  console.log(dogs);
}
```

1. 导入 mongoose 工具包
2. 连接到 mongodb 服务下的 `xxx` 数据库（注：`xxx` 可以是任意数据库名，如果不存在，mongodb 会自动创建）
3. 创建一个 scheme （可以理解为表结构），定义字段信息（字段名，字段类型等）
4. 将 schema 编译成一个 model。（model 是创建数据的类）
5. 实例化 model 创建一条数据。
6. 调用数据的`save`方法，将数据存储到 mongodb 中。（save 方法返回一个 promise）
7. 查询 Dog model 中所有的数据。

##
