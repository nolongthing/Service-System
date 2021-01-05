import { userService } from '@serve/UserService';
import express from 'express';


export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const result = await userService.register(req.body);
  res.send(result);
})
