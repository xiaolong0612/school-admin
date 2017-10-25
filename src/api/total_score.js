import fetch from 'utils/fetch';
/**
 * @namespace  总分管理
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 总分跟踪管理
 * @param     {
 *            	pageNo: 1,
          			pageSize: 30,
          			period: 2017,
          			grade: '七年级'
 * 						}
 * @static    无法使用  http://localhost:8080/sqms/admin/schoo-basic/quaryAllScoreRataByPeriodForPage?pageNo=1&pageSize=10&period=2017&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7
 */
export function quaryAllScoreRataByPeriodForPage(data){
	return fetch({
		url: '/admin/schoo-basic/quaryAllScoreRataByPeriodForPage',
		method: 'post',
		data
	})
}