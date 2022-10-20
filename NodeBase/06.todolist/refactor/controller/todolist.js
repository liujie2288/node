// 这里暂时存在内存，后面学了node-mysql，再将数据存在数据库中
const list = ["Html", "Css", "Javascript", "React", "Vue"];

function getList(req, res) {
  res.end(JSON.stringify(list));
}

function add(req, res) {
  // 接受客户端提交的信息
  let buffer = Buffer.from([]);
  req.on("data", function (chunk) {
    buffer = Buffer.concat([buffer, chunk]);
  });
  req.on("end", function () {
    const data = buffer.toString();
    list.push(JSON.parse(data).data);
    res.end(JSON.stringify(list));
  });
}

function remove(req, res) {
  list.splice(req.params.id, 1);
  res.end(JSON.stringify(list));
}

module.exports = { list: getList, add, remove };
