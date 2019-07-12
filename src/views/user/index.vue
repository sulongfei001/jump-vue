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
      <el-table-column label="会员ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memberId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册门店ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.registerClue }}</span>
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
      <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.province + '-' + scope.row.city + '-' + scope.row.district + '-' + scope.row.receiverAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后操作时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastOperationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后操作门店" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastOperationClub }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="mini" style="width:68px;margin:0;" @click="updateTicket(scope.row.id)" >修改门票</el-button>
          <el-button v-waves type="primary" size="mini" style="margin:0;" @click="handleUpdate(scope.row)" >编辑</el-button>
          <el-button v-waves type="primary" size="mini" style="margin:0;" @click="ticketLog(scope.row.id)">日志</el-button>
          <el-button v-waves v-if="scope.row.deleteStatus" type="success" size="mini" style="margin:0;" @click="handleEnable(scope.row, false)">启用</el-button>
          <el-button v-waves v-else type="danger" size="mini" style="margin:0;" @click="handleEnable(scope.row, true)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
    <edit-form ref="dataForm" @getUserList="getUserList"/>
    <ticket-list ref="ticketForm"/>
    <ticket-log ref="logForm"/>
  </div>
</template>

<script>
import { fetchUserList, modifyUser } from '@/api/user'
import editForm from '@/views/user/editForm'
import ticketLog from '@/views/user/ticketLog'
import ticketList from '@/views/user/ticketList'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, editForm, ticketLog, ticketList },
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
    updateTicket(id) {
      const _this = this.$refs['ticketForm']
      _this.dialogFormVisible = true
      _this.userId = id
    },
    handleUpdate(row) {
      const _this = this.$refs['dataForm']
      _this.dialogFormVisible = true
      _this.userData = Object.assign({}, row)
    },
    handleEnable(row, status) {
      modifyUser({ id: row.id, deleteStatus: status }).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getUserList()
      })
    },
    ticketLog(id) {
      const _this = this.$refs['logForm']
      _this.dialogFormVisible = true
      _this.listQuery.id = id
    }
  }
}
</script>
