import request from '@/utils/request'
// 退出
const url = '/api/member.Logout/'
/**
 * 退出
 * @param {array} data 请求数据
 */
export function logout(data) {
  return request({
    url: url + 'logout',
    method: 'post',
    data
  })
}
/**
 * 注销账号
 * @param {array} data 请求数据
 */
export function cancel(data) {
  return request({
    url: url + 'cancel',
    method: 'post',
    data
  })
}
