<template>
  <div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <div class="chart" id="chart" style="height:600px;width:100%"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '优良率',
        screenHeight: 0,
        listQuery: {
          paperId: 7
        },
        listLoading: false,
        list: [],
        series: []
      }
    }
  }
</script>