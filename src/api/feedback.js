import request from '@/utils/request'

// ----------------反馈----------------

/**
 * 注册
 * @param {array} data 请求数据
 */
export function feedback(data) {
  return request({
    url: '/api/setting.Feedback/add',
    method: 'post',
    data
  })
}
