<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="goodsData" label-position="left" label-width="130px">
      <el-form-item label="选择门店" prop="remoteClubId">
        <el-select v-model="goodsData.remoteClubId" placeholder="选择商品" >
          <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="remoteGoodsId">
        <el-select v-model="goodsData.remoteGoodsId" placeholder="选择商品" >
          <el-option v-for="(item,index) in goodsList" :key="index" :label="item.goodsName" :value="item.remoteGoodsId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="goodsData.goodsName" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="商品个数" prop="goodsNum">
        <el-input v-model.number="goodsData.goodsNum" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="商品价格" prop="goodsPrice">
        <el-input v-model="goodsData.goodsPrice" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="大奖概率" prop="prizeProbability">
        <el-slider v-model="goodsData.prizeProbability" :format-tooltip="formatTooltip" :max="100" show-input />
      </el-form-item>
      <el-form-item label="溢价比例" prop="premiumProportion">
        <el-slider v-model="goodsData.premiumProportion" :format-tooltip="formatTooltip" :max="300" show-input />
      </el-form-item>
      <el-form-item label="文本说明" prop="goodsText">
        <el-input v-model="goodsData.goodsText" type="textarea" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="商品图片" prop="goodsPicture">
        <div style="margin-bottom: 20px">
          <Upload v-model="goodsData.goodsPicture"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片1" prop="picture1">
        <div style="margin-bottom: 20px">
          <Upload v-model="goodsData.picture1"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片2" prop="picture2">
        <div style="margin-bottom: 20px">
          <Upload v-model="goodsData.picture2"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片3" prop="picture3">
        <div style="margin-bottom: 20px">
          <Upload v-model="goodsData.picture3"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片4" prop="picture4">
        <div style="margin-bottom: 20px">
          <Upload v-model="goodsData.picture4"/>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goBack()">取消</el-button>
      <el-button type="primary" @click="dialogStatus === 'create'?createData():updateData()">确认</el-button>
    </div>
  </div>
</template>

<script>
import { fetchClubAll } from '@/api/club'
import { fetchLocalGoodsByClubId, createSpreadGoods, getSpreadGoodsInfo, updateSpreadGoods } from '@/api/goods'
import Upload from '@/components/Upload/singleImage3'

export default {
  components: { Upload },
  data() {
    return {
      dialogStatus: undefined,
      goodsData: {
        id: undefined,
        remoteClubId: undefined,
        remoteGoodsId: undefined,
        goodsName: undefined,
        goodsNum: undefined,
        goodsPrice: undefined,
        prizeProbability: 45,
        premiumProportion: 160,
        goodsText: undefined,
        goodsPicture: undefined,
        picture1: undefined,
        picture2: undefined,
        picture3: undefined,
        picture4: undefined
      },
      goodsList: [],
      clubList: [],
      rules: {
        remoteClubId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        remoteGoodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsNum: [{ required: true, message: '不能为空', trigger: 'blur' }, { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        goodsPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
        prizeProbability: [{ required: true, message: '不能为空', trigger: 'blur' }],
        premiumProportion: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsText: [{ required: true, message: '不能为空' }],
        goodsPicture: [{ required: true, message: '不能为空' }]
      }
    }
  },
  watch: {
    'goodsData.remoteClubId'(newVal) {
      this.getGoodsAll()
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    const requestParams = this.$route.params // 获取路由传入的参数
    this.restEvent(requestParams.event)
    this.getClubList()
    this.initData(requestParams)
  },
  methods: {
    initData(requestParams) {
      if (requestParams.id !== '-1') {
        getSpreadGoodsInfo(requestParams.id).then((response) => {
          this.goodsData = response.data
          console.log(this.goodsData)
        })
      }
    },
    getClubList() {
      fetchClubAll({}).then(response => {
        this.clubList = response.data
      })
    },
    getGoodsAll() {
      const remoteClubId = this.goodsData.remoteClubId
      fetchLocalGoodsByClubId({ remoteClubId }).then(response => {
        this.goodsList = response.data
      })
    },
    goBack() {
      window.history.go(-1) // 回退上一级路由
      this.$store.dispatch('delVisitedView', this.tempRoute) // 关闭当前路由
    },
    restEvent(event) {
      if (event === 'create') {
        this.dialogStatus = 'create'
      } else {
        this.dialogStatus = 'update'
      }
    },
    formatTooltip(val) {
      return val / 100
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createSpreadGoods(this.goodsData).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.goBack()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateSpreadGoods(this.goodsData).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.goBack()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
        }
      })
    }
  }
}
</script>
