import React, { useEffect, useRef, useState } from 'react';
import { History, IUserMessage, useDispatch, useSelector } from 'umi';
import { TextareaItem, Button } from 'antd-mobile';
import { IMList } from '../Index';
import styles from './chat.less';
import { whoAmI } from '@/api';

export interface IMessage {
  id?: number,
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

export default function Chat({ history }: { history: History }) {
  //输入框信息
  const [message, setMessage] = useState<string | undefined>('');
  //聊天列表
  const [chatList, setChatList] = useState<IMessage[] | null>(null);
  //聊天双方信息
  const chatUser = useRef<IMList>((history.location.state as any)?.chatUser);
  //当前登录状态及登录人信息
  const { status, userMessage: userInfo } = useSelector<any, { status: boolean, userMessage: IUserMessage }>(state => (state as any).loginUser);
  //socket链接
  const socket = useSelector<any, SocketIOClient.Socket>(state => (state as any).message.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    initFun();
  }, [])

  useEffect(() => {
    if (userInfo?.userId) {
      setUserMessage();
    }
    return () => {
      socket?.off('message');
    }
  }, [socket, userInfo]);

  useEffect(() => {
    //设置相关未读消息为已读
    if (chatList && chatList.findIndex(item => item.c_from != userInfo.userType && item.isRead == 0) !== -1) {
      socket.emit('setIsRead', {
        user: chatUser.current.userId,
        customer: chatUser.current.customerId,
        from: userInfo.userType
      })
      //更新全局状态
      dispatch({
        type: 'message/setMessageIsRead',
        payload: {
          userId: chatUser.current.userId,
          customerId: chatUser.current.customerId,
          from: userInfo.userType
        }
      });
    }
  }, [chatList])

  function getMessage() {
    if (socket) {
      //获取历史消息
      socket.emit('getChatList', {
        user: chatUser.current.userId,
        customer: chatUser.current.customerId
      }, (messageList: any) => {
        setChatList(messageList.data?.reverse())
      })
      //接收新消息
      socket.on('message', (data: IMessage) => {
        updateMessageList(data);
      })
    }

  }

  async function initFun() {
    //查看登录权限
    const { code } = await whoAmI();
    if (code !== 0) {
      history.replace('/index');
      return;
    }
    if (chatUser) {
      dispatch({
        type: 'appSet/setHeader',
        payload: (userInfo?.userType == 1 ? chatUser.current.user_name : chatUser.current.customer_name)
      });
    } else {
      history.replace('/index')
    }
  }

  /**
   * 获取消息
   */
  function setUserMessage() {
    if (userInfo?.userType == 0) {
      chatUser.current.userId = userInfo.userId;
      chatUser.current.user_name = userInfo.userName;
      getMessage()
    } else {
      chatUser.current.customerId = userInfo?.userId;
      chatUser.current.customer_name = userInfo?.userName;
      getMessage()
    }
  }

  /**
   * 发送消息
   */
  function handleSend() {
    if (!message) {
      return;
    }
    const sendMessage: IMessage = createMessage();
    console.log(sendMessage);
    updateMessageList(sendMessage);
    setMessage('');
    socket.emit('message', sendMessage);
  }

  function updateMessageList(message: IMessage) {
    setChatList((value) => {
      if (value) {
        return [...value, message]
      } else {
        return [message]
      }
    })
  }

  function createMessage(): IMessage {
    return {
      content: message as string,
      c_from: userInfo.userType,
      date: new Date().getTime().toString(),
      isRead: 0,
      user: {
        id: chatUser.current.userId as number,
        user_name: chatUser.current.user_name as string,
      },
      customer: {
        id: chatUser.current.customerId as number,
        customer_name: chatUser.current.customer_name as string
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles['message-list']}>
        {
          chatList && chatList.map(item => {
            return (
              <div key={item.id || item.date} className={`${styles['message-content']} ${styles[userInfo.userType == item.c_from ? 'me' : 'no-me']}`}>
                {
                  userInfo.userType == item.c_from &&
                  <span className={` ${styles.content}  ${styles.M}`}> {item.content} </span>
                }
                <div
                  className={`${styles.header}`}
                >
                  {item.c_from == 1 ? item.customer.customer_name : item.user.user_name}
                </div>
                {
                  userInfo.userType != item.c_from &&
                  <span className={`${styles.content} ${styles.T}`}> {item.content} </span>
                }
              </div>
            )
          })
        }
      </div>
      <div className={styles['input-container']}>
        <TextareaItem
          value={message}
          onChange={(value) => { setMessage(value) }}
          autoHeight
          className={styles.input}
        />
        <Button
          className={styles.btn}
          type="primary"
          inline
          size="small"
          onClick={handleSend}
        >发送</Button>
      </div>
    </div>
  )
}
