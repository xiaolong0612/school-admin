import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 专题
 */
// 单次考试某专题各校得分率监控图
export function getScore(query){
	return fetch({
		url: '/admin/schoo-basic/getPaperSchoolPassRateSpecialTopic',
		method: 'post',
		params: query
	})
}