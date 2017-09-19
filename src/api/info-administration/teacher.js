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
	var data = { id }
	return fetch({
		url: '/admin/teacher/del-teacher',
		method: 'post',
		params: data
	})
}

export function getListTeacher(data) {
	return fetch({
		url: '/admin/teacher/list-teacher',
		method: 'post',
		params: data
	})
}

// 下拉使用
export function getAllTeacher(data) {
	return fetch({
		url: '/admin/teacher/get-all-teacher',
		method: 'post',
		params: data
	})
}