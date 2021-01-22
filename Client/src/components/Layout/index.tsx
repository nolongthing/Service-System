import React, { useEffect, useState } from 'react';
import { NavBar, Icon, TabBar } from 'antd-mobile';
import styles from './layout.less';
import { useDispatch, useSelector } from 'umi';
import { whoAmI } from '@/api';
import io from 'socket.io-client';
import { iconList, IProps, navKey, navName } from './LayoutConf';

export default function Layout({ children, history }: IProps) {
  const [titleKey, setTitleKey] = useState<keyof typeof navName>('index');
  const header = useSelector(state => (state as any).appSet.header);
  const dispatch = useDispatch();
  useEffect(() => {
    if (history.location.pathname === '/') {
      history.replace('/index');
    } else {
      setTitleKey(history.location.pathname.replace(/\//g, '') as any);
    }
    dispatch({
      type: 'appSet/setHeader',
      payload: (navName as any)[history.location.pathname.replace(/\//g, '')] || ''
    })
    initPage()
  }, [])

  async function initPage() {
    const { code, data } = await whoAmI();
    if (code !== 0) {
      dispatch({ type: 'loginUser/logout' });
      return;
    }
    dispatch({
      type: 'loginUser/login',
      payload: {
        userName: data.user_name || data.customer_name,
        userAccount: data.account || data.phone,
        userId: data.id,
        customerId: data.id,
        userType: data.phone ? 0 : 1
      }
    });
    createSocket();
  }

  function createSocket() {
    const socket = io();
    socket.on('connect', () => {
      // console.log(socket.id);
      dispatch({
        type: 'message/setSocket',
        payload: socket
      })
    });

    // socket.on('message', (data: string) => {
    //   console.log(data);
    // })
    // socket.emit('message', {
    //   content: '',
    //   c_from: '',
    //   date: '',
    //   isRead: '',
    //   userId: '',
    //   customerId: ''
    // })
  }

  function handleTab(tabKey: keyof typeof navName) {
    setTitleKey(tabKey);
    dispatch({
      type: 'appSet/setHeader',
      payload: navName[tabKey]
    })
    history.replace(`/${tabKey}`);
  }

  return (
    <div className={`${styles.container}`}>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <Icon key="1" type="ellipsis" />,
        ]}
      >{header}</NavBar>

      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={navKey.findIndex(item => item === history.location.pathname.replace(/\//g, '')) === -1}
        prerenderingSiblingsNumber={0}
        tabBarPosition='bottom'
      >
        {
          navKey.map((item, index) => {
            return (
              <TabBar.Item
                title={(navName as any)[item]}
                key={item}
                icon={{ uri: iconList[index].icon }}
                selectedIcon={{ uri: iconList[index].selectedIcon }}
                selected={item === titleKey}
                onPress={() => { handleTab(item as any) }}
              >
                {children}
              </TabBar.Item>
            )
          })
        }
      </TabBar>
    </div>
  )
}
