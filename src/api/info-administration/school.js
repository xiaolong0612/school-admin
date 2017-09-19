import fetch from 'utils/fetch';

export function addSchool(query) {
	console.log(query)
  return fetch({
    url: '/admin/school/save-school',
    method: 'post',
    params: query
  })
}

export function delSchool(id) {
	var data = { id }
	return fetch({
		url: '/admin/school/del-school',
		method: 'post',
		params: data
	})
}

export function modSchool(data) {
	console.log(data)
	return fetch({
		url: '/admin/school/mod-school',
		method: 'post',
		params: data
	})
}

export function getSchoolList(query) {
	return fetch({
		url: '/admin/school/list-school',
		method: 'post',
		params: query
	})
}
