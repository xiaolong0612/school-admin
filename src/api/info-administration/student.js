import fetch from 'utils/fetch';

export function addStudent(data) {
  return fetch({
    url: '/admin/student/save-student',
    method: 'post',
    data
  })
}

export function delStudent(id) {
	var data = { id }
	return fetch({
		url: '/admin/student/del-student',
		method: 'post',
		params: data
	})
}

export function modStudent(data) {
	return fetch({
		url: '/admin/student/mod-student',
		method: 'post',
		data
	})
}

export function getListStudent(data) {
		return fetch({
		url: '/admin/student/list-student',
		method: 'post',
		data
	})
}

export function importStudent(data) {
		return fetch({
		url: '/admin/student/import-student',
		method: 'post',
		data
	})
}

export function downloadStudent() {
		return fetch({
		url: '/admin/student/download-student',
		method: 'post'
	})
}
