<template>
  <div class="app-cotainer">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width:100%;">
      <el-table-column label="键" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column label="值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template>
      <el-dialog :visible.sync="dialogFormVisible" title="编辑" >
        <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="130px">
          <el-form-item label="键" prop="key">
            <el-input v-model="formData.key" :disabled="true" placeholder="请设置" />
          </el-form-item>
          <el-form-item label="值" prop="value">
            <el-input v-model="formData.value" placeholder="请设置" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" :disabled="true" placeholder="请设置" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateData">确认</el-button>
        </div>
      </el-dialog>
    </template>

  </div>
</template>

<script>
import { fetchSysConfig, updateSysConfig } from '@/api/system'

export default {
  data() {
    return {
      dialogFormVisible: undefined,
      tableKey: 0,
      list: null,
      formData: {
        id: undefined,
        key: undefined,
        value: undefined,
        remark: undefined
      },
      listLoading: false,
      rules: {
        key: [{ required: true, message: '不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getSysConfig()
  },
  methods: {
    getSysConfig() {
      this.listLoading = true
      fetchSysConfig().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.formData = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateSysConfig(this.formData).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getSysConfig()
            this.dialogFormVisible = false
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
            this.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>

