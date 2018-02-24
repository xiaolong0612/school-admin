import fetch from 'utils/fetch';

export function addSchool(data) {
  return fetch({
    url: '/admin/school/save-school',
    method: 'post',
    data
  })
}

export function delSchool(data) {
	return fetch({
		url: '/admin/school/del-school',
		method: 'post',
		data
	})
}

export function modSchool(data) {
	console.log(data)
	return fetch({
		url: '/admin/school/mod-school',
		method: 'post',
		data
	})
}

export function getSchoolList(data) {
	return fetch({
		url: '/admin/school/list-school',
		method: 'post',
		data
	})
}
export function getAllSchoolList(data) {
	return fetch({
		url: '/admin/school/list-all-school',
		method: 'post',
		data
	})
}
