import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 成绩上传任务列表
 */

// 获取任务列表
export function getTaskRecord(query) {
  return fetch({
    url: '/admin/task-record/get-task-record',
    method: 'post',
    params: query
  })
}

// 计算
export function calculation(query) {
  return fetch({
    url: '/admin/calculation',
    method: 'post',
    params: query
  })
}
