import service from '@/utils/request'

export function fetchSysConfig() {
  return service({
    url: '/admin/system/sysConfig',
    method: 'post'
  })
}

export function updateSysConfig(data) {
  return service({
    url: '/admin/system/sysConfig/update',
    method: 'post',
    data
  })
}

// 获取通用枚举服务
export function fetchCommonEnumInfo(data) {
  return service({
    url: '/admin/system/enumInfo',
    method: 'post',
    data
  })
}
