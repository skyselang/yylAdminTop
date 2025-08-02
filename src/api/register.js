import request from '@/utils/request'
// 注册
const url = '/api/member.Register/'
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
 * 注册
 * @param {array} data 请求数据
 */
export function register(data) {
  return request({
    url: url + 'register',
    method: 'post',
    data
  })
}

/**
 * 发送邮箱验证码
 * @param {object} data 包含邮箱地址
 */
export function sendEmailCode(data) {
  return request({
    url: url + 'emailCaptcha',
    method: 'post',
    data
  })
}

/**
 * 邮箱注册
 * @param {object} data 包含邮箱、验证码、密码等信息
 */
export function emailRegister(data) {
  return request({
    url: url + 'emailRegister',
    method: 'post',
    data
  })
}
