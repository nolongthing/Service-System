import React from 'react';
import { Icon } from 'antd-mobile';
export default () => {
  return <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center"
  }}>
    <Icon type="loading" size='lg' />
    Loading
  </div>;
}