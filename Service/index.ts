import 'reflect-metadata';
import '@model/index';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from '@route/UserRoute';

//创建app服务
const app = express();

//使用静态文件
app.use(express.static('public'));
//解析cookie
app.use(cookieParser())
//解析requestBody
app.use(bodyParser.json())

//使用用户相关路由
app.use('/user', userRouter);

//app监听端口
app.listen('8081', () => {
  console.log('服务已启动');
})

