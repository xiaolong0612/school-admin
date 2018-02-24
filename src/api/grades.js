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
// 班级类型切换
export function getClassScore(data){
	return fetch({
		url: '/admin/class-basic/get-class-score',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 学科均分监控表
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
 * @namespace 优良率图/表
 * @param     {
 *            	paperId: 7
 *            }
 */
// 区
export function getSchoolExcellentRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolExcellentRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}
export function getSchoolExcellentRateByPeriodAndSubjectAndGradeEchart(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolExcellentRate',
		method: 'post',
		data
	})
}
// 校
export function getClassScoreRateByPeriodAndGradeAndSchoolIdTable(data){
	return fetch({
		url: '/admin/class-basic/getClassScoreRateByPeriodAndGradeAndSchoolId',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 及格率图/表
 * @param     {
 *            	paperId: 7
 * 						}
 */
// 区
export function getSchoolPassRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolPassRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}
export function getSchoolPassRateByPeriodAndSubjectAndGradeEchart(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolPassRate',
		method: 'post',
		data
	})
}
// 校
export function getClassPassRateByPeriodAndGradeAndSchoolIdTable(data){
	return fetch({
		url: '/admin/class-basic/getClassPassRateByPeriodAndGradeAndSchoolId',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-28
 * @namespace 低分率图/表
 * @param     {
 *            	paperId: 7
 * 						}
 */
// 区
export function getSchoolLowGradeRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolLowGradeRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}
export function getSchoolLowGradeRateByPeriodAndSubjectAndGradeEchart(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperSchoolLowGradeRate',
		method: 'post',
		data
	})
}
// 校
export function getClassLowGradeRateByPeriodAndGradeAndSchoolIdTable(data){
	return fetch({
		url: '/admin/class-basic/getClassLowGradeRateByPeriodAndGradeAndSchoolId',
		method: 'post',
		data
	})
}


// 教师使用的优良率、低分率，及格率
/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-24
 * @namespace 单次考试全区各校优良率 监控图
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
 * @DateTime  2017-10-24
 * @namespace 全区所有行政班/教学班优良率 监控图
 */
export function getClassExcellentRatePaperId(data){
	return fetch({
		url: '/admin/class-basic/getClassExcellentRatePaperId',
		method: 'post',
		data
	})
}
/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-24
 * @namespace 历次优良率 监控表
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
 * @DateTime  2017-10-24
 * @namespace 班级优良率 监控表
 * @static    无
 */

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-24
 * @namespace 学科质量跟踪表
 * @static    
 */
export function getSchoolSpecialTopicBySubjectAndPeriod(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolSpecialTopicBySubjectAndPeriod',
		method: 'post',
		data
	})
}
/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-24
 * @namespace 学生成绩监控
 * @static    
 */

export function allStudentScore(data){
	return fetch({
		url: 'admin/education/all-student-score',
		method: 'post',
		data
	})
}