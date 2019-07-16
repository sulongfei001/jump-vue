import service from '@/utils/request'

// 获取商品列表
export function fetchLocalGoodsList(data) {
  return service({
    url: '/admin/goods/local/list',
    method: 'post',
    data
  })
}

export function fetchLocalGoodsByClubId(data) {
  return service({
    url: '/admin/goods/local/all',
    method: 'post',
    data
  })
}

export function updateLocalGoods(data) {
  return service({
    url: '/admin/goods/local/update',
    method: 'put',
    data
  })
}

export function fetchSpreadGoodsList(data) {
  return service({
    url: '/admin/goods/spread/list',
    method: 'post',
    data
  })
}

export function getSpreadGoodsInfo(id) {
  return service({
    url: '/admin/goods/spread/detail/' + id,
    method: 'post'
  })
}

export function createSpreadGoods(data) {
  return service({
    url: '/admin/goods/spread/create',
    method: 'post',
    data
  })
}

export function updateSpreadGoods(data) {
  return service({
    url: '/admin/goods/spread/update',
    method: 'put',
    data
  })
}

export function synchronizeGoods(data) {
  return service({
    url: '/admin/goods/synchronize',
    method: 'post',
    data
  })
}

