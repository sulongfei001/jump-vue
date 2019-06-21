<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.remoteClubId" placeholder="选择门店" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="synchClubData">同步</el-button>
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
      <el-table-column label="商品图片" width="140" align="center">
        <template slot-scope="scope">
          <span><img :src="scope.row.goodsPicture" width="120" height="100"></span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" align="center">
        <template slot-scope="scope">
          <span>{{ getGoodsType(scope.row.goodsType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用库存" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remainNum }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getGoodsList" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchLocalGoodsList, synchronizeGoods } from '@/api/goods'
import { fetchClubAll } from '@/api/club'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

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
  computed: {
    ...mapGetters([
      'goodsTypeOptions'
    ])
  },
  created() {
    this.getGoodsList()
    this.getClubAll()
  },
  methods: {
    getGoodsType(type) {
      return this.goodsTypeOptions.filter(o => o.type === type)[0].value
    },
    getGoodsList() { // 商品列表
      this.listLoading = true
      fetchLocalGoodsList(this.listQuery).then(response => {
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
      this.getGoodsList()
    },
    synchClubData() {
      this.listLoading = true
      synchronizeGoods().then(response => {
        this.listLoading = false
        this.$message({
          type: 'success',
          message: '同步成功，请手动刷新列表'
        })
      }).catch(() => {
        this.listLoading = false
        this.$message({
          type: 'error',
          message: '同步失败'
        })
      })
    }
  }
}
</script>
