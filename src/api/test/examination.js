import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 试题
 */

// 获取考卷列表
export function getExaminationPaperItemList(query) {
  return fetch({
    url: '/admin/examination-paper-item/list-examination-paper-item',
    method: 'post',
    params: query
  });
}

// 新增试题
export function addExaminationPaperItem(data) {
  return fetch({
    url: '/admin/examination-paper-item/save-examination-paper-item',
    method: 'post',
    data
  });
}

// 编辑试卷
export function modExaminationPaperItem(data) {
  return fetch({
    url: '/admin/examination-paper-item/mod-examination-paper-item',
    method: 'post',
    data
  });
}

// 删除试卷
export function delExaminationPaperItem(id) {
  var data = { id }
  return fetch({
    url: '/admin/examination-paper-item/del-examination-paper-item',
    method: 'post',
    data
  });
}