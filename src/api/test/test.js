import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 考点
 */
// 获取专题列表
export function getTestSitesList(query) {
  return fetch({
  	url: '/admin/test-sites/list-test-sites',
  	method: 'post',
		params: query
  })
}

// 新增专题
export function addTestSites(query) {
  return fetch({
    url: '/admin/test-sites/save-test-sites',
    method: 'post',
    params: query
  })
}

// 新增专题
export function addTestsites(query) {
  return fetch({
    url: '/admin/test-sites/new-testSites',
    method: 'post',
    params: query
  })
}

// 编辑专题
export function modTestSites(query) {
  return fetch({
  	url: '/admin/test-sites/mod-testSites',
  	method: 'post',
		params: query
  })
}

// 删除专题
export function delTestSites(id) {
  var data = { id }
  return fetch({
  	url: '/admin/test-sites/del-test-sites',
  	method: 'post',
		params: data
  })
}

// 获取专题列表
export function getUseTestSites(query) {
  return fetch({
    url: '/admin/test-sites/get-testSitesList',
    method: 'post',
    params: query
  })
}


// 编辑考点
export function modTestSitesItem(query) {
  return fetch({
    url: '/admin/test-sites/mod-test-sites',
    method: 'post',
    params: query
  })
}