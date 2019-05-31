import service from '@/utils/request'

export function fetchClubList(data) {
  return service({
    url: '/admin/club/local/list',
    method: 'post',
    data
  })
}

export function fetchClubAll(data) {
  return service({
    url: '/admin/club/local/all',
    method: 'post',
    data
  })
}

export function synchronizeClub(data) {
  return service({
    url: '/admin/club/synchronize',
    method: 'post',
    data
  })
}
