import service from '@/utils/request'

// 获取通用枚举服务
export function fetchCommonEnumInfo(data) {
  return service({
    url: '/admin/system/enumInfo',
    method: 'post',
    data
  })
}

