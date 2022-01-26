import request from '@/utils/request'

// ----------------注册----------------

/**
* 验证码
*/
export function captcha () {
  return request({
    url: '/api/Register/captcha',
    method: 'get'
  })
}

/**
   * 注册
   * @param {array} data 请求数据
   */
export function register (data) {
  return request({
    url: '/api/Register/register',
    method: 'post',
    data
  })
}
