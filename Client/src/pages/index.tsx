import React, { useEffect } from 'react';
import { Link, useDispatch, useSelector, useStore } from 'umi';
import styles from './index.less';
import io from 'socket.io-client';


export default function Index() {
  // useEffect(() => {
  //   const socket = io();
  //   socket.on('connect', () => {
  //     console.log(socket.id);
  //   });
  //   socket.on('message', (data: string) => {
  //     console.log(data);
  //   })
  //   socket.emit('message','message come from client')
  // }, [])
  const loginUser = useSelector(state => (state as any).loginUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'loginUser/logout' });
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/test" >abc </Link>
      <div className={styles.a}>a</div>
      <div className={styles.b}>b</div>
      <div className={styles.c}>{loginUser.status ? '已登录' : '未登录'}</div>
    </div>
  );
}
