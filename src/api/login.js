import fetch from 'utils/fetch';

export function loginByAccount(account, password, type) {
  const data = { account, password, type };
  return fetch({
    url: '/admin/login',
    method: 'post',
    data
  });
}

export function getInfo(data) {
  console.log(data)
  return fetch({
    url: '/admin/get-login-info',
    method: 'post',
    data
  });
}

export function logout(data) {
  return fetch({
    url: '/admin/login-out',
    method: 'post',
    data
  });
}