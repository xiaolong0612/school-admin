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
// 试卷列表
// 届 年级 科目
export function getPaperList(data){
	return fetch({
		url: '/admin/examination-paper/getExaminationPaper',
		method: 'post',
		data
	})
}
// 届 年级
export function getPaperNameList(data){
	return fetch({
		url: '/admin/examination-paper/getExaminationPaperName',
		method: 'post',
		data
	})
}

// 届
export function getAllPeriod(data){
	return fetch({
		url: '/admin/klass/getAllPeriod',
		method: 'post',
		data
	})
}