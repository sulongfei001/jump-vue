<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="roomData" label-position="left" label-width="130px">
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker v-model="roomData.startTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" type="datetime"/>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="roomData.endTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" type="datetime"/>
      </el-form-item>
      <el-form-item label="是否隐藏" prop="hidden">
        <el-radio-group v-model="roomData.hidden" placeholder="请选择">
          <el-radio v-for="(item,index) in roomStatusOptions" :key="index" :label="item.key">{{ item.value }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择门店" prop="remoteClubId">
        <el-select v-model="roomData.remoteClubId" placeholder="选择商品" >
          <el-option v-for="(item,index) in clubList" :key="index" :label="item.supplierName" :value="item.remoteClubId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="remoteGoodsId">
        <el-select v-model="roomData.remoteGoodsId" placeholder="选择商品" >
          <el-option v-for="(item,index) in goodsList" :key="index" :label="item.goodsName" :value="item.remoteGoodsId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="roomData.goodsName" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="商品个数" prop="goodsNum">
        <el-input v-model.number="roomData.goodsNum" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="商品价格" prop="goodsPrice">
        <el-input v-model="roomData.goodsPrice" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="门票数量" prop="ticketNum">
        <el-input v-model.number="roomData.ticketNum" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="文本说明" prop="goodsText">
        <el-input v-model="roomData.goodsText" type="textarea" placeholder="请设置"/>
      </el-form-item>
      <el-form-item label="大奖概率" prop="prizeProbability">
        <el-slider v-model="roomData.prizeProbability" :format-tooltip="formatTooltip" :max="100" show-input />
      </el-form-item>
      <el-form-item label="溢价比例" prop="premiumProportion">
        <el-slider v-model="roomData.premiumProportion" :format-tooltip="formatTooltip" :max="300" show-input />
      </el-form-item>
      <el-form-item label="商品图片" prop="goodsPicture">
        <div style="margin-bottom: 20px">
          <Upload v-model="roomData.goodsPicture"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片1" prop="picture1">
        <div style="margin-bottom: 20px">
          <Upload v-model="roomData.picture1"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片2" prop="picture2">
        <div style="margin-bottom: 20px">
          <Upload v-model="roomData.picture2"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片3" prop="picture3">
        <div style="margin-bottom: 20px">
          <Upload v-model="roomData.picture3"/>
        </div>
      </el-form-item>
      <el-form-item label="介绍图片4" prop="picture4">
        <div style="margin-bottom: 20px">
          <Upload v-model="roomData.picture4"/>
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
import { fetchLocalGoodsByClubId } from '@/api/goods'
import { fetchClubAll } from '@/api/club'
import { createRoom, updateRoom, getRoomInfo } from '@/api/room'
import Upload from '@/components/Upload/singleImage3'

export default {
  components: { Upload },
  data() {
    return {
      dialogStatus: undefined,
      roomData: {
        id: undefined,
        remoteClubId: undefined,
        startTime: undefined,
        endTime: undefined,
        hidden: true,
        remoteGoodsId: undefined,
        goodsName: undefined,
        goodsNum: undefined,
        goodsPrice: undefined,
        ticketNum: undefined,
        goodsText: undefined,
        prizeProbability: 45,
        premiumProportion: 160,
        goodsPicture: undefined,
        picture1: undefined,
        picture2: undefined,
        picture3: undefined,
        picture4: undefined
      },
      goodsList: [],
      clubList: [],
      roomStatusOptions: [
        { key: true, value: '隐藏' },
        { key: false, value: '显示' }
      ],
      rules: {
        startTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        hidden: [{ required: true, message: '不能为空', trigger: 'blur' }],
        remoteClubId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        remoteGoodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsNum: [{ required: true, message: '不能为空', trigger: 'blur' }, { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        goodsPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
        ticketNum: [{ required: true, message: '不能为空', trigger: 'blur' }, { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        goodsText: [{ required: true, message: '不能为空' }],
        prizeProbability: [{ required: true, message: '不能为空', trigger: 'blur' }],
        premiumProportion: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsPicture: [{ required: true, message: '不能为空' }]
      }
    }
  },
  watch: {
    'roomData.remoteClubId'(newVal) {
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
        const params = {}
        params.id = requestParams.id
        getRoomInfo(params).then((response) => {
          this.roomData = response.data
        })
      }
    },
    getGoodsAll() {
      const remoteClubId = this.roomData.remoteClubId
      fetchLocalGoodsByClubId({ remoteClubId }).then(response => {
        this.goodsList = response.data
      })
    },
    getClubList() {
      fetchClubAll({}).then(response => {
        this.clubList = response.data
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
          console.log(this.roomData)
          createRoom(this.roomData).then(() => {
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
          console.log(this.roomData)
          updateRoom(this.roomData).then(() => {
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
