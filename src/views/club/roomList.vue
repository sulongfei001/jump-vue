<template>
  <el-dialog :visible.sync="dialogFormVisible" :title="clubTitle" width="80%" class="room-dialog">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="开始时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截至时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hidden ? 'danger' : 'success'">{{ scope.row.hidden ? '隐藏' : '显示' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品名字" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品个数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门票数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大奖概率(%)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeProbability }}</span>
        </template>
      </el-table-column>
      <el-table-column label="溢价比例(%)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.premiumProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖人数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prizeCount }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="initData"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="saveSort()">排序</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchSimpleRoomList, sortSimpleRoom } from '@/api/room'
import Pagination from '@/components/Pagination'
import Sortable from 'sortablejs'

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        remoteClubId: 0,
        page: 1,
        pageSize: 10
      },
      clubId: undefined,
      clubTitle: undefined,
      dialogFormVisible: false
    }
  },
  watch: {
    clubId(newVal) {
      this.listQuery.remoteClubId = newVal
      this.initData()
    }
  },
  updated() {
    this.setSort()
  },
  methods: {
    initData() {
      this.listLoading = true
      fetchSimpleRoomList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    saveSort() {
      this.$confirm('确定这么排吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const array = []
        this.list.forEach((v, i) => {
          const sortSeq = {}
          sortSeq.id = v.id
          sortSeq.sequence = i
          array.push(sortSeq)
        })
        sortSimpleRoom(array).then(response => {
        }).catch(() => {})
      }).catch(() => {})
    },
    setSort() {
      const el = document.querySelectorAll('.room-dialog .el-dialog .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer, dragEl) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>

