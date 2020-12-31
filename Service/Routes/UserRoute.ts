import { userService } from '@serve/UserService';
import express from 'express';


export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  console.log(req.body);
  const result = await userService.register(req.body);
  res.send(result);
})
