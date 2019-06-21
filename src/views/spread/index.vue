<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.remoteClubId" placeholder="选择门店" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
      </el-select>
      <el-input v-model="listQuery.goodsName" placeholder="商品名称" clearable style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <router-link v-permission="'ROLE_ADMIN'" :to="'/spread/edit/-1/create'">
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
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="溢价比例(%)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.premiumProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <router-link v-permission="'ROLE_ADMIN'" :to="'/spread/edit/'+scope.row.id+'/update'">
            <el-button type="primary" size="mini">编辑</el-button>
          </router-link>
          <el-button v-permission="'ROLE_ADMIN'" type="primary" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getGoodsList" />

  </div>
</template>

<script>
import { fetchSpreadGoodsList } from '@/api/goods'
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
        goodsName: undefined
      }
    }
  },
  created() {
    this.getGoodsList()
    this.getClubAll()
  },
  methods: {
    getGoodsList() { // 商品列表
      this.listLoading = true
      fetchSpreadGoodsList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        console.log(this.list)
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
      this.getGoodsList()
    }
  }
}
</script>
