import fetch from 'utils/fetch';

// 各种列表获取
// 
// 班级列表
export function getClassList(data){
	return fetch({
		url: '/admin/klass/getklassList',
		method: 'post',
		data
	})
}