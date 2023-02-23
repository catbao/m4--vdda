const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

const useRouter = require("./router/use");
app.use('/', useRouter);

// app.get('/server', (request, response) => {
//     // 设置响应头 设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     // 设置响应体
//     response.send("Hello Ajax");
// });

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  res.cc(err);
});

app.listen(3007, function () {
  console.log("server running at http://127.0.0.1:3007");
});
