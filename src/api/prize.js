import service from '@/utils/request'

export function createRankPrize(data) {
  return service({
    url: '/admin/prize/rank/create',
    method: 'post',
    data
  })
}

export function rankPrizeList(remoteClubId) {
  const params = {
    remoteClubId
  }
  return service({
    url: '/admin/prize/rank/list',
    method: 'post',
    params
  })
}
