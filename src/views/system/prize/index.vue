<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="data" label-position="left" label-width="130px">
      <el-form-item label="选择门店" prop="remoteClubId">
        <el-select v-model="data.remoteClubId" placeholder="选择门店" >
          <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
        </el-select>
      </el-form-item>
      <el-row v-for="(item,i) in data.prizeList" :gutter="24" :key="i" type="flex">
        <el-col :span="8">
          <el-form-item label="选择商品">
            <el-select v-model="data.prizeList[i].remoteGoodsId" placeholder="选择商品" >
              <el-option v-for="(item,index) in goodsList" :key="index" :label="item.goodsName" :value="item.remoteGoodsId"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设置数量" >
            <el-input v-model="data.prizeList[i].goodsNum" placeholder="请设置"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createDom()">添加名次</el-button>
      <el-button type="primary" @click="createData()">确认提交</el-button>
    </div>
  </div>
</template>

<script>
import { fetchLocalGoodsByClubId } from '@/api/goods'
import { fetchClubAll } from '@/api/club'
import { createRankPrize } from '@/api/prize'

export default {
  inject: ['reload'],
  data() {
    return {
      data: {
        remoteClubId: undefined,
        prizeList: []
      },
      clubList: [],
      goodsList: [],
      rules: {
        remoteClubId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'data.remoteClubId'(newVal) {
      this.getGoodsAll()
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    this.getClubList()
  },
  methods: {
    getGoodsAll() {
      const remoteClubId = this.data.remoteClubId
      fetchLocalGoodsByClubId({ remoteClubId }).then(response => {
        this.goodsList = response.data
      })
    },
    getClubList() {
      fetchClubAll({}).then(response => {
        this.clubList = response.data
      })
    },
    createDom() {
      this.data.prizeList.push({ remoteGoodsId: undefined, goodsNum: 0 })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将覆盖此门店奖励，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            createRankPrize(this.data).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.reload()
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
          }).catch(() => {})
        }
      })
    }
  }
}
</script>
