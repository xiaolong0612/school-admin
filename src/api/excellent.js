import fetch from 'utils/fetch';
/**
 * @namespace 优良率
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各学科优良率
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 10,
 *            	period: 2017,
 *            	subject: '语文'
 *            }
 */
export function getSchoolScoreExcellent(data){
	return fetch({
		url: '/admin/education/get-school-score-excellent',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各学科
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 10,
 *            	period: 2017,
 *            	grade: '初一年',
 *            	subject: 1
 *            }
 * @static    无法使用
 */
export function getClassExcellentRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassExcellentRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 全区各科优良率比较
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 10,
 *            	period: 2017,
 *            	grade: '初一年',
 *            	schoolId: 1
 *            }
 * @static    无法使用
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 学校各科优良率比较
 * @param     {}
 * @static    暂无
 */
export function getSchoolExcellentRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolExcellentRateBySchoolIdAndSubjectAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各科优良率比较
 * @param     {
 *            	pageNo: 1,
 *            	pageSize: 10,
 *            	period: 2017,
 *            	grade: '初一年',
 *            	pageSize: 10,
 *            	classId: 1
 *            }
 * @static    无法使用
 */
export function getClassExcellentRateByPeriodAndClassIdAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassExcellentRateByPeriodAndClassIdAndGrade',
		method: 'post',
		data
	})
}



// 所有考试全区各校单科优良率监控表

// export function getClassExcellentRatePaperId(query){
// 	return fetch({
// 		url: '/admin/class-basic/getClassExcellentRatePaperId',
// 		method: 'post',
// 		params: query
// 	})
// }

// // 单次考试全区所有学生成绩总表
// export function getAllScore(query){
// 	return fetch({
// 		url: '/admin/education/get-allScore',
// 		method: 'post',
// 		params: query
// 	})
// }

// // 全区各校单次考试成绩总表
// export function getSchoolScoreRateByPaperNameAndPeriodAndGrade(query){
// 	return fetch({
// 		url: '/admin/schoo-basic/getSchoolScoreRateByPaperNameAndPeriodAndGrade',
// 		method: 'post',
// 		params: query
// 	})
// }

// // 全区所有行政班单次考试成绩总表
// export function getClassScoreByPeriodAndPaperNameAndGrade(query){
// 	return fetch({
// 		url: '/admin/class-basic/getClassScoreByPeriodAndPaperNameAndGrade',
// 		method: 'post',
// 		params: query
// 	})
// }

// // 单次考试全区各校优良率 监控图
// export function getPaperIdSchoolExcellentRate(query){
// 	return fetch({
// 		url: '/admin/schoo-basic/get-PaperIdSchoolExcellentRate',
// 		method: 'post',
// 		params: query
// 	})
// }