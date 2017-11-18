import fetch from 'utils/fetch';
/**
 * @namespace 低分率
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各学科低分率
 * @param     {}
 * @static    暂无
 */
export function getPaperSchoolLowGradeRate(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperSchoolLowGradeRate',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各学科
 * @param     {}
 * @static    暂无
 */
export function getClassLowGradeRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassLowGradeRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 全区各科低分率比较
 * @param     {}
 * @static    暂无
 */
export function getSchoolLowRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolPassRateBySchoolIdAndSubjectAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 学校各科低分率比较
 * @param     {}
 * @static    暂无
 */
// export function getSchoolLowRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
// 	return fetch({
// 		url: '/admin/schoo-basic/getSchoolLowRateBySchoolIdAndSubjectAndPeriodAndGrade',
// 		method: 'post',
// 		data
// 	})
// }

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各科低分率比较
 * @param     {}
 * @static    暂无
 */
export function getClassLowRateByPeriodAndClassIdAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassLowRateByPeriodAndClassIdAndGrade',
		method: 'post',
		data
	})
}