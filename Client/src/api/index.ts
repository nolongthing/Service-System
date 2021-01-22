import { extend } from 'umi-request';

const request = extend({
  headers: {
    'Content-Type': 'application/json'
  }
});

export function whoAmI() {
  return request('/api/user', {
    method: 'get'
  });
}

export function postLogin(params: { password: string, phone?: string, account?: string }) {
  return request(`/api/${params.phone ? 'user' : 'customer'}`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export function postRegistered(params: { password: string, phone: string, username: string }) {
  return request('/api/user', {
    method: 'put',
    body: JSON.stringify(params),
  });
}