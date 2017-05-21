import fetch from 'utils/fetch';

export function loginByAccount(account, password, code, type) {
  const data = {
    account,
    password,
    code,
    type
  };
  return fetch({
    url: '/login/loginbyaccount',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

