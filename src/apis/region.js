import request from '@/utils/request'

// ----------------地区----------------

/**
* 地区列表
*/
export function list () {
  return request({
    url: '/api/Region/list',
    method: 'get'
  })
}

/**
 * 地区信息
 * @param {array} data 请求数据
 */
export function info (data) {
  return request({
    url: '/api/Region/info',
    method: 'get',
    params: data
  })
}

/**
 * 地区树形
 * @param {array} data 请求数据
 */
export function tree (data) {
  return request({
    url: '/api/Region/tree',
    method: 'get',
    params: data
  })
}
