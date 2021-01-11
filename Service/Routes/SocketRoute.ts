import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';

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
    console.log(socket.request.headers.cookie);
    socket.emit('message', 'message come from Service')

    socket.on('message',(data)=>{
      console.log(data)
    })
  })
}

