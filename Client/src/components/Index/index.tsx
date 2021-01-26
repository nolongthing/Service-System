import React, { useEffect } from 'react';
import { History, Link, useDispatch, useSelector } from 'umi';
import { List, Badge } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;
export interface IMList {
  userId?: number,
  customerId?: number,
  user_name?: string,
  customer_name?: string,
  noReadCount: number
}

export default function Index({ history }: { history: History }) {
  const loginUser = useSelector(state => (state as any).loginUser);
  const messageList = useSelector<any, IMList[]>(state => (state as any).message.newMessageList);
  //socket链接
  const socket = useSelector<any, SocketIOClient.Socket>(state => (state as any).message.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '消息列表'
    })
  }, [])

  useEffect(() => {
    //更新消息列表
    if (socket) {
      socket.on('updateList', (data: IMList) => {
        console.log(data)
        dispatch({
          type: 'message/updateMessageList',
          payload: {
            updateList: {
              ...data,
              userType: loginUser.userMessage.userType
            }
          }
        })
      })
    }
    return () => {
      socket?.off('updateList');
    }
  }, [socket])

  function handleToChat(chatUser: IMList) {
    history.push('/chat', {
      chatUser: {
        ...chatUser
      }
    })
  }

  function goLogin() {
    if (loginUser.status) return;
    history.replace('/login');
  }
  return (
    <div>
      {
        messageList && messageList.length > 0 &&
        <List className="my-list">
          {
            messageList.map((item, index) => {
              return (
                <Item
                  className={styles.item}
                  extra={item.noReadCount == 0 ? '' : <Badge text={item.noReadCount} overflowCount={100} />}
                  key={`${item.userId || item.customerId}${index}`}
                  onClick={() => { handleToChat(item) }}
                >
                  {item.customer_name || item.user_name}
                </Item>
              )
            })
          }
        </List>
      }

      <div className={styles.c} onClick={goLogin}>{loginUser.status ? '已登录' : '未登录'}</div>
    </div>
  );
}
