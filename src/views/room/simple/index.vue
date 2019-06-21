<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.remoteClubId" placeholder="选择门店" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <router-link :to="'/room/simple/edit/-1/create'">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit">添加</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="开始时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截至时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hidden ? 'danger' : 'success'">{{ scope.row.hidden ? '隐藏' : '显示' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品名字" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品个数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门票数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大奖概率(%)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeProbability }}</span>
        </template>
      </el-table-column>
      <el-table-column label="溢价比例(%)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.premiumProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <router-link v-permission="'ROLE_ADMIN'" :to="'/room/simple/edit/'+scope.row.id+'/update'">
            <el-button type="primary" size="mini">编辑</el-button>
          </router-link>
          <el-button v-permission="'ROLE_ADMIN'" type="primary" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getRoomList" />

  </div>
</template>

<script>
import { fetchSimpleRoomList, deleteRoom } from '@/api/room'
import { fetchClubAll } from '@/api/club'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  directives: { waves, permission },
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
      fetchSimpleRoomList(this.listQuery).then(response => {
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
    handleDelete(id) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoom(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getRoomList()
        })
      }).catch(() => {})
    },
    handleFilter() { // 搜索
      this.listQuery.page = 1
      this.getRoomList()
    }
  }
}
</script>
