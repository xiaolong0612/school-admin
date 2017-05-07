import { fetch } from 'utils/fetch';

export function loginByEmail(account, password) {
  const data = {
    account,
    password
  };
  return fetch({
    url: '/login/loginbyemail',
    method: 'post',
    params: data
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

