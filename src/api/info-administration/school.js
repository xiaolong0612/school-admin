import fetch from 'utils/fetch';

export function addSchool(data) {
  return fetch({
    url: '/admin/school/save-school',
    method: 'post',
    params: data
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

export function getSchoolList(data) {
		return fetch({
		url: '/admin/school/list-school',
		method: 'post',
		params: data
	})
}
