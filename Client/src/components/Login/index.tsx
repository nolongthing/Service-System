import React from 'react';
import { SegmentedControl } from 'antd-mobile';
import style from './login.less'
import { postLogin } from '@/api';

export default function Login() {
  function handleNav(val: string) {
    console.log(val);
    postLogin();
  }

  return (
    <div className={`${style.container}`}>
      <SegmentedControl values={['login', 'registered']} onValueChange={handleNav} className={`${style.nav}`} />
    </div>
  )
}
