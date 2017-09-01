import fetch from 'utils/fetch';
/**
 * @author xiaolong
 * @default 首页
 */
export function student(query) {
  return fetch({
    url: '/admin/student/get-top',
    method: 'post',
    params: query
  });
}

export function teacher() {
  return fetch({
    url: '',
    method: 'post',
  });
}