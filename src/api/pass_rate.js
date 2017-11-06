import fetch from 'utils/fetch';
/**
 * @namespace 及格率
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各学科优良率
 * @param     {}
 * @static    暂无
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
 * @DateTime  2017-09-29
 * @namespace 班级各学科
 * @param     {}
 * @static    暂无
 */
export function getClassPassRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassPassRateByPeriodAndSubjectAndGrade',
		method: 'post',
		data
	})
}


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 全区各科优良率比较
 * @param     {}
 * @static    暂无
 */
export function getSchoolPassRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolPassRateBySchoolIdAndSubjectAndPeriodAndGrade',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 学校各科优良率比较
 * @param     {}
 * @static    暂无
 */
// export function getSchoolPassRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
// 	return fetch({
// 		url: '/admin/schoo-basic/getSchoolPassRateBySchoolIdAndSubjectAndPeriodAndGrade',
// 		method: 'post',
// 		data
// 	})
// }

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各科优良率比较
 * @param     {}
 * @static    暂无
 */
export function getClassPassRateByPeriodAndClassIdAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassPassRateByPeriodAndClassIdAndGrade',
		method: 'post',
		data
	})
}