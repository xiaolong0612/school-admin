<template>
  <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  import { getSchoolSpecialTopicBySubjectAndPeriod } from 'api/ability'
  export default {
    data() {
      return {
        chart: '',
        list: {
          data: [],
          title: [],
          right: []
        },
        listQuery: {
          period: '2017',
          subject: '语文'
        }
      }
    },
    mounted() {
      this.initChart();
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        getSchoolSpecialTopicBySubjectAndPeriod(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.data = data.data[0].split(',');
          this.list.right = data.right;
          for(var item in data.title){
            this.list.title.push(item);
          }
          // this.list.right = data.right;
          this.setOption();
          this.listLoading = false;
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'),'macarons');
      },
      setOption() {
        var _that = this;
        console.log(_that.list)
        this.chart.setOption({
          title: {
            text: '所有和最近考试市、区学科能力发展监控表',
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
            bottom: '25%',
            right: '0',
            data: _that.list.right
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333'
              }
            },
            data: _that.list.title
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              interval: 2,
              textStyle: {
                color: '#333'
              }
            }
          }],
          series: [{
            name: '厦门市平均',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: _that.list.data,
            markLine: {
            	silent: false
            }
          }]
        })
      },
      addChartClick() {
        this.chart.on('click', params => {
          if(params.componentType === "xAxis") {
            console.log('我点击 的x轴');
          }
          // console.log(this.link[params.seriesName])
          this.$router.push({ path: '/ability/school'});
        })
      }
    }
  }
</script>
