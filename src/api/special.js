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
 * @static 		不可用，获取数据有问题
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
 * @DateTime  2017-09-28
 * @namespace 质量管理
 * @param     {
 *            	
 *            }
 * @static 		暂无
 */



/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 质量分析
 * @param     {
 *            	
 *            }
 * @static 		暂无
 */




export function getAllSpecialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/get-all-special-topic',
		method: 'post',
		params: query
	})
}

// 单次考试某专题各校得分率监控图

//所有考试全区各校某专题值监控表
export function specialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/special-topic',
		method: 'post',
		params: query
	})
}