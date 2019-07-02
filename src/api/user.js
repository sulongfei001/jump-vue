import service from '@/utils/request'

/**
 * 获取用户列表
 */
export function fetchUserList(data) {
  return service({
    url: '/admin/user/list',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function fetchUserInfo(id) {
  return service({
    url: '/admin/user/info/' + id,
    method: 'post'
  })
}

/**
 * 修改用户信息
 */
export function modifyUser(data) {
  return service({
    url: '/admin/user/update',
    method: 'post',
    data
  })
}
