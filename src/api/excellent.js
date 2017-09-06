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