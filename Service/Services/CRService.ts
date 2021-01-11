import { ChatRecord } from "@model/Entity/ChatRecord";
import { createErrorMessage, createSuccessData } from "tools";
import { Brackets } from "typeorm";

export interface IMessage {
  content: string,
  from: 0 | 1,
  date: string,
  userId: number,
  customerId: number,
  isRead: 0
}

export interface IFindChat {
  user?: number,
  customer?: number,
  to?: 0 | 1,
  page?: number
}

enum ECurrent {
  "user",
  "customer"
}

/**
 * 聊天记录相关服务
 */
class CRService {

  /**
   * 聊天记录储存到数据库
   * @param {object} messageObject  
   */
  async saveMessage({ content, userId, customerId, from, date, isRead }: IMessage) {
    const chatRecord = new ChatRecord(content, userId, customerId, from, date, isRead);
    try {
      const { id } = await chatRecord.save();
      if (id) {
        return createSuccessData({ id })
      }
      return createErrorMessage({
        message: '会话存储错误'
      });
    } catch (error) {
      return createErrorMessage(error);
    }
  }

  /**
   * 查询消息记录
   * @param  
   */
  async getMessages({ user, customer, page = 1 }) {
    try {
      const chats = await ChatRecord
        .getRepository()
        .createQueryBuilder()
        .where("userId = :user", { user })
        .andWhere("customerId = :customer", { customer })
        .orderBy('date', 'ASC')
        .skip((page - 1) * 10)
        .take(10)
        .getMany();
      return createSuccessData(chats);
    } catch (error) {
      return createErrorMessage(error);
    }
  }

  /**
   * 根据用户id查询未读消息数
   * @param 用户id
   */
  async getUnreadCount({ user, customer }) {
    const current = user ? 0 : 1;
    const chats = await ChatRecord
      .getRepository()
      .createQueryBuilder()
      .select('customerId')
      .addSelect(`COUNT( customerId )`, 'messageCount')
      .innerJoinAndSelect('customer', 'c')
      .where("isRead = 0")
      .andWhere(new Brackets(qb => {
        qb.where("userId = :user", { user })
          .orWhere("customerId = :customer", { customer })
      }))
      .groupBy('customerId')
      .getRawMany();
    return createSuccessData(chats);
  }

  /**
   * 设置相关全部消息已读
   * @param 相关消息信息
   */
  async setMessageIsRead({ user, customer, to }) {
    const chats = await ChatRecord.find({
      user,
      customer,
      from: to ? 0 : 1
    });

  }
}


export const cRService = new CRService();