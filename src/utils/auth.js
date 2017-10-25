import Cookies from 'js-cookie'

const TokenKey = 'xxkd-Token';
const ApiGetInfo = 'api-getInfo';
const LatestTest = 'xqkd-latestTest';
const LatestTestName = 'xqkd-latestTestName';

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