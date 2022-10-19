// fs模块是node提供用于文件操作的内置模块

// 使用之前需要导入fs模块
const fs = require("fs");
const fsPromise = require("fs/promises");

// 1. access 判断是是否对文件和目录有操作权限
// 2. mkdir 创建一个目录, 如果已经存在则报错：ile already exists，可以在创建之前判断一下目录是否存在
fsPromise.access("./fs-api-test", fs.constants.F_OK).catch((res) => {
  fsPromise.mkdir("./fs-api-test").then(() => {
    console.log("fs-api-test目录创建成功");
  });
});

/* 以下是其它功能代码块，测试请逐个打开

// 3. writeFile
// 写入的文件不存在则自动创建，存在则覆盖
fsPromise
  .writeFile("./fs-api-test/data.txt", "我是通过fs.writeFile写入的内容")
  .then(() => {
    console.log("文件创建&写入内容成功");
  })
  .catch((error) => {
    console.log(error);
  });

// 4. appendFile
// 写入的文件不存在则自动创建，存在则添加
fsPromise
  .appendFile("./fs-api-test/data.txt", "\n我是追加到data中的内容")
  .then(() => {
    console.log("内容追加成功");
  })
  .catch((error) => {
    console.log(error);
  });

// 5. stat
// 获取文件的stats对象，里面包含了文件信息，比如文件大小，文件创建时间，文件修改时间，还有检测文件类型的方法isFile(),isDirectory()等
// Stats {
//   dev: 16777220,
//   mode: 33188,
//   nlink: 1,
//   uid: 501,
//   gid: 20,
//   rdev: 0,
//   blksize: 4096,
//   ino: 57118782,
//   size: 0,
//   blocks: 0,
//   atimeMs: 1666161513960.8596,
//   mtimeMs: 1666161513960.8596,
//   ctimeMs: 1666161513960.8596,
//   birthtimeMs: 1666161513960.8596,
//   atime: 2022-10-19T06:38:33.961Z,
//   mtime: 2022-10-19T06:38:33.961Z,
//   ctime: 2022-10-19T06:38:33.961Z,
//   birthtime: 2022-10-19T06:38:33.961Z
// }
fsPromise
  .stat("./fs-api-test/data.txt")
  .then((stats) => {
    console.log(stats, stats.isFile());
  })
  .catch((error) => {
    console.log(error);
  });

// 6. readdir
// 读取目录
fsPromise.readdir("./fs-api-test").then((res) => {
  console.log("读取到的文件列表：" + res);
});

// 7. read
// 读取内容
fsPromise.readFile("./fs-api-test/data.txt", "utf-8").then((res) => {
  console.log("=====读取data.txt文件开始=====");
  console.log(res);
  console.log("=====读取data.txt文件结束=====");
});

// 8. copy
// 复制文件
fsPromise
  .copyFile("./fs-api-test/data.txt", "./fs-api-test/data1.txt")
  .then(() => {
    console.log("文件复制成功");
  });

// 9. rename
// 重命名（剪切）文件
fsPromise
  .rename("./fs-api-test/data1.txt", "./fs-api-test/new-data.txt")
  .then(() => {
    console.log("重命名成功");
  });

// 10. rmdir 或者 rm
// 删除文件夹
fsPromise
  .rm("./fs-api-test", { recursive: true, force: true })
  .then(() => {
    console.log("删除成功");
  })
  .catch((error) => {
    console.log(error);
  });

*/
