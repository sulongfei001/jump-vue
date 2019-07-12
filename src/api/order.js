import service from '@/utils/request'

export function fetchOrderList(data) {
  return service({
    url: '/admin/order/list',
    method: 'post',
    data
  })
}
