<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="synchClubData">同步</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="门店ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remoteClubId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="isOrg" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isOrg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="270" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini" style="width:80px;margin:0;" @click="handleRank(scope.row)">排行榜奖励</el-button>
          <el-button v-waves type="primary" size="mini" style="width:80px;margin:0;" @click="handleIntegral(scope.row)">排行榜积分</el-button>
          <el-button v-waves type="primary" size="mini" style="width:68px;margin:0;" @click="roomList(scope.row)">房间列表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getClubList" />

    <prize-detail ref="dataForm" />
    <room-list ref="listForm" />
    <integral-list ref="integralForm"/>
  </div>
</template>

<script>
import { fetchClubList, synchronizeClub } from '@/api/club'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import PrizeDetail from '@/views/system/prize/detail'
import IntegralList from '@/views/club/integralList'
import RoomList from '@/views/club/roomList'

export default {
  components: { Pagination, PrizeDetail, RoomList, IntegralList },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getClubList()
  },
  methods: {
    getClubList() { // 商品列表
      this.listLoading = true
      fetchClubList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleRank(row) {
      const _this = this.$refs['dataForm']
      _this.dialogFormVisible = true
      _this.clubId = row.remoteClubId
      _this.clubTitle = row.supplierName
    },
    handleIntegral(row) {
      const _this = this.$refs['integralForm']
      _this.dialogFormVisible = true
      _this.clubId = row.remoteClubId
      _this.clubTitle = row.supplierName
    },
    roomList(row) {
      const _this = this.$refs['listForm']
      _this.dialogFormVisible = true
      _this.clubId = row.remoteClubId
      _this.clubTitle = row.supplierName
    },
    synchClubData() {
      this.listLoading = true
      synchronizeClub().then(response => {
        this.listLoading = false
        this.$message({
          type: 'success',
          message: '同步成功，请手动刷新列表'
        })
      }).catch(() => {
        this.listLoading = false
        this.$message({
          type: 'error',
          message: '同步失败'
        })
      })
    }
  }
}
</script>
