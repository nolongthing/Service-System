import React, { useRef, useState } from 'react';
import { SegmentedControl, List, InputItem, Button, Toast } from 'antd-mobile';
import style from './login.less'
import { postLogin } from '@/api';

const tabText = {
  'login': '登录',
  'registered': '注册'
}

const infoTemp = {
  phone: '',
  password: '',
  confirmPassword: '',
  userName: ''
};

export default function Login({ history }: any) {
  const [curTab, setCurTab] = useState<'login' | 'registered'>('login');
  const loginInfo = useRef(infoTemp);

  function handleNav(val: any) {
    loginInfo.current = infoTemp;
    setCurTab(val);
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    const { phone, password } = loginInfo.current;
    if (!phone || !password) {
      Toast.fail('手机号或密码不可以为空', 1);
      return;
    }
    const { data = {} } = await postLogin({
      phone,
      password
    });
    if (data?.data === 'login success!') {
      history.replace('/');
      return;
    }
    Toast.fail('登录失败，请检查手机号或密码是否正确', 1);
  }

  async function handleRegistered(e: any) {
    e.preventDefault();
    const { phone, password, confirmPassword, userName } = loginInfo.current;
    if (!phone || !password || !confirmPassword || !userName) {
      Toast.fail('存在必填项为空', 1);
      return;
    }
    if (password !== confirmPassword) {
      Toast.fail('两次输入密码不一致', 1);
      return;
    }
    
  }

  return (
    <div className={`${style.container}`}>
      <SegmentedControl values={['login', 'registered']} onValueChange={handleNav} className={`${style.nav}`} />
      <List renderHeader={() => `${tabText[curTab]}信息`} key={curTab}>
        <InputItem
          type="phone"
          placeholder="请输入手机号码"
          onChange={(val) => { loginInfo.current.phone = val; }}
        >手机号码</InputItem>
        {
          curTab === 'registered' &&
          <InputItem
            type="text"
            maxLength={5}
            placeholder="请输入姓名"
            onChange={(val) => { loginInfo.current.userName = val; }}
          >姓名</InputItem>
        }
        <InputItem
          type="password"
          maxLength={16}
          placeholder="***"
          onChange={(val) => { loginInfo.current.password = val; }}
        >密码</InputItem>
        {
          curTab === 'registered' &&
          <InputItem
            type="password"
            maxLength={16}
            placeholder="***"
            onChange={(val) => { loginInfo.current.confirmPassword = val; }}
          >确认密码</InputItem>
        }
        <List.Item>
          <Button onClick={(e) => { curTab === 'login' ? handleLogin(e) : handleRegistered(e) }} size='large' type="primary" >{`${tabText[curTab]}`}</Button>
        </List.Item>
      </List>
    </div>
  )
}

