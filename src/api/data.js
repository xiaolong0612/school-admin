import fetch from 'utils/fetch';

export function fetchList(query) {
  return fetch({
    url: '/data/list',
    method: 'get',
    params: query
  });
}

export function fetchPv(pv) {
  return fetch({
    url: '/data/pv',
    method: 'get',
    params: { pv }
  });
}
