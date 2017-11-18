import Cookies from 'js-cookie'

const TokenKey = 'xxkd-Token';
const ApiGetInfo = 'api-getInfo';
const LatestTest = 'xqkd-latestTest';
const LatestTestName = 'xqkd-latestTestName';
const period = 'xqkd-period';// 届
const grade = 'xqkd-grade';// 年级
const klass = 'xqkd-class';// 班级
const subject = 'xqkd-subject';// 学科
const school = 'xqkd-school';// 学校

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getApiGetInfo() {
  return Cookies.get(ApiGetInfo)
}

export function setApiGetInfo(setinfo) {
	console.log(setinfo);
  return Cookies.set(ApiGetInfo, setinfo)
}

export function removeApiGetInfo() {
  return Cookies.remove(ApiGetInfo)
}


// 默认考试信息
export function setLatestTest(data) {
  return Cookies.set(LatestTest, data)
}
export function getLatestTest() {
  return Cookies.get(LatestTest)
}

// 全局默认使用的届、年级、班级
export function attrPeriod(val){
	if(typeof val != 'undefined') Cookies.set(period, val);
	else return Cookies.get(period);
}
export function attrGrade(val){
	if(typeof val != 'undefined') Cookies.set(grade, val);
	else return Cookies.get(grade);
}
export function attrClass(val){
	if(typeof val != 'undefined') Cookies.set(klass, val);
	else return Cookies.get(klass);
}
export function attrSubject(val){
	if(typeof val != 'undefined') Cookies.set(subject, val);
	else return Cookies.get(subject);
}
export function attrSchool(val){
	if(typeof val != 'undefined') Cookies.set(school, val);
	else return Cookies.get(school);
}