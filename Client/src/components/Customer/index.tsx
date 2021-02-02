import { getCustomerList } from '@/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, history } from 'umi';
import { List, Toast } from 'antd-mobile';
import styles from './customer.less';

const Item = List.Item;
export interface ICustomer {
  customer_name: string,
  id: number
}
export default function Customer() {
  const dispatch = useDispatch();
  const userMessage = useSelector(state => (state as any).loginUser.userMessage);
  const [customerList, setCustomerList] = useState<ICustomer[] | null>(null);
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '客服列表'
    });
    initFun();
  }, []);

  async function initFun() {
    const { data } = await getCustomerList();
    setCustomerList(data);
  }

  function handleToChat(item: ICustomer) {
    if (!userMessage) {
      history.push('/login');
      return;
    }
    if (userMessage.userType == 1) {
      Toast.fail('客服账号无法私聊其他客服', 1);
      return;
    }
    history.push('/chat', {
      chatUser: {
        customerId: item.id,
        customer_name: item.customer_name,
      }
    })
  }
  return (
    <div>
      {
        customerList &&
        <List className={styles["customer-list"]}>
          {
            customerList.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  onClick={() => { handleToChat(item) }}
                >
                  {item.customer_name}
                </Item>
              )
            })
          }
        </List>
      }
    </div>
  )
}
