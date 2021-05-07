import request from '@/utils/request'

// ----------------注册----------------

/**
* 验证码
*/
export function verify () {
  return request({
    url: '/index/Register/verify',
    method: 'get'
  })
}

/**
   * 注册
   * @param {array} data 请求数据
   */
export function register (data) {
  return request({
    url: '/index/Register/register',
    method: 'post',
    data
  })
}
