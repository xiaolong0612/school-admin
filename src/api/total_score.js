import fetch from 'utils/fetch';
/**
 * @namespace  总分管理
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 总分跟踪管理
 * @param     {
 *            	period: 2017
 * 						}
 * @static    无法使用
 */
export function quaryAllScoreRataByPeriodForPage(data){
	return fetch({
		url: '/admin/schoo-basic/quaryAllScoreRataByPeriodForPage',
		method: 'post',
		data
	})
}