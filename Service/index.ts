import 'reflect-metadata';
import '@model/index';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from '@route/UserRoute';
import { User } from '@model/Entity/Users';
import md5 from 'md5-node';
import { userService } from '@serve/UserService';

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

// test code

// const user = {
//   username: '方卫',
//   password: md5('123456'),
//   phone: '18317777777',
// }

// setTimeout(async () => {
//   const userModel = new User(user.password, user.username, user.phone);
//   const errors = await validate(userModel);
//   if (errors.length > 0) {
//     console.log('数据验证错误：', errors)
//     return;
//   }
  // userModel.save().then(res => {
  //   console.log('插入成功：', res);
  // })
//   const result = await userService.register(user);
//   console.log(result)
// }, 1000);

