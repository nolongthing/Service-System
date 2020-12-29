import 'reflect-metadata';
import '@model/index';
import express from 'express';

//创建app服务
const app = express();

//使用静态文件
app.use(express.static('public'));

// app.use(cookieParser())
// app.use(bodyParser.json())

//app监听端口
app.listen('8081', () => {
  console.log('服务已启动');
})