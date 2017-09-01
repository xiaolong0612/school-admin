import fetch from 'utils/fetch';

export function loginByAccount(account, password, code, type) {
  const data = { account, password, code, type };
  return fetch({
    url: '/admin/login',
    method: 'post',
    params: data
  });
}

export function getInfo(query) {
  return fetch({
    url: '/admin/get-login-info',
    method: 'post',
    params: query
  });
}

export function logout(query) {
  return fetch({
    url: '/admin/login-out',
    method: 'post',
    params: query
  });
}