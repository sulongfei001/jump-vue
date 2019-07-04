<template>
  <el-dialog :title="clubTitle" :visible.sync="dialogFormVisible">
    <el-row v-for="(item,i) in prizeList" :key="i">
      <el-col :span="4"><label>商品名称</label></el-col>
      <el-col :span="6">
        <el-select v-model=" prizeList[i].remoteGoodsId" :disabled="true" >
          <el-option v-for="(item,index) in goodsList" :key="index" :label="item.goodsName" :value="item.remoteGoodsId"/>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="2"><label>商品数量</label></el-col>
      <el-col :span="6">
        <el-input v-model="prizeList[i].goodsNum" :disabled="true" />
      </el-col>
    </el-row>
    <el-row v-if="prizeList.length === 0">
      <el-col class="emp-msg">暂无配置</el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchLocalGoodsByClubId } from '@/api/goods'
import { rankPrizeList } from '@/api/prize'

export default {
  data() {
    return {
      clubId: undefined,
      clubTitle: undefined,
      dialogFormVisible: false,
      prizeList: [],
      goodsList: []
    }
  },
  watch: {
    clubId(newVal) {
      this.initData(newVal)
    }
  },
  methods: {
    initData(clubId) {
      this.prizeList = []
      fetchLocalGoodsByClubId({ clubId }).then(response => {
        this.goodsList = response.data
      })
      rankPrizeList(clubId).then(response => {
        this.prizeList = response.data.prizeList
      })
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .emp-msg {
    text-align: center;
    font-size: x-large;
  }
</style>
