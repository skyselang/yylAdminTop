import request from '@/utils/request'

// ----------------留言----------------

/**
   * 注册
   * @param {array} data 请求数据
   */
export function comment (data) {
  return request({
    url: '/api/cms.Comment/add',
    method: 'post',
    data
  })
}
