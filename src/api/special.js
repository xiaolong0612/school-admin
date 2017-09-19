import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 专题
 */
// 所有考试区专题得分率监控图
export function getAllSpecialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/get-all-special-topic',
		method: 'post',
		params: query
	})
}

// 单次考试某专题各校得分率监控图
export function getPaperSchoolPassRateSpecialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/getPaperSchoolPassRateSpecialTopic',
		method: 'post',
		params: query
	})
}
//所有考试全区各校某专题值监控表
export function specialTopic(query){
	return fetch({
		url: '/admin/schoo-basic/special-topic',
		method: 'post',
		params: query
	})
}