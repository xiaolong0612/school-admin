import fetch from 'utils/fetch';

export function addClss(data) {
  return fetch({
    url: '/admin/klass/sava-klass',
    method: 'post',
    params: data
  })
}

export function modClass(data) {
	return fetch({
		url: '/admin/klass/mod-klass',
		method: 'post',
		params: data
	})
}

export function getListClass(data) {
	return fetch({
		url: '/admin/klass/list-klass',
		method: 'post',
		params: data
	})
}