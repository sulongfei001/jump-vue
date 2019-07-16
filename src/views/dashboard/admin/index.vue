<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px;margin-bottom:0px;">
      <el-col :span="2">门店选择：</el-col>
      <el-col :span="22">
        <el-checkbox-group v-model="queryData.remoteClubIds">
          <el-checkbox v-for="(item,index) in clubList" :key="index" :label="item.remoteClubId">{{ item.supplierName }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px;margin-bottom:20px;display:flex;justify-content:center;align-items:center;">
      <el-col :span="2">日期选择：</el-col>
      <el-col :span="20">
        <!-- <el-date-picker v-model="queryData.startTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="起始时间" type="datetime"/>
        至
        <el-date-picker v-model="queryData.endTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="终止时间" type="datetime"/> -->
        <el-date-picker v-model="visitDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </el-col>
      <el-col :span="2">
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getStatisticsData">搜索</el-button>
      </el-col>
    </el-row>
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px;margin-bottom:0px;">
      <bar-chart :chart-data="lineChartData"/>
    </el-row>
  </div>
</template>

<script>
import { getCycleStatistics, getStatistics } from '@/api/dashboard'
import { fetchClubAll } from '@/api/club'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    BarChart
  },
  data() {
    return {
      lineChartData: {
        registerData: [],
        xaxisData: []
      },
      clubList: null,
      visitDate: [],
      queryData: {
        remoteClubIds: [],
        startTime: undefined,
        endTime: undefined
      }
    }
  },
  created() {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const day = nowDate.getDate()
    const befDate = new Date(nowDate.getTime() - 7 * 24 * 3600 * 1000)
    const byear = befDate.getFullYear()
    const bmonth = befDate.getMonth() + 1
    const bday = befDate.getDate()

    // 默认日期赋值
    this.visitDate = [new Date(byear + ', ' + bmonth + ', ' + bday), new Date(year + ', ' + month + ', ' + day)]
    this.getClubAll()
    this.getStatisticsData()
  },
  methods: {
    getClubAll() {
      fetchClubAll().then(response => {
        this.clubList = response.data
      })
    },
    handleSetLineChartData(type) {
      const params = {}
      params.type = type
      getCycleStatistics(params).then(response => {

      })
    },
    getStatisticsData() {
      this.queryData.startTime = this.visitDate[0].getTime()
      this.queryData.endTime = this.visitDate[1].getTime()
      getStatistics(this.queryData).then(response => {
        this.lineChartData.registerData = response.data.registerData
        this.lineChartData.xaxisData = response.data.xaxisData
        console.log(this.lineChartData)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
