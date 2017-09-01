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