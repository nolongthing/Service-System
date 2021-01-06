

// 使用 Mock

import { ChatRecord } from "./Models/Entity/ChatRecord";
import { Customer } from "./Models/Entity/Customer";
import { User } from "./Models/Entity/Users";
import { mock, Random } from "mockjs";


var md5 = require('md5-node');

//创造十条用户
async function creatUser() {
  for (let index = 0; index < 10; index++) {
    const { password, username, phone } = mock({
      'username': Random.cname(),
      'phone': /^1[0-9]{10}$/,
      'password': md5(Random.word(3, 5)),
    });
    const user = new User(password, username, phone);
    await user.save();
  }
}

//创造十条客服
async function createCustomer() {
  for (let index = 0; index < 10; index++) {
    const { password, customerName, account } = mock({
      'customerName': Random.cname(),
      'account': Random.word(6, 12),
      'password': md5(Random.word(3, 5)),
    });
    const customer = new Customer(password, customerName, account);
    await customer.save();
  }
}

//创造十条聊天记录
async function createChatRecord() {
  for (let index = 0; index < 10; index++) {
    const { content, userId, customerId, from, date, isRead } = mock({
      'content': Random.csentence(),
      'userId|1-10': 10,
      'customerId|1-10': 10,
      'from|0-1': 1,
      'date': new Date(Random.now('minute')).getTime(),
      'isRead|0-1': 1,
    });
    const chatRecord = new ChatRecord(content, userId, customerId, from, date, isRead);
    await chatRecord.save();
  }
}

