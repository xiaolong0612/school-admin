import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 成绩
 */
export function getPaperScore(id) {
	const data = { id };
	return fetch({
		url: '/admin/schoo-basic/get-paperScore',
		method: 'post',
		params: data
	})
}