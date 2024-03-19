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
