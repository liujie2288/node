// fs模块是node提供用于文件操作的内置模块
const fs = require("fs");

// ==== 写入流操作 ====

// 1. 创建一个写入流，写入到data.txt文件
const stream = fs.createWriteStream("./data.txt");

// 2. 写入数据
stream.write("写入第一行数据\n");
stream.write("写入第二行数据\n");
stream.write("写入第三行数据\n");
stream.write("写入第三行数据");
// 3. 结束写入
stream.end();
stream.on("finish", () => {
  console.log("写入数据完成");
});

// ==== 读取流操作 ====

// 1. 创建一个读取流，读取data.txt文件
const readStream = fs.createReadStream("data.txt");

let buffer = Buffer.from([]);
// 2. 监听读取流管道中流入的从data.txt流入的数据
readStream.on("data", function (chunk) {
  // 这里会多次调用，通过buffer保存结果防止乱码
  buffer = Buffer.concat([buffer, chunk]);
});
// 3. 监听读取完毕时间，打印结果
readStream.on("end", function () {
  console.log("接受完毕，接收结果为：");
  // 将buffer转化内字符串显示
  console.log(buffer.toString());
});
