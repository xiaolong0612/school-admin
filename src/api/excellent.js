import fetch from 'utils/fetch';
/**
 * @namespace 优良率
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各学科优良率
 * @param     {
 *            	paperId: 1
 *            }
 *
 * @remark		需要数据
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
 * @DateTime  2017-09-29
 * @namespace 班级各学科
 * @param     {
 *            	pageNo=1&pageSize=10&period=2017&subject=%E8%AF%AD%E6%96%87&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7&state=0
 *            	pageNo: 1,
 *            	pageSize: 10,
 *            	period: 2017,
 *            	grade: '七年级',
 *            	subject: '语文',
 *            	state: 0
 *            }
 * @static    可用
 * http://localhost:8080/sqms/admin/class-basic/getClassExcellentRateByPeriodAndSubjectAndGrade?pageNo=1&pageSize=10&period=2017&subject=%E8%AF%AD%E6%96%87&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7&state=0
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
 * @param     {
 *            	pageNo=1&pageSize=10&schoolId=23&period=2017&grade=七年级
 *            	pageNo: 1,
 *            	pageSize: 30,
 *            	schoolId: '',
 *            	period: 2017,
 *            	grade: 七年级
 * 						}
 * @static    可用
 * localhost:8080/sqms/admin/schoo-basic/getSchoolExcellentRateBySchoolIdAndSubjectAndPeriodAndGrade?pageNo=1&pageSize=10&schoolId=23&period=2017&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7
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
 *            	grade: '七年级',
 *            	pageSize: 10,
 *            	classId: 1
 *            }
 * @static    可用
 *            问题，classId用户信息中没有，只有班级名称
 *            
 * localhost:8080/sqms/admin/class-basic/getClassExcellentRateByPeriodAndClassIdAndGrade?pageNo=1&pageSize=10&period=2017&grade=%E4%B8%83%E5%B9%B4%E7%BA%A7&classId=65
 */
export function getClassExcellentRateByPeriodAndClassIdAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassExcellentRateByPeriodAndClassIdAndGrade',
		method: 'post',
		data
	})
}

// 总分跟踪管理
export function quaryAllScoreRataByPeriodForPage(data){
	return fetch({
		url: '/admin/schoo-basic/quaryAllScoreRataByPeriodForPage',
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