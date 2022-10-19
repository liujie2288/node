// URL模块用于解析url字符串
// node中存在两种url规范，一个是nodejs内置的url规范，一个是WHATWG URL的规范，官方使用WHATWG URL规范
// WHATWG URL可以在node以及浏览器环境中直接访问URL类，通过它传入url地址来实例化一个url对象

const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);

console.log(myURL);
/** 打印结果如下
 * URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
 */
