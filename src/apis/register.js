import request from '@/utils/request'

// ----------------注册----------------

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
