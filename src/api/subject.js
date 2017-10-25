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
			          pageSize: 30,
			          period: 2017,
			          grade: '七年级',
			          subject: '语文'
 *            }
 * @static    可用
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
			          pageSize: 30,
			          period: 2017,
			          grade: '七年级',
			          subject: '语文'
 * @static    http://localhost:8080/sqms/admin/schoo-basic/getSchoolScoreRateBySubjectAndPeriodAndGrade?pageNo=1&pageSize=10&period=2017&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7&subject=%E8%AF%AD%E6%96%87
 *            可用
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
 * @param     {
 *            	pageNo: 1,
			          pageSize: 30,
             		period: 2017,
             		subject: '语文'
			 					state 0教学班 1行政班
			 				}
 * @static    可用
 * http://localhost:8080/sqms/admin/class-basic/getClassScoreRateBySubjectAndPeriodAndGradeAndState?pageNo=1&pageSize=10&period=2017&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7&subject=%E8%AF%AD%E6%96%87&state=1
 */
export function getClassScoreRateBySubjectAndPeriodAndGradeAndState(data){
	return fetch({
		url: '/admin/class-basic/getClassScoreRateBySubjectAndPeriodAndGradeAndState',
		method: 'post',
		data
	})
}