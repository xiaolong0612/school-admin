import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace  能力发展
 */
// 所有考试和最近考试单项能力各校发展监控图（如“识记”
export function listSchoolLevel(query){
	return fetch({
		url: '/admin/echart-api/list-school-level',
		method: 'post',
		params: query
	})
}
// 所有和最近考试市、区学科能力发展监控表
export function getSchoolSpecialTopicBySubjectAndPeriod(query){
	return fetch({
		url: 'admin/schoo-basic/getSchoolSpecialTopicBySubjectAndPeriod',
		method: 'post',
		params: query
	})
}

// 所有考试某中单项能力考点管理
export function listAreaSummary(query){
	return fetch({
		url: '/admin/area-summary/list-area-summary',
		method: 'post',
		params: query
	})
}