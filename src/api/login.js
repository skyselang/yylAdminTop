import request from '@/utils/request'
// 登录/退出
const url = '/api/member.Login/'
/**
 * 验证码
 */
export function captcha() {
  return request({
    url: url + 'captcha',
    method: 'get'
  })
}
/**
 * 登录
 * @param {array} data 请求数据
 */
export function login(data) {
  return request({
    url: url + 'login',
    method: 'post',
    data
  })
}
/**
 * 退出
 * @param {array} data 请求数据
 */
export function logout(data) {
  return request({
    url: '/api/member.Logout/logout',
    method: 'post',
    data
  })
}

/**
 * 邮箱登录验证码
 * @param {object} data 包含邮箱和验证码
 */
export function emailCaptcha(data) {
  return request({
    url: url + 'emailCaptcha',
    method: 'post',
    data
  })
}
/**
 * 邮箱登录
 * @param {array} data 请求数据
 */
export function emailLogin(data) {
  return request({
    url: url + 'emailLogin',
    method: 'post',
    data
  })
}
