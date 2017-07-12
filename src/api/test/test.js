import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 考点
 */
// 获取专题考点列表
export function listTestSites(query) {
  return fetch({
  	url: '/admin/test-sites/list-test-sites',
  	method: 'post',
		params: query
  })
}

// 新增专题考点
export function saveTestSites(query) {
  return fetch({
  	url: '/admin/test-sites/save-test-sites',
  	method: 'post',
		params: query
  })
}

// 编辑专题考点
export function modTestSites(query) {
  return fetch({
  	url: '/admin/test-sites/mod-test-sites',
  	method: 'post',
		params: query
  })
}

// 删除专题考点
export function delTestSites(id) {
  return fetch({
  	url: '/admin/test-sites/del-test-sites',
  	method: 'post',
		params: id
  })
}