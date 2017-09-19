<template>
  <div class="echarts-wrap ui-echart-wrap">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import { getPaperSchoolPassRateSpecialTopic } from 'api/special'
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
    data() {
      return {
        chart: '',
        list: {
          data: [],
          right: [],
          title: []
        },
        titleText: [],
        listQuery: {
          paperId: 2
        }
      }
    },
    created() {
      console.log(this.$route)
    },
    mounted() {
      this.initChart();
      this.getList();
    },
    methods: {
      getList() {
        getPaperSchoolPassRateSpecialTopic(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.right = data.right.split(',');
          this.list.data = data.data;
          for(var item in data.title){
            this.titleText.push(item);
          }
          this.list.title = this.titleText;

          this.setOption();
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
        this.chart.setOption({
          title: {
            text: '优良率',
            x: 'center',
            textStyle: {
              color: '#333',
              fontSize: '20',
            },
            padding: [20, 0, 0, 0]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            orient: 'vertical',
            bottom: '20%',
            right: '1%',
            textStyle: {
              color: '#90979c'
            },
            data: _that.list.right
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            nameRotate: 50,
            data: _that.list.title
          }],
          yAxis: [{
            type: 'value'
          }],
          dataZoom: [{
            show: true,
            bottom: 15,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          }, {
            type: 'inside',
            show: true,
          }],
          series: [{
            name: 'data',
            type: 'bar',
            barMaxWidth: 60,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop'
                }
              }
            },
            data: _that.list.data
          }]
        })
      },
      rangeChange(value) {
        if(value == '学校') {
          this.showSchool = false
        }else {
          this.showSchool = true
        }
      },
      schoolChange(value) {
        console.log(value)
      },
      onSearch() {

      }
    }
  }
</script>
