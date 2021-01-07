import { Server, Socket } from "socket.io";
import { Server as HttpServer } from 'http';

/**
 * 创建io服务
 * @param httpServer 
 */
export function createIo(httpServer: HttpServer) {
  const io = new Server(httpServer);

  io.on('connection', (socket: Socket) => {
    console.log(socket.request.headers.cookie);
    socket.emit('message', 'socket连接已建立')
  })
}

