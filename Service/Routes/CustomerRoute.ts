import { customerService } from '@serve/CustomerService';
import express from 'express';
import { createSuccessData } from 'tools';


export const customerRoute = express.Router();

/* 用户注册 */
customerRoute.put('/', async (req, res) => {
  const result = await customerService.register(req.body);
  res.send(result);
})

/* 用户登录 */
customerRoute.post('/', async (req, res) => {
  const result = await customerService.getCustomerAccount(req.body);
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

/* 客服列表查询 */
customerRoute.get('/', async (req, res) => {
  const result = await customerService.getCustomerList();
  res.send(result);
})
