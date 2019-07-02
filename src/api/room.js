import service from '@/utils/request'

export function fetchSimpleRoomList(data) {
  return service({
    url: '/admin/room/simple/list',
    method: 'post',
    data
  })
}

export function fetchSpreadRoomList(data) {
  return service({
    url: '/admin/room/spread/list',
    method: 'post',
    data
  })
}

export function getRoomInfo(data) {
  return service({
    url: '/admin/room/simple/detail/' + data.id,
    method: 'post',
    data
  })
}

export function updateRoom(data) {
  return service({
    url: '/admin/room/simple/update',
    method: 'put',
    data
  })
}

export function deleteRoom(id) {
  return service({
    url: '/admin/room/simple/delete/' + id,
    method: 'delete'
  })
}

export function createRoom(data) {
  return service({
    url: '/admin/room/simple/create',
    method: 'post',
    data
  })
}

export function fetchPrizeList(data) {
  return service({
    url: '/admin/room/simple/prize',
    method: 'post',
    data
  })
}

export function fetchHistoryTicket(data) {
  return service({
    url: '/admin/room/simple/history',
    method: 'post',
    data
  })
}

export function sortSimpleRoom(data) {
  return service({
    url: '/admin/room/simple/sort',
    method: 'post',
    data
  })
}
