import React from 'react';
import { Link } from 'umi';
import styles from './index.less';

export default () => {
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
