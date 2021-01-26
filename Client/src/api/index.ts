import { ICustomer } from '@/components/Customer';
import { extend } from 'umi-request';

const request = extend({
  headers: {
    'Content-Type': 'application/json'
  }
});
/* token验证 */
export function whoAmI() {
  return request('/api/user', {
    method: 'get'
  });
}
/* 客服列表 */
export function getCustomerList(): Promise<{ code: number, data: ICustomer[] }> {
  return request('/api/customer', {
    method: 'get'
  });
}
/* 登录请求 */
export function postLogin(params: { password: string, phone?: string, account?: string }) {
  return request(`/api/${params.phone ? 'user' : 'customer'}`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}
/* 注册请求 */
export function postRegistered(params: { password: string, phone: string, username: string }) {
  return request('/api/user', {
    method: 'put',
    body: JSON.stringify(params),
  });
}