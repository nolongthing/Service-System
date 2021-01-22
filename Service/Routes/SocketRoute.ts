import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import express from "express";
import { cRService } from "@serve/CRService";
import { verify } from "jsonwebtoken";
import { key } from "tools";
import { JSONCookie } from 'cookie-parser';

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

  io.on('connection', (socket: Socket) => {
    // console.log(socket.request.headers.cookie);
    // socket.emit('message', 'message come from Service')
    let user;
    try {
      user = verify((JSONCookie(socket.request.headers.cookie as string) as any).token, key);
    } catch (error) {

    }

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
