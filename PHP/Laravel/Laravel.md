# Laravel 教程（6.x LTS）

# 什么是 Laravel

[Laravel](https://laravel.com/) 是一个 PHP Web 开发框架。它易于理解且强大，提供了工具用以开发大型，健壮的应用。

除了 Laravel 框架之外，还有 ThinkPHP，YII 等等。

> Laravel 中文文档：http://laravel.p2hp.com/

## Laravel 安装

### 服务器要求

- PHP >= 7.2.5

### Compose 安装

> Compose 是 php 的依赖管理工具。就像一个应用管理可以安装各种软件包。类似于前端的 npm 工具

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

> [详细安装说明参考](https://docs.phpcomposer.com/00-intro.html#Globally)

### 创建 Laravel 项目

```bash
composer create-project --prefer-dist laravel/laravel blog "6.*"
```

参数说明：
`create-project`: composer 命令参数，表示创建项目
`--prefer-dist`: 优先下载压缩包
`laravel/laravel`: laravel 包的名字
`blog`: 项目名字
`6.*`: 使用的 laravel 版本

### Laravel 项目目录结构：

<img src="https://liujie2288-blog.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2023-03-10%20%E4%B8%8A%E5%8D%887.24.00.png" style="zoom:50%;" />

- app：包含应用程序的核心代码。应用几乎所有的类都存放在这，包括控制器（app/Http/controllers），模型（app/User.php）
- bootstrap：包含框架启动时需要的文件。
- config：存放应用程序的配置文件。（比如 app.php 时项目主要配置文件，Database.php 是针对 php 的配置文件）
- database： 存储和数据表相关的操作类文件（迁移文件 【创建数据表的类文件】，种子文件【填充数据的文件】）
- public：存放项目的入口文件（index.php）和静态资源
- resources：包含模版视图文件，语言包文件以及未被编译的资源文件（less、sass、js 等）
- routes：包含应用程序的路由相关的文件。（web.php 用于定义与会话状态，csrf 防护，cookie 加密相关的web界面路由，api.php 用于定义无状态，需要通过令牌认证的api路由）
- storages：存放缓存和日志的文件
- tests：应用自动化测试文件
- vendor：composer 依赖包目录
- .env 文件：用于配置项目需要环境变量
- artisan 文件：laravel 脚手架文件，用于快捷创建路由，控制器，迁移文件，启动开发服务器等操作。（命令行执行：`php artisan` 查看命令帮助手册）

> [详 细目录说明参考](http://laravel.p2hp.com/cndocs/6.x/structure)

## Laravel 启动方式

1. 使用 Artisan 命令启动（不推荐）

   ```bash
   php artisan serve
   Laravel development server started: http://127.0.0.1:8000
   ```

   不推荐，因为它不能同时启动数据库，并且修改环境变量后需要重新启动才能生效 。

2. 配置 wamp 环境，使用 phpstudy，mamp 等集成工具。

   (1) Apache 虚拟主机配置（修改 apache 的 httpd.conf 或者 vhost.conf 文件）：

   ```apache
   <VirtualHost *:80>
       # 配置站点管理员的邮箱，当站点产生500错误时会显示在页面上
       ServerAdmin liujie_2288@qq.com
       # 站点的根目录
       DocumentRoot "/Users/Jay/Sites/php-blog/public"
       # 站点需要绑定的域名
       ServerName blog.liujie2288.com
       # 配置站点目录权限配置
       <Directory "/Users/Jay/Sites/php-blog/public">
         # 允许全部访问
         allow from all
         # 允许分布式配置文件
         AlowOverride all
         # 当没有默认文件时，显示目录结构，本地开发可开，线上环境需要关闭
         Options +indexes
       </Directory>
   </VirtualHost>
   ```

    (2) 配置 hosts 文件（mac 在`/etc/hosts`下）

   ```hosts
     127.0.0.1  blog.liujie2288.com
   ```

​		(3) 重启apache

## 路由的使用

路由的定义是在项目`routes`目录下定义的。根据具体的功能确定路由是定义`web.php`或者`api.php`目录下

### 路由的定义

```php
// routes/web.php
// 语法：Route::请求方式(请求的url，请求的处理函数或者控制器响应方法)
// Route 是laveral提供的路由类
// get 表示请求的方式，同时还提供了post,put,delete等

// 方式1：通过匿名函数定义路由响应方法
Route::get("/hello",function(){
  return "hello laravel"
})
// 方式2: 通过控制器函数定义路由响应方法
Route::get("/user","UserController@user")
```

### 多个HTTP请求的路由

```php
// match匹配指定的请求方式
Route::match(['get', 'post'], '/', function () {
    //
});

// any匹配任何请求方式
Route::any('/', function () {
    //
});
```

### 路由参数

```php
// 比填参数
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
// 可选参数
Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
// 查询参数
Route::get('user', function () {
    return $_GET['id'];
});
// 参数正则约束,下面的定义要求路由参数name必须为多个字母组成的字符
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');
```

### 路由命名

路由命名后可以在程序中通过这个名字获取路由信息，生成URL以及路由重定向。

```php
// 使用name方法来定义路由名称
Route::get('user/profile', function () {
    //
})->name('profile');

// 通过全局辅助函数route来生成链接
$url = route('profile');
// 重定向
return redirect()->route('profile');
```

### 路由分组

为一批路由添加统一的前缀或者中间件：

```php
Route::group(['prefix' => 'auth','middleware' =>  ['auth',]], function() {
    // auth/show
    Route::post('show', 'Auth\AuthController@show');
  	// auth/edit
    Route::post('edit', 'Auth\AuthController@edit');
});
```

## 中间件

中间件用于过滤进入应用程序的HTTP请求。比如验证用户身份中间件，把未通过认证的请求重定向到登录页面，认证成功的请求交给应用程序的下一个中间件来处理。

### 定义一个中间件

使用 `make:middleware` 命令来创建新的中间件。

```bash
php artisan make:middleware CheckAge
```

该命令会在 `app/Http/Middleware` 目录下生成新的 `CheckAge` 类，在这个中间件中，仅允许 `age` 参数大于 200 的请求对路由进行访问，否则将重定向到 `home` 页面。

```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckAge
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->age <= 200) {
            return redirect('home');
        }

        return $next($request);
    }
}
```

如上，如果给定的 `age` 参数小于或者等于 200，这个中间件将会返回一个 HTTP 重定向；否则这个请求将会通过，进一步传递到应用层中。要让请求继续传递到应用层中（即允许「通过」中间件验证），只需将 `$request` 作为参数来调用函数 `$next` 。

可以将中间件想象成一系列层次， `HTTP` 请求必须通过它们才能进入你的应用层。每一层都会检查请求（是否符合中间件要求），而后决定通过或拒绝访问应用。

### 注册中间件

#### 全局注册

需要在 `app/Http/Kernel.php` 中的 `$middleware` 属性中列出这个中间件。

#### 为路由分配中间件

在 `app/Http/Kernel.php` 文件内为该中间件分配一个键。默认情况下，该类中的 `$routeMiddleware` 属性下包含了 Laravel 内置的中间件。若要加入自定义的中间件，只需把它附加到列表后并为其分配一个自定义键。例如：

```php
// 在 App\Http\Kernel 类中...
protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
];
```

通过 `middleware` 方法将为路由分配中间件：

```php
Route::get('admin/profile', function () {
    //
})->middleware('auth');
```

### 中间件参数

定义路由时通过一个 `:` 来隔开中间件名称和参数来指定中间件参数。多个参数就使用逗号分隔：

```bash
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```

路由参数在 `$next` 参数之后传递给中间件：

```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * 处理传入的参数
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // Redirect...
        }

        return $next($request);
    }

}
```

## 控制器

控制器类可以代替路由文件中使用匿名函数来组织请求处理逻辑的方式。控制器能将相关的请求处理逻辑组成一个单独的类。控制器被存放在 `app/Http/Controllers` 目录。
