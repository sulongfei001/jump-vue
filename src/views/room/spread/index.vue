<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.remoteClubId" placeholder="选择门店" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
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
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间密码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗门票" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}张</span>
        </template>
      </el-table-column>
      <el-table-column label="参与人数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.joinNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已参与人数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.partakeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="第几人中奖" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.winNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大奖物品" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.spreadGoods.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user && scope.row.user.nickname ? scope.row.user.nickname : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中将时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.winTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'danger' : 'success'">{{ scope.row.status === 1 ? '结束' : '正常' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getRoomList" />

  </div>
</template>

<script>
import { fetchSpreadRoomList } from '@/api/room'
import { fetchClubAll } from '@/api/club'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      clubList: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 20,
        remoteClubId: undefined
      }
    }
  },
  created() {
    this.getRoomList()
    this.getClubAll()
  },
  methods: {
    getRoomList() { // 商品列表
      this.listLoading = true
      fetchSpreadRoomList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getClubAll() {
      fetchClubAll().then(response => {
        this.clubList = response.data
      })
    },
    handleFilter() { // 搜索
      this.listQuery.page = 1
      this.getRoomList()
    }
  }
}
</script>
