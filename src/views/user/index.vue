<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="用户ID" clearable style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.phoneNumber" placeholder="手机号" clearable style="width: 200px;" class="filter-item" />
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
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推广员" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isSaler ? '' : 'success'">{{ scope.row.isSaler ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gender | statusFilter">{{ scope.row.gender | genderFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="门票数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastOperationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini" @click="handleUpdate(scope.row)" >编辑</el-button>
          <el-button v-waves type="primary" size="mini" >日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
    <edit-form ref="dataForm" />
  </div>
</template>

<script>
import { fetchUserList } from '@/api/user'
import editForm from '@/views/user/editForm'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, editForm },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: '',
        2: 'danger'
      }
      return statusMap[status]
    },
    genderFilter(status) {
      const genderMap = {
        0: '无',
        1: '男',
        2: '女'
      }
      return genderMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 20,
        id: undefined,
        phoneNumber: undefined
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() { // 搜索
      this.listQuery.page = 1
      this.getUserList()
    },
    handleUpdate(row) {
      const _this = this.$refs['dataForm']
      _this.dialogFormVisible = true
      _this.userData = Object.assign({}, row)
    }
  }
}
</script>