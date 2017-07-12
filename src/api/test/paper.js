import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 试卷
 */

// 获取考卷列表
export function listExaminationPaper(query) {
  return fetch({
    url: '/admin/examination-paper/list-examination-paper',
    method: 'post',
    params: query
  });
}

// 新增试卷
export function saveExaminationPaper(query) {
  return fetch({
    url: '/admin/examination-paper/save-examination-paper',
    method: 'post',
    params: query
  });
}

// 编辑试卷
export function modExaminationPaper(query) {
  return fetch({
    url: '/admin/examination-paper/mod-examination-paper',
    method: 'post',
    params: query
  });
}

// 删除试卷
export function delExaminationPaper(id) {
  return fetch({
    url: '/admin/examination-paper/del-examination-paper',
    method: 'post',
    params: id
  });
}