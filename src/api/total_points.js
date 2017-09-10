import fetch from 'utils/fetch';
/**
 * @Author    xiaolongjun
 * @DateTime  2017-07-01
 * @namespace 总分
 */
// 全区各校单次考试成绩总表
export function getSchoolScoreRateByPaperNameAndPeriodAndGrade(query) {
  return fetch({
    url: '/admin/schoo-basic/getSchoolScoreRateByPaperNameAndPeriodAndGrade',
    method: 'post',
    params: query
  })
}
// 历次质检全区各行政班总分监控表
export function getClassStudent(query) {
  return fetch({
  	url: '/admin/education/get-class-student',
  	method: 'post',
		params: query
  })
}
// 历次质检全区所有行政班/教学班学科均分监控表
export function getClassScoreObject(query) {
  return fetch({
  	url: '/admin/education/get-class-score-object',
  	method: 'post',
		params: query
  })
}