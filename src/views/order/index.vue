<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userId" placeholder="用户ID" clearable style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.swOrderId" placeholder="订单号" clearable style="width: 200px;" class="filter-item" />
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
          <span>{{ scope.row.orgId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goods.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品个数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.productNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠送门票" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.swOrderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="150px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.result === 1 ? '' : 'danger'">{{ scope.row.result === 1 ? '已完成' : '待支付' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getOrderList" />
  </div>
</template>

<script>
import { fetchOrderList } from '@/api/order'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 20,
        userId: undefined,
        swOrderId: undefined
      }
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.listLoading = true
      fetchOrderList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() { // 搜索
      this.listQuery.page = 1
      this.getOrderList()
    }
  }
}
</script>
