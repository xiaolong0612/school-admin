import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 优良率
 */
// 所有考试全区各校单科优良率监控表
export function getClassExcellentRatePaperId(query){
	return fetch({
		url: '/admin/class-basic/getClassExcellentRatePaperId',
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

// 全区各校单次考试成绩总表
export function getSchoolScoreRateByPaperNameAndPeriodAndGrade(query){
	return fetch({
		url: '/admin/schoo-basic/getSchoolScoreRateByPaperNameAndPeriodAndGrade',
		method: 'post',
		params: query
	})
}

// 全区所有行政班单次考试成绩总表
export function getClassScoreByPeriodAndPaperNameAndGrade(query){
	return fetch({
		url: '/admin/class-basic/getClassScoreByPeriodAndPaperNameAndGrade',
		method: 'post',
		params: query
	})
}