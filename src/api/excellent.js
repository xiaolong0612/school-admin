import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 优良率
 */
// 所有考试全区各校单科优良率监控表
export function getSchoolScoreExcellent(query){
	return fetch({
		url: '/admin/education/get-school-score-excellent',
		method: 'post',
		params: query
	})
}