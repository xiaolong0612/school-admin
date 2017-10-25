import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace  能力发展
 */

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-24
 * @namespace 学科能力监控图
 * @param     {[type]}    data [description]
 * @return    {[type]}         [description]
 */
export function getPaperSchoolPassRateSpecialTopic(data){
	return fetch({
		url: '/admin/schoo-basic/getPaperSchoolPassRateSpecialTopic',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-25
 * @namespace 班级学科能力监控图
 * @param     {[type]}    data [description]
 * @return    {[type]}         [description]
 */
export function getClassSpecialTopicBySchoolId(data){
	return fetch({
		url: '/admin/class-basic/getClassSpecialTopicBySchoolId',
		method: 'post',
		data
	})
}


// // 所有考试和最近考试单项能力各校发展监控图（如“识记”
// export function listSchoolLevel(query){
// 	return fetch({
// 		url: '/admin/echart-api/list-school-level',
// 		method: 'post',
// 		params: query
// 	})
// }
// // 所有和最近考试市、区学科能力发展监控表
// export function getSchoolSpecialTopicBySubjectAndPeriod(query){
// 	return fetch({
// 		url: 'admin/schoo-basic/getSchoolSpecialTopicBySubjectAndPeriod',
// 		method: 'post',
// 		params: query
// 	})
// }

// // 所有考试某中单项能力考点管理
// export function listAreaSummary(query){
// 	return fetch({
// 		url: '/admin/area-summary/list-area-summary',
// 		method: 'post',
// 		params: query
// 	})
// }