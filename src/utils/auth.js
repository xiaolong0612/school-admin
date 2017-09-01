import Cookies from 'js-cookie'

const TokenKey = 'xxkd-Token'
const ApiGetInfo = 'api-getInfo'

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