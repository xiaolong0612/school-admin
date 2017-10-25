import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 试卷
 */

// 获取考卷列表
export function getExaminationPaperList(data) {
  return fetch({
    url: '/admin/examination-paper/list-examination-paper',
    method: 'post',
    data
  });
}

// 新增试卷
export function addExaminationPaper(data) {
  return fetch({
    url: '/admin/examination-paper/save-examination-paper',
    method: 'post',
    data
  });
}

// 编辑试卷
export function modExaminationPaper(data) {
  return fetch({
    url: '/admin/examination-paper/mod-examination-paper',
    method: 'post',
    data
  });
}

// 删除试卷
export function delExaminationPaper(id) {
  let data = { id };
  return fetch({
    url: '/admin/examination-paper/del-examination-paper',
    method: 'post',
    data
  });
}