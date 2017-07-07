<template>
  <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
    data() {
      return {
        chart: ''
      }
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'),'macarons');
        this.setOption();
        this.addChartClick();
      },
      setOption() {
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
            data: ['厦门市平均', '同安区平均', '厦门市七上', '同安区七上']
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
            data: ['识记', '理解', '表达运用', '综合分析']
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
            data: [ 0.5, 0.3, 0.6, 0.7 ],
            markLine: {
            	silent: false
            }
          },
          {
            name: '同安区平均',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [ 0.2, 0.4, 0.2, 0.5 ]
          }, {
            name: '厦门市七上',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [0.6, 0.8, 0.4, 0.2]
          }, {
            name: '同安区七上',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [ 0.7, 1, 0.4, 0.5]
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
