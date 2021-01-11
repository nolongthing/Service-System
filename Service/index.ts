import 'reflect-metadata';
import '@model/index';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from '@route/UserRoute';
import { createServer } from 'http';
import { chatRouter, createIo } from '@route/SocketRoute';

//创建express服务
const app = express();
//使用静态文件
app.use(express.static('public'));
//解析cookie
app.use(cookieParser())
//解析requestBody
app.use(bodyParser.json())
//使用用户相关路由
app.use('/user', userRouter);

app.use('/chat', chatRouter);
//创建http服务
const httpServer = createServer(app);

//创建io服务
createIo(httpServer);
//http服务监听端口
httpServer.listen('8081', () => {
  console.log('服务已启动');
})

