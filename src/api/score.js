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
// 单次考试全区所有学生成绩总表
export function getAllStudentScore(query){
	return fetch({
		url: '/admin/education/all-student-score',
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

// 单次考试全区所有行政班/教学班 学科分层监控表
export function getClassScore(query){
	return fetch({
		url: '/admin/class-basic/get-class-score',
  	method: 'post',
		params: query
	})
}
// 历次质检全区各校学科均分监控表
export function getSchoolScoreRateBySubjectAndPeriodAndGrade(query){
	return fetch({
		url: '/admin/schoo-basic/getSchoolScoreRateBySubjectAndPeriodAndGrade',
  	method: 'post',
		params: query
	})
}
// 所有考试全区行政班均分监控表
export function getAllClassScoreRate(query){
	return fetch({
		url: '/admin/class-basic/get-allClassScoreRate',
  	method: 'post',
		params: query
	})
}

// 单次考试年段各班总分监控表
export function getClassScoreRateByPaperIdAndGradeAndSchoolId(query){
	return fetch({
		url: '/admin/class-basic/getClassScoreRateByPaperIdAndGradeAndSchoolId',
  	method: 'post',
		params: query
	})
}

// 单次考试年段各班学科分层监控表
export function queryTmpClassBasicByPaperIdAndSchoolIdForPage(query){
	return fetch({
		url: '/admin/class-basic/queryTmpClassBasicByPaperIdAndSchoolIdForPage',
  	method: 'post',
		params: query
	})
}


























