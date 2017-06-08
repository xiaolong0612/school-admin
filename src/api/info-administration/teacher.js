import fetch from 'utils/fetch';

export function addTeacher(data) {
  return fetch({
    url: '/admin/teacher/save-teacher',
    method: 'post',
    params: data
  })
}

export function modTeacher(data) {
	return fetch({
		url: '/admin/teacher/mod-teacher',
		method: 'post',
		params: data
	})
}

export function delTeacher(id) {
	return fetch({
		url: '/admin/teacher/del-teacher',
		method: 'post',
		params: id
	})
}

export function getListTeacher(data) {
	return fetch({
		url: '/admin/teacher/list-teacher',
		method: 'post',
		params: data
	})
}