import fetch from 'utils/fetch';
/**
 * @namespace 学科管理
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 学科均分
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 30,
 *            	period: 2017,
 *            	subject: '语文',
 *            	grade: '初一年级',
 *            	static: 0、行政班，1、教学班
 *            }
 * @static    无法使用
 */
export function getSchoolScoreRateBySubjectAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolScoreRateBySubjectAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 学校各科均分
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 30,
 *            	period: 2017,
 *            	subject: '语文',
 *            	grade: '初一年级',
 *            }
 * @static    无法使用
 */
export function getSchoolScoreRateBySubjectAndPeriodAndGrade_2(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolScoreRateBySubjectAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各科均分
 * @param     {}
 * @static    暂无
 */