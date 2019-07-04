<template>
  <el-dialog :visible.sync="dialogFormVisible" :title="clubTitle" width="80%">
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
          <span>{{ scope.row.user.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.integral }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="initData"/>

  </el-dialog>
</template>

<script>
import { fetchRankList } from '@/api/club'
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
        remoteClubId: 0,
        page: 1,
        pageSize: 10
      },
      clubId: undefined,
      clubTitle: undefined,
      dialogFormVisible: false
    }
  },
  watch: {
    clubId(newVal) {
      this.listQuery.remoteClubId = newVal
      this.initData()
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      fetchRankList(this.listQuery).then(response => {
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

