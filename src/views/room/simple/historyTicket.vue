<template>
  <el-dialog :visible.sync="visible" title="游戏记录">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" width="100px" align="center">
        <template slot-scope="{row,$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="格子数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.integral }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="initData"/>
  </el-dialog>
</template>

<script>
import { fetchHistoryTicket } from '@/api/room'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        id: 0,
        page: 1,
        pageSize: 10
      },
      visible: false
    }
  },
  watch: {
    'listQuery.id'(newVal) {
      this.initData()
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      fetchHistoryTicket(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

