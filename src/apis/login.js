import request from '@/utils/request'

// ----------------登录/退出----------------

/**
* 验证码
*/
export function captcha () {
  return request({
    url: '/api/Login/captcha',
    method: 'get'
  })
}

/**
 * 登录
 * @param {array} data 请求数据
 */
export function login (data) {
  return request({
    url: '/api/Login/login',
    method: 'post',
    data
  })
}

/**
 * 退出
 * @param {array} data 请求数据
 */
export function logout (data) {
  return request({
    url: '/api/Login/logout',
    method: 'post',
    data
  })
}
