import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 专题
 */



// 所有考试区专题得分率监控图
/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 得分率
 * @param     {
 *            	paperId: 1,
 *            	specialTopicId: 1
 *            }
 * @static 		
 */
export function getAllSpecialTopic(data){
	return fetch({
		url: '/admin/schoo-basic/get-all-special-topic',
		method: 'post',
		data
	})
}
// 单次考试学校
export function getSpecialTopic(data){
	return fetch({
		url: '/admin/schoo-basic/special-topic',
		method: 'post',
		data
	})
}
// 所有考试学校
export function getPaperSchoolPassRateSpecialTopic(data){
	return fetch({
		url: '/admin/schoo-basic/getPaperSchoolPassRateSpecialTopic',
		method: 'post',
		data
	})
}
// 考点
export function queryschoolCheckPoints(data){
	return fetch({
		url: '/admin/schoo-basic/queryschoolCheckPoints',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 质量分析
 * @param     {
 *            	
 *            }
 * @static 		
 */
export function listInstructorQualityAnalysis(data){
	return fetch({
		url: '/admin/quality-analysis/list-instructor-quality-analysis',
		method: 'post',
		data
	})
}



/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 质量分析编辑
 * @param     {
 *            	
 *            }
 * @static 		
 */
export function modTeachAdvice(data){
	return fetch({
		url: '/admin/quality-analysis/mod-teach-advice',
		method: 'post',
		data
	})
}



// export function getAllSpecialTopic(query){
// 	return fetch({
// 		url: '/admin/schoo-basic/get-all-special-topic',
// 		method: 'post',
// 		params: query
// 	})
// }

// 单次考试某专题各校得分率监控图

//所有考试全区各校某专题值监控表
export function specialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/special-topic',
		method: 'post',
		params: query
	})
}