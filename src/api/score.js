import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 成绩
 */
// 单次考试全区各校总分监控表
export function getScore(query){
	return fetch({
		url: '/admin/schoo-basic/get-score',
		method: 'post',
		params: query
	})
}
// 某次考试全区各学校学科分层监控表
export function getPaperScore(query) {
	return fetch({
		url: '/admin/schoo-basic/get-paperScore',
		method: 'post',
		params: query
	})
}
// 单次考试全区所有学生成绩总表
export function getAllScore(query){
	return fetch({
		url: '/admin/education/get-allScore',
  	method: 'post',
		params: query
	})
}
// 获取某次考试全区所有行政班学科数据分层表
export function getEducationClassScore(query){
	return fetch({
		url: '/admin/education/get-class-score',
  	method: 'post',
		params: query
	})
}

// 单次考试全区所有行政班学科分层监控表
export function getClassScore(query){
	return fetch({
		url: '/admin/class-basic/get-class-score',
  	method: 'post',
		params: query
	})
}