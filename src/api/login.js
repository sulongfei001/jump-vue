import request from '@/utils/request'
import Config from '@/utils/config'

export function loginByUsername(username, password) {
  const params = {
    client_id: Config.client_id,
    client_secret: Config.client_secret,
    username,
    password,
    grant_type: 'password'
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    params
  })
}

export function getUserInfo(sysCode) {
  const data = {
    sysCode
  }
  return request({
    url: '/admin/system/sysUserInfo',
    method: 'post',
    data
  })
}

