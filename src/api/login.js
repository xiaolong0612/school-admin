import { fetch } from 'utils/fetch';

export function loginByAccount(account, password, code, type) {
  const data = {
    account,
    password,
    code,
    type
  };
  return fetch({
    url: 'http://118.178.93.124:81/admin/login',
    method: 'post',
    params: data
  });
}

export function logout() {
  return fetch({
    url: 'http://118.178.93.124:81/admin/login-out',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: 'http://118.178.93.124:81/admin/get-login-info',
    method: 'get',
    params: { token }
  });
}