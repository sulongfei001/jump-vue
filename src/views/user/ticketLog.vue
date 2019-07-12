<template>
  <el-dialog :visible.sync="dialogFormVisible" title="门票记录" width="80%">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="房间类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roomType === 1 ? '游戏房间' : '推广员房间' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="格子数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.integral }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否中奖" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isWin ? 'danger' : 'info'" class="font-weight:bold">{{ scope.row.isWin ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="消耗门票" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.consumeTicket }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="initData"/>

  </el-dialog>
</template>

<script>
import { fetchTicketLog } from '@/api/user'
import Pagination from '@/components/Pagination'

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
      dialogFormVisible: false
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
      fetchTicketLog(this.listQuery).then(response => {
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

