import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import express from "express";
import { cRService } from "@serve/CRService";
import { verify } from "jsonwebtoken";
import { key, parseCookie } from "tools";

interface IClientMessage {
  content: string,
  c_from: 0 | 1,
  date: string,
  isRead: 0 | 1,
  user: {
    id: number,
    user_name: string
  },
  customer: {
    id: number,
    customer_name: string
  }
}

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
    let user;
    try {
      user = verify(parseCookie<{ token: string }>(socket.request.headers.cookie).token, key);
    } catch (error) {
      console.log('token验证错误');
      socket.disconnect();
      return;
    }
    const userType = (user as any).phone ? '0' : '1';
    //加入room
    socket.join(userType + (user as any).id);
    //查询消息列表
    const mList = await cRService.getUnreadCount({
      [userR[userType]]: (user as any).id
    } as any);

    //消息列表传递给客户端
    socket.emit('mList', mList);

    //获取具体消息
    socket.on('getChatList', async (data, fn) => {
      const result = await cRService.getMessages(data);
      fn(result);
    })

    //收到服务端新消息
    socket.on('message', (data: IClientMessage) => {
      const to = data.c_from == 1 ? '0' : '1';
      const from = data.c_from == 1 ? '1' : '0';
      const toId = data.c_from == 1 ? data.user.id : data.customer.id;
      //1.更新该消息到客户端
      socket.to(to + toId).emit('message', data);
      //2.更新消息列表到客户端
      socket.to(to + toId).emit('updateList', {
        ...data[userR[from]],
        [`${userR[from]}Id`]: data[userR[from]].id
      });
      //3.消息储存到数据库
      cRService.saveMessage({
        content: data.content,
        from: data.c_from,
        userId: data.user.id,
        customerId: data.customer.id,
        date: data.date,
        isRead: 0
      });
    });

    //设置消息已读
    socket.on('setIsRead', (data) => {
      if (data.user && data.customer) {
        cRService.setMessageIsRead(data);
      }
    })
  })
}


export const chatRouter = express.Router();


// chatRouter.get('/', async (req, res) => {
//   const query = req.query;
//   const result = await cRService.getUnreadCount(query as any);
//   res.send(result);
// })

chatRouter.get('/', async (req, res) => {
  const query = req.query;
  const result = await cRService.getMessages(query as any);
  res.send(result);
})

chatRouter.post('/updateIsRead', async (req, res) => {
  const query = req.query;
  const result = await cRService.setMessageIsRead(query as any);
  res.send(result);
})
