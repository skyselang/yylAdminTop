import request from '@/utils/request'
// 我的反馈
const url = '/api/setting.Feedback/'
/**
 * 反馈列表
 * @param {array} params 请求参数
 */
export function list(params) {
  return request({
    url: url + 'list',
    method: 'get',
    params: params
  })
}

/**
 * 反馈提交
 * @param {array} data 请求数据
 */
export function add(data, method = 'post') {
  if (method == 'get') {
    return request({
      url: url + 'add',
      method: 'get',
      params: data
    })
  } else {
    return request({
      url: url + 'add',
      method: 'post',
      data
    })
  }
}

/**
 * 反馈信息
 * @param {array} params 请求参数
 */
export function info(params) {
  return request({
    url: url + 'info',
    method: 'get',
    params: params
  })
}
