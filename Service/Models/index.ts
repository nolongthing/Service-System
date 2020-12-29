import { createConnection } from "typeorm";

createConnection().then(() => {
  console.log('已连接数据库');
})