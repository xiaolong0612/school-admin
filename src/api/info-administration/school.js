import fetch from 'utils/fetch';

export function addSchool(data) {
  return fetch({
    url: '/admin/school/save-school',
    method: 'post',
    params: data
  })
}

export function delSchool(id) {
	return fetch({
		url: '/admin/school/del-school',
		method: 'post',
		params: id
	})
}

export function modSchool(id) {
	return fetch({
		url: '/admin/school/mod-school',
		method: 'post',
		params: id
	})
}

export function getSchoolList(data) {
		return fetch({
		url: '/admin/school/list-school',
		method: 'post',
		params: data
	})
}
