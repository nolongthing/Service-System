import React, { useEffect } from 'react';
import { Link, useDispatch, useSelector } from 'umi';
import styles from './index.less';



export default function Index() {
  const loginUser = useSelector(state => (state as any).loginUser);
  useEffect(() => {
  }, [])

  return (
    <div>
      <Link to="/chat" >abc </Link>
      <div className={styles.a}>a</div>
      <div className={styles.b}>b</div>
      <div className={styles.c}>{loginUser.status ? '已登录' : '未登录'}</div>
    </div>
  );
}
