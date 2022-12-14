# Koa 实现

Koa 最简示例

```js
const Koa = require("koa");

const app = new Koa();

app.use(function (ctx, next) {
  ctx.body = "hello Koa";
});

app.listen(3000);
```

从 Koa 的时候角度来说，因为使用了 new 关键字，所以 Koa 的默认导出是一个 class 类，实例化的对象中，有 use 和 listen 两个成员方法。

```js
class Application {
  use() {}
  listen() {}
}
```
