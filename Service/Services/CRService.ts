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
   * 根据用户id查询未读消息数,传递userId或者customerId中的任意一项
   * @param 用户id
   */
  async getUnreadCount({ user, customer }) {
    try {
      const current = user ? 0 : 1;
      const target = user ? 1 : 0;
      const unReadList = await ChatRecord
        .createQueryBuilder()
        .select([`${ECurrent[target]}Id`, `${ECurrent[target]}_name`])
        .addSelect(`COUNT( ${ECurrent[target]}Id )`, 'messageCount')
        .innerJoin(`${ECurrent[target]}`, 'c', `c.id = ${ECurrent[target]}Id`)
        .where(`isRead = 0 AND c_from = ${target}`)
        .andWhere(new Brackets(qb => {
          qb.where("userId = :user", { user })
            .orWhere("customerId = :customer", { customer })
        }))
        .groupBy(`${ECurrent[target]}Id`)
        .printSql()
        .getRawMany();
      return createSuccessData(unReadList);
    } catch (error) {
      return createErrorMessage(error)
    }
  }

  /**
   * 设置相关全部消息已读
   * @param {object} { user: 客户id, customer: 客服id, from: 请求端 }
   * 
   */
  async setMessageIsRead({ user, customer, from }) {
    try {
      const { raw: { changedRows } } = await ChatRecord
        .createQueryBuilder()
        .update()
        .set({ 'isRead': 1 })
        .where(
          "userId = :user AND customerId = :customer AND c_from = :from",
          { user, customer, from: from == 0 ? 1 : 0 }
        )
        .execute();
      return createSuccessData({ changedRows });
    } catch (error) {
      return createErrorMessage(error);
    }
  }
}


export const cRService = new CRService();