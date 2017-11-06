import fetch from 'utils/fetch';
/**
 * @namespace 低分率
 */


/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 各学科优良率
 * @param     {}
 * @static    暂无
 */
export function getPaperIdSchoolLowRate(data){
	return fetch({
		url: '/admin/schoo-basic/get-PaperIdSchoolLowRate',
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
export function getClassLowRateByPeriodAndSubjectAndGrade(data){
	return fetch({
		url: '/admin/class-basic/getClassLowRateByPeriodAndSubjectAndGrade',
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
export function getSchoolLowRateBySchoolIdAndSubjectAndPeriodAndGrade(data){
	return fetch({
		url: '/admin/schoo-basic/getSchoolLowRateBySchoolIdAndSubjectAndPeriodAndGrade',
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

/**
 * @Author    xiaolongjun
 * @DateTime  2017-09-29
 * @namespace 班级各科优良率比较
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