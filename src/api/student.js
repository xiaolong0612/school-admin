import fetch from 'utils/fetch';
/**
 * 学生
 */

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-25
 * @namespace 个人成绩总表
 */
export function getStudentScore(data){
	return fetch({
		url: '/admin/student/get-student-score',
		method: 'post',
		data
	})
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-25
 * @namespace 学生专题质量监控图
 */
export function getStudentScoreRate(data){
	return fetch({
		url: '/admin/student/getStudentScoreRate',
		method: 'post',
		data
	})
}