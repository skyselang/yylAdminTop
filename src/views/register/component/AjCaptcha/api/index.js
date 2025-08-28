import request from '@/utils/request'
// 登录
const url = '/api/member.Register/'

// 获取验证图片以及token
export function reqGet(params) {
  return request({
    url: url + 'captcha',
    method: 'get',
    params: params
  })
}

// 滑动或者点选验证
export function reqCheck(data) {
  return request({
    url: url + 'captcha',
    method: 'post',
    data
  })
}
