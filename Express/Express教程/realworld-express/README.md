# Express 开发 realword 网站

> realword 是一个示例应用，它演示了如何使用不同的前/后端技术（react，angulare，Node，Django 等）完成示例应用的开发。[有超过 100 中不同语言，框架，库的实现](https://codebase.show/projects/realworld)

## 创建项目

1. 创建项目文件夹

```bash
mkdir realword-backend && cd  realword-backend
npm init -y
npm install express
```

2. 创建项目目录结构

```shell
├── config	# 项目配置文件
│   └── config.default.js # 项目默认配置
├── controller	# 用于解析用户的输入，处理后返回相应的结果
├── model	# 数据持久层（比如对用户，文章的数据库操作）
├── middleware	# 用于编写中间件（管理项目通用中间件）
├── router	# 用于配置 URL 路由规则
├── util	# 工具模块（封装常用的辅助工具函数）
├── validator	# 验证模块（封装每个路由处理程序的验证函数）
└── app.js	# 用于自定义启动时的初始化工作
```

3. 编写项目启动入口文件 app.js

```js
const express = require("express");

// 从环境变量中读取PORT设置
const PORT = process.env.PORT || 3010;

const app = express();

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
```

> linux 设置环境变量并启动该 node 服务： PORT=4010 node app.js
> window 设置环境变量并启动该 node 服务： SET PORT=4010 node app.js

## 配置常用中间件

1. 配置解析请求体中间件

支持客户端 JSON 数据格式请求体：

```js
app.use(express.json());
```

配置成功后，可以通过`req.body`获取客户端递交的 json 数据

支持客户端表单数据格式请求体：

```js
app.use(express.urlencoded());
```

配置成功后，可以通过`req.body`获取客户端递交的 表单 数据

2. 配置日志输出中间件，输出每个请求基本信息以及响应信息

```js
app.use(morgan("dev"));
```

配置后，控制台将输出类似：

POST / 200 18.183 ms - 17
[请求方法][请求路径][请求响应状态码][请求耗时][请求响应内容长度]

3. 配置错误处理中间件，在开发时当服务器发生错误后提供的一个友好的错误提示页。

```js
const errorhandler = require("errorhandler");
// 只在开发场景下生效
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}
```

4. 配置模版引擎(这里使用[ejs](https://www.npmjs.com/package/ejs)，也可以选择其它如[art-template](https://www.npmjs.com/package/art-template)，[pug](https://www.npmjs.com/package/pug)等)。

```js
// 设置默认模版引擎
app.set("view engine", "ejs");
// 设置模版页面默认目录
app.set("views", path.join(__dirname, "./views"));
```

完成以上步骤配置后的入口文件 app.js 代码：

```js
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3010;

const app = express();

// 记录请求信息
app.use(morgan("dev"));
// 解析请求参数
app.use(express.json());
app.use(express.urlencoded());

// 错误处理
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
```

## 添加页面路由

realword 提供了[路由指南](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing)，按照指南方式配置页面路由。例如：

```js
//router/user.js

// 登录页面
router.get("/login", function (req, res) {
  res.render("login");
});
```

```js
//router/index.js
const express = require("express");
const router = express.Router();

// 首页
router.get("/", function (req, res) {
  res.render("index");
});

// 用户页面相关
router.use(require("./user"));

module.exports = router;
```

## 编写模版页面

realword 提供了[模版片段](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing)。

### 页面头部

```html
<!-- views/layout/header.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Conduit</title>
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link
      href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css" />
  </head>
  <body>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <a class="nav-link active" href="">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  </body>
</html>
```

### 页面尾部

```html
<!-- views/layout/footer.ejs -->
<footer>
    <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
    </div>
</footer>

</body>
</html>
```

### 登录注册页

```html
<!-- views/login.ejs -->
<%- include('layout/header') %>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="">Have an account?</a>
        </p>

        <% if (locals.errors) { %>
        <ul class="error-messages">
          <% errors.forEach(error=>{ %>
          <li><%= error.msg %></li>
          <% }) %>
        </ul>
        <% } %>

        <form action="/register" method="post">
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              name="user[username]"
              placeholder="Your Name"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              name="user[email]"
              placeholder="Email"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="password"
              name="user[password]"
              placeholder="Password"
            />
          </fieldset>
          <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
<%- include('layout/footer') %>
```

### 首页

```html
<!-- views/index.ejs -->

<%- include('layout/header') %>
<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"
              ><img src="http://i.imgur.com/Qr71crq.jpg"
            /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 29
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>How to build webapps that scale</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"
              ><img src="http://i.imgur.com/N4VcUeJ.jpg"
            /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>
              The song you won't ever stop singing. No matter how hard you try.
            </h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a href="" class="tag-pill tag-default">programming</a>
            <a href="" class="tag-pill tag-default">javascript</a>
            <a href="" class="tag-pill tag-default">emberjs</a>
            <a href="" class="tag-pill tag-default">angularjs</a>
            <a href="" class="tag-pill tag-default">react</a>
            <a href="" class="tag-pill tag-default">mean</a>
            <a href="" class="tag-pill tag-default">node</a>
            <a href="" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<%- include('layout/footer') %>
```

## 挂在路由到 app 实例中

```js
const router = require("./router");
// 挂在路由
app.use(router);
```

## form 表单同步提交

```html
<% if (locals.errors) { %>
<ul class="error-messages">
  <% errors.forEach(error=>{ %>
  <li><%= error.msg %></li>
  <% }) %>
</ul>
<% } %>
```
