import React, { useEffect } from 'react';
import { Link } from 'umi';
import styles from './index.less';
import io from 'socket.io-client';

export default () => {
  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      console.log(socket.id);
    });
    socket.on('message', (data: string) => {
      console.log(data);
    })
    socket.emit('message','message come from client')
  }, [])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/test" >abc </Link>

      <div className={styles.a}>a</div>
      <div className={styles.b}>b</div>
      <div className={styles.c}>c中国</div>
    </div>
  );
}
