<template>
  <el-dialog :visible.sync="dialogFormVisible" title="中奖记录">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="initData"/>
  </el-dialog>
</template>

<script>
import { fetchPrizeList } from '@/api/room'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  props: {
    roomId: {
      type: Number,
      default: 0
    }
  },
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
    roomId(newVal) {
      this.listQuery.id = newVal
      this.initData()
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      fetchPrizeList(this.listQuery).then(response => {
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

