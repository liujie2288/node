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

用户相关页面路由：

```js
//router/user.js

// 登录页面
router.get("/login", function (req, res) {
  // 因为注册和登录共用一个模版，所以需要传入一个变量在渲染时区分
  res.render("login", { isLogin: true });
});

// 注册页面
router.get("/register", function (req, res) {
  res.render("register");
});
```

文章相关页面路由：

```js
//router/article.js

// 首页
router.get("/", function (req, res) {
  res.render("index");
});
```

添加路由入口页面，统一管理所有的路由：

```js
//router/index.js
const express = require("express");
const router = express.Router();

// 用户页面相关
router.use(require("./user"));

// 文章页面相关
router.use(require("./article"));

module.exports = router;
```

注意，别忘记将路由挂载到 app 实例中

```js
const router = require("./router");
// 挂载路由
app.use(router);
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
            <a class="nav-link active" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">Sign up</a>
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
        <h1 class="text-xs-center">
          <%= locals.isLogin ? "Sign in" : "Sign up" %>
        </h1>
        <p class="text-xs-center">
          <% if(locals.isLogin) { %>
          <a href="/register">Need an account?</a>
          <% } else { %>
          <a href="/login">Have an account?</a>
          <% } %>
        </p>

        <% if (typeof(errors) !== "undefined" && errors) { %>
        <ul class="error-messages">
          <% errors.forEach(error=>{ %>
          <li><%= error.msg %></li>
          <% }) %>
        </ul>
        <% } %>

        <form action="/register" method="post">
          <% if(!locals.isLogin) { %>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              name="user[username]"
              placeholder="Your Name"
            />
          </fieldset>
          <% } %>
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
            <%= locals.isLogin ? "Sign in" : "Sign up" %>
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

其它页面模版前参考 realworld [模版片段](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing)。

## 提取路由控制器模块

为了保证代码的易读和可维护性，可以将路由对应的实业务逻辑分离到单独的模块中。例如：

用户路由控制器模块：

```js
// controller/user.js
export.showLogin = async function(req,res){
  try {
    res.render("login", { isLogin: true });
  } catch (err) {
    next(err);
  }
}

exports.showRegister = async function (req, res, next) {
  try {
    res.render("login");
  } catch (err) {
    next(err);
  }
};

// ... 其它功能快
```

用户路由模块：

```js
// router/user.js
const userCtrl = require("../controller/user");
router.get("/login", userCtrl.showLogin);

// ...其它路由
```

## 解决资源加载缓慢问题

模版中提供的外部 css 资源加载缓慢，可以将其下载到本地托管。

1.  新建`/public/css/main.css`文件存放`//demo.productionready.io/main.css`文件
2.  安装 ionicons(`npm install ionicons@2.0.1`)包来替换`//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css`文件
3.  配置静态资源加载中间件。

    ```js
    app.use("/public", express.static(path.join(__dirname, "./public")));
    app.use(
      "/node_modules",
      express.static(path.join(__dirname, "./node_modules"))
    );
    ```

4.  修改资源引用链接`//demo.productionready.io/main.css`为`/public/css/main.css`
5.  修改资源饮用链接`//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css`为`/node_modules/ionicons/css/ionicons.min.css`

至此，应该得到了一个可以通过 nodejs 驱动的纯静态应用，存在的一下几个路由页面：

1. [首页](http://localhost:3010/)
2. [登录页](http://localhost:3010/login)
3. [注册页](http://localhost:3010/register)
4. [设置页](http://localhost:3010/settings)
5. [添加文章页](http://localhost:3010/editor)
6. [个人简介页](http://localhost:3010/profile/123)

## 实现用户注册功能

实现注册有两种方式：

1. 传统应用中 form 表单提交方式
2. 使用 ajax 异步提交表单

### 使用传统 form 表单提交数据

1. 编写模版(模版已在上面的内容中给出)

> 💡 提示：
>
> - ejs 模版中的变量必须要在 res.render()中给出，否则会报变量未定义的错误。解决方式有 2 种：a. 使用`typeof(变量名) !== "undefined"`判断后再使用该变量。例如：`if(typeof(errors) !=="undefined" && errors){  //逻辑... }`。b. 使用 express 使用在模版中提供的`locals`对象来访问变量。例如：`if(locals.error){ // 逻辑... }`
>
> - `express.urlencoded()`能够解析 form 表单 name 属性的嵌套语法。例如，表单中的 name 可以这样写 `name="user[username]"`

2. 编写注册控制器逻辑

```js
// exports.re;
```
