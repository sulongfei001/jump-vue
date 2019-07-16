<template>
  <el-dialog :visible.sync="dialogFormVisible" width="60%" >
    <el-form ref="dataForm" :rules="rules" :model="goodsData" label-position="left" label-width="130px">
      <el-form-item label="商品详情" prop="goodsText">
        <el-input v-model="goodsData.goodsText" type="textarea" autosize placeholder="请设置" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="updateData()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateLocalGoods } from '@/api/goods'

export default {
  data() {
    return {
      goodsData: {
        id: undefined,
        goodsText: undefined
      },
      dialogFormVisible: false,
      rules: {}
    }
  },
  methods: {
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateLocalGoods(this.goodsData).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogFormVisible = false
            this.$emit('getGoodsList')
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
