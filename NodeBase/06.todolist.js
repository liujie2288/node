// todolist 后端服务
const http = require("http");

// 这里暂时存在内存，后面学了node-mysql，再将数据存在数据库中
const list = ["好好学习", "锻炼身体", "买车", "旅游"];

const server = http.createServer((req, res) => {
  const { url, method } = req;


  // 开启跨域，允许接口从其它页面请求过来
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 设置跨域请求允许的Header头字段
  res.setHeader('Access-Control-Allow-Headers', '*');
  // 设置跨域请求允许的Methods头字段
  res.setHeader('Access-Control-Allow-Methods', '*');
  // 设置预检请求超期时间
  res.setHeader('Access-Control-Max-age', '60');

  res.setHeader("Content-Type", "application/json;charset=utf-8");


  // 下面保存的接口不属于简单请求，会发送OPTIONS预检接口
  if (method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return
  }
  if (url === '/getlist') {
    res.end(JSON.stringify(list))
  } else if (url === '/save') {
    // 接受客户端提交的信息
    let buffer = Buffer.from([]);
    req.on("data", function (chunk) {
      buffer = Buffer.concat([buffer, chunk])
    });
    req.on("end", function () {
      const data = buffer.toString();
      list.push(JSON.parse(data).item)
      res.end(JSON.stringify(list))
    })
  } else if (url === '/remove') {
    const reqUrl = new URL(url);
    const id = reqUrl.searchParams.get("id");
    list.splice(id, 1);
    res.end(JSON.stringify(list))
  } else {
    res.end();
  }
})

server.listen(3000, () => {
  console.log("服务启动成功，地址为：http://localhost:3000")
})