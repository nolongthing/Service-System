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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '消息列表'
    })
  }, [])

  function handleToChat(chatUser: IMList) {
    history.push('/chat', {
      chatUser
    })
  }
  return (
    <div>
      <List className="my-list">
        {
          messageList && messageList.map((item) => {
            return (
              <Item
                className={styles.item}
                extra={item.noReadCount == 0 ? '' : <Badge text={item.noReadCount} overflowCount={100} />}
                key={item.customerId || item.userId}
                onClick={() => { handleToChat(item) }}
              >
                {item.customer_name || item.user_name}
              </Item>
            )
          })
        }
      </List>
      <div className={styles.c}>{loginUser.status ? '已登录' : '未登录'}</div>
    </div>
  );
}
