<template>
  <el-dialog :visible.sync="dialogFormVisible" width="60%" >
    <el-form ref="dataForm" :rules="rules" :model="userData" label-position="left" label-width="130px">
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="userData.phoneNumber" placeholder="请设置" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userData.nickname" placeholder="请设置"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="updateData()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { modifyUser } from '@/api/user'

export default {
  data() {
    return {
      userData: {
        id: undefined,
        phoneNumber: undefined,
        nickname: undefined
      },
      dialogFormVisible: false,
      rules: {
        phoneNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
        nickname: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          modifyUser(this.userData).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogFormVisible = false
            this.$emit('getUserList')
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
