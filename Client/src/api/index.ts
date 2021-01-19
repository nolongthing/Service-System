import { request } from "umi";



export function postLogin() {
  return request('/api/user', {
    method: 'get'
  });
}