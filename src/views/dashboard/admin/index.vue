<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px;margin-bottom:0px;display:flex;justify-content:center;align-items:center;">
      <el-col :span="2">门店选择：</el-col>
      <el-col :span="22">
        <el-checkbox-group v-model="queryData.remoteClubIds">
          <el-checkbox v-for="(item,index) in clubList" :key="index" :label="item.remoteClubId">{{ item.supplierName }}({{ item.remoteClubId }})</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px;margin-bottom:32px;display:flex;justify-content:center;align-items:center;">
      <el-col :span="2">日期选择：</el-col>
      <el-col :span="20">
        <!-- <el-date-picker v-model="queryData.startTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="起始时间" type="datetime"/>
        至
        <el-date-picker v-model="queryData.endTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="终止时间" type="datetime"/> -->
        <el-date-picker v-model="visitDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </el-col>
      <el-col :span="2">
        <el-button style="float:right;" type="primary" icon="el-icon-search" @click="getStatisticsData">统计</el-button>
      </el-col>
    </el-row>
    <panel-group :chart-data="panelData"/>

    <el-row style="background:#fff;padding:16px;margin-bottom:32px;">
      <bar-chart :chart-data="lineChartData"/>
    </el-row>
  </div>
</template>

<script>
import { getStatistics } from '@/api/dashboard'
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
        chargeData: [],
        xaxisData: []
      },
      panelData: {
        registerCount: 0,
        chargeCount: 0,
        chargePeople: 0
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
    const befDate = new Date(nowDate.getTime() - 6 * 24 * 3600 * 1000)
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
    getStatisticsData() {
      this.queryData.startTime = this.visitDate ? this.visitDate[0].getTime() : null
      this.queryData.endTime = this.visitDate ? this.visitDate[1].getTime() : null
      getStatistics(this.queryData).then(response => {
        this.lineChartData.registerData = response.data.registerData
        this.lineChartData.chargeData = response.data.chargeData
        this.lineChartData.xaxisData = response.data.xaxisData
        this.panelData.registerCount = response.data.registerCount
        this.panelData.chargeCount = response.data.chargeCount
        this.panelData.chargePeople = response.data.chargePeople
        console.log(this.panelData)
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
