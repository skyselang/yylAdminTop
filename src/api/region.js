import request from '@/utils/request'
// 地区
const url = '/api/setting.Region/'
/**
 * 地区列表
 */
export function list() {
  return request({
    url: url + 'list',
    method: 'get'
  })
}

/**
 * 地区信息
 * @param {array} data 请求数据
 */
export function info(data) {
  return request({
    url: url + 'info',
    method: 'get',
    params: data
  })
}

/**
 * 地区树形
 * @param {array} data 请求数据
 */
export function tree(data) {
  return request({
    url: url + 'tree',
    method: 'get',
    params: data
  })
}
