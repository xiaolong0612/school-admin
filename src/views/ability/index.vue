<template>
  <div>
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
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
          this.chart = echarts.init(document.getElementById('chart'));
          const xData = (function() {
            const data = ['识记', '理解', '表达运用', '综合分析'];
            return data;
          }());
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
              axisPointer: {
                textStyle: {
                  color: '#fff'
                }
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
              bottom: '25%',
              orient: 'vertical',
              right: 'right',
              textStyle: {
                color: '#90979c'
              },
              data: ['厦门市平均', '同安区平均', '厦门市七上', '同安区七上']
            },
            calculable: true,
            xAxis: [{
              type: '',
              triggerEvent: true,
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: '#333'
                }
              },
              data: xData
            }],
            yAxis: [{
              type: 'value',
              splitLine: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 2,
                textStyle: {
                  color: '#333'
                }
              },
              splitArea: {
                show: false
              }
            }],
            series: [{
              name: '厦门市平均',
              type: 'bar',
              stack: '语言积累',
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: 'rgba(255,144,128,1)',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    position: 'insideTop',
                    formatter(p) {
                      return p.value > 0 ? p.value : '';
                    }
                  }
                }
              },
              data: [
                0.5,
                0.3,
                0.6,
                0.7
              ],
              markLine: {
              	silent: false
              }
            },
            {
              name: '同安区平均',
              type: 'bar',
              stack: '语言运用',
              itemStyle: {
                normal: {
                  color: 'rgba(0,191,183,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : '';
                    }
                  }
                }
              },
              data: [
                0.2,
                0.4,
                0.2,
                0.5
              ]
            }, {
              name: '厦门市七上',
              type: 'bar',
              stack: '非连文本阅读',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(252,230,48,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : '';
                    }
                  }
                }
              },
              data: [
                0.6,
                0.8,
                0.4,
                0.2
              ]
            }, {
              name: '同安区七上',
              type: 'bar',
              stack: '名著阅读',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(152,230,48,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : '';
                    }
                  }
                }
              },
              data: [
                0.7,
                1,
                0.4,
                0.5
              ]
            }
            ]
          }),
			this.chart.on('click', params => {
        // console.log(params);
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
