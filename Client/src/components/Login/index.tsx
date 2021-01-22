import React, { useRef, useState } from 'react';
import { SegmentedControl, List, InputItem, Button, Toast, Switch } from 'antd-mobile';
import md5 from 'md5';
import style from './login.less'
import { postLogin, postRegistered } from '@/api';

const tabText = {
  'login': '登录',
  'registered': '注册'
}

const infoTemp = {
  checked: true,
  phone: '',
  password: '',
  confirmPassword: '',
  username: '',
  account: ''
};

export default function Login({ history }: any) {
  const [curTab, setCurTab] = useState<'login' | 'registered'>('login');
  const [isUser, setIsUser] = useState(true);
  const loginInfo = useRef(infoTemp);

  function handleNav(val: any) {
    setIsUser(true);
    loginInfo.current = infoTemp;
    setCurTab(val);
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    const { phone, password, account } = loginInfo.current;
    if ((!phone && !account) || !password) {
      Toast.fail('登录信息不可以为空', 1);
      return;
    }
    const { data = {} } = await postLogin({
      [isUser ? 'phone' : 'account']: (isUser ? phone : account).replace(/\s/g, ''),
      password: md5(password)
    });
    if (data?.data === 'login success!') {
      history.replace('/');
      return;
    }
    Toast.fail('登录失败，请检查登录信息是否正确', 1);
  }

  async function handleRegistered(e: any) {
    e.preventDefault();
    const { phone, password, confirmPassword, username } = loginInfo.current;
    if (!phone || !password || !confirmPassword || !username) {
      Toast.fail('存在必填项为空', 1);
      return;
    }
    if (password !== confirmPassword) {
      Toast.fail('两次输入密码不一致', 1);
      return;
    }
    const { code, data = {} } = await postRegistered({ phone: phone.replace(/\s/g, ''), password: md5(password), username })
    if (data.userId) {
      Toast.success('注册成功', 1.5);
      setCurTab('login');
      return;
    }
    if (code === 1062) {
      Toast.fail('手机号已存在', 1);
      return;
    }
    Toast.fail(`[${code}] 注册失败，请稍后重试`, 1);
  }

  return (
    <div className={`${style.container}`}>
      <SegmentedControl values={['login', 'registered']} onValueChange={handleNav} className={`${style.nav}`} />
      <List renderHeader={() => `${tabText[curTab]}信息`} key={curTab}>
        {
          curTab === 'login' &&
          <List.Item
            extra={<Switch
              checked={isUser}
              platform="android"
              onChange={(checked) => {
                setIsUser(checked);
              }}
            />}
          >客户账号</List.Item>
        }
        <InputItem
          type={isUser ? "phone" : 'text'}
          maxLength={11}
          placeholder={`请输入${isUser ? '手机号码' : '账号'}`}
          onChange={(val) => { loginInfo.current[isUser ? 'phone' : 'account'] = val; }}
        >{isUser ? '手机号码' : '账号'}</InputItem>
        {
          curTab === 'registered' &&
          <InputItem
            type="text"
            maxLength={5}
            placeholder="请输入姓名"
            onChange={(val) => { loginInfo.current.username = val; }}
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

