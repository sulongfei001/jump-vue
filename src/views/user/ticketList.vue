<template>
  <el-dialog :visible.sync="dialogFormVisible" title="门票记录" width="50%">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="供应商名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门票数量" align="center">
        <template slot-scope="{row,$index}">
          <el-input v-if="showEdit[$index]" v-model="row.num"/>
          <span v-if="!showEdit[$index]">{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" class-name="small-padding fixed-width" fixed="right" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="showBtn[$index]" type="primary" size="small" @click="handleUpdate($index, row)">更新</el-button>
          <el-button v-if="showBtn[$index]" type="primary" size="small" @click="handleCancel($index, row)">取消</el-button>
          <el-button v-if="!showBtn[$index]" type="primary" size="small" @click="handleEdit($index, row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-dialog>
</template>

<script>
import { fetchTicketList, modifyTicket } from '@/api/user'

export default {
  data() {
    return {
      showEdit: [],
      showBtn: [],
      tableKey: 0,
      listCopy: null,
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      userId: null
    }
  },
  watch: {
    userId(newVal) {
      this.initData()
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      fetchTicketList({ userId: this.userId }).then(response => {
        this.list = response.data
        this.listCopy = JSON.parse(JSON.stringify(this.list))
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      // this.showEdit[index] = true
      // this.showBtn[index] = true
      this.$set(this.showEdit, index, true)
      this.$set(this.showBtn, index, true)
    },
    // 取消编辑
    handleCancel(index, row) {
      this.list[index].num = this.listCopy[index].num
      // this.showEdit[index] = false
      // this.showBtn[index] = false
      this.$set(this.showEdit, index, false)
      this.$set(this.showBtn, index, false)
    },
    // 点击更新
    handleUpdate(index, row) {
      const data = {
        userId: this.userId,
        remoteClubId: row.remoteClubId,
        num: row.num
      }
      modifyTicket(data).then(response => {
        this.listCopy[index].num = this.list[index].num
        // this.showEdit[index] = false
        // this.showBtn[index] = false
        this.$set(this.showEdit, index, false)
        this.$set(this.showBtn, index, false)
      })
    }
  }
}
</script>

