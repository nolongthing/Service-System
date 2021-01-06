import { userService } from '@serve/UserService';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { createErrorMessage, createSuccessData, ErrorCode, key } from 'tools';


export const userRouter = express.Router();

/* 用户注册 */
userRouter.put('/', async (req, res) => {
  const result = await userService.register(req.body);
  res.send(result);
})

/* 用户登录 */
userRouter.post('/', async (req, res) => {
  const result = await userService.getUserAccount(req.body);
  //登陆成功 
  if (typeof result === 'string') {
    res.cookie('token', result, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'lax',
      httpOnly: true
    });
    res.send(createSuccessData({ data: 'login success!' }))
  } else {
    // 登陆失败 
    res.send(result);
  }
});

/* Who am I */
userRouter.get('/', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userInfo = verify(token, key);
      res.send(createSuccessData(userInfo as object));
    } catch (error) {
      res.send(createErrorMessage(error));
    }
  } else {
    res.send(createErrorMessage({
      code: ErrorCode[-1],
      message: 'login failed!'
    }))
  }
})
