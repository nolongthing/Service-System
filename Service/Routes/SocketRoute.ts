import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import express from "express";
import { cRService } from "@serve/CRService";
import { verify } from "jsonwebtoken";
import { key, parseCookie } from "tools";

const userR = {
  '0': 'user',
  '1': 'customer'
}

/**
 * 创建io服务
 * @param httpServer 
 */
export function createIo(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cookie: true,
    /* 服务端设置Socket跨域规则 */
    // cors: {
    //   origin: 'http://localhost:8000',
    //   methods: ["GET", "POST"]
    // }
  });

  io.on('connection', async (socket: Socket) => {
    // console.log(socket.request.headers.cookie);
    // socket.emit('message', 'message come from Service')
    const user = verify(parseCookie<{ token: string }>(socket.request.headers.cookie).token, key);
    const userType = (user as any).phone ? '0' : '1';
    //加入room
    socket.join(userType + (user as any).id);
    //查询消息列表
    const mList = await cRService.getUnreadCount({
      [userR[userType]]: (user as any).id
    } as any);
    //消息列表传递给客户端
    socket.emit('mList', mList);
    socket.on('message', (data) => {
      console.log(data)
    })
  })
}


export const chatRouter = express.Router();


chatRouter.get('/', async (req, res) => {
  const query = req.query;
  const result = await cRService.getUnreadCount(query as any);
  res.send(result);
})

chatRouter.post('/updateIsRead', async (req, res) => {
  const query = req.query;
  const result = await cRService.setMessageIsRead(query as any);
  res.send(result);
})
