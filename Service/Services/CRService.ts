import { ChatRecord } from "@model/Entity/ChatRecord";
import { createErrorMessage, createSuccessData } from "tools";

export interface IMessage {
  content: string,
  from: 0 | 1,
  date: string,
  userId: number,
  customerId: number,
  isRead: 0
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
   * 设置全部消息已读
   * @param {} 
   */
  async setMessageIsRead({ userId, customerId, to }) {

  }
}


export const cRService = new CRService();