import fetch from 'utils/fetch';
/**
 * @namespace 成绩
 */

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各科总分监控
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 20,
 *            	period: 2017,
 *            	grade: 高一年级,
 *            	paperName: '',
 *            	subject: '语文'
 * 						}
 */
export function getSchoolScoreRateByPaperNameAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolScoreRateByPaperNameAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 学生成绩监控
 * @param     {}
 */
export function getScoreRateByschoolId(data){
	return fetch({
		url: '/admin/class-basic/getScoreRateByschoolId',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 学科分层
 * @param     {
 *            	id:1,
 *            	pageNo: 1,
 *            	pageSize: 30,
 *            	static: 0、行政班，1、教学班
 *            }
 */
export function getPaperScore(data){
	return fetch({
		url: '/admin/schoo-basic/get-paperScore',
		method: 'post',
		data
	})
}

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
 * @DateTime  2017-09-28
 * @namespace 总分跟踪管理
 * @param     {}
 * @static    暂无
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 优良率图
 * @param     {
 *            	paperId: 7
 *            }
 */
export function getPaperIdSchoolExcellentRate(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolExcellentRate',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 及格率图
 * @param     {
 *            	paperId: 7
 * 						}
 */
export function getPaperIdSchoolPassRate(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolPassRate',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 低分率图
 * @param     {
 *            	paperId: 7
 * 						}
 */
export function getPaperIdSchoolLowGradeRate(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolLowGradeRate',
		method: 'post',
		data
	})
}