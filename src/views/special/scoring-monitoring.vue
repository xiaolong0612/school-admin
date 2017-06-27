<template>
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
    export default {
      data() {
        return {
          chart: '',
          link: {
          	语言积累: 'http://www.baidu.com',
          	语言运用: 'http://www.yuyan.com',
          	非连文本阅读: 'http://www.lal.com',
          	名著阅读: 'http://www.baidu.com',
          	诗歌阅读: 'http://www.baidu.com',
          	文言文阅读: 'http://www.baidu.com',
          	议论文阅读: 'http://www.baidu.com',
          	文学作品阅读: 'http://www.baidu.com',
          	作文: 'http://www.baidu.com',
          	全卷: 'http://www.baidu.com'
          }
        }
      },
      mounted() {
        this.initChart();
      },
      methods: {
        initChart() {
          this.chart = echarts.init(document.getElementById('chart'));
          const xData = (function() {
            const data = ['八上', '八下', '九上', '九下'];
            return data;
          }());
          this.chart.setOption({
            title: {
              text: '所有考试市、区专题得分率监控图',
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
                color: '#333'
              }
            },
            legend: {
              bottom: '25%',
              orient: 'vertical',
              right: 'right',
              textStyle: {
                color: '#333'
              },
              itemGap: 20,
              data: ['语言积累', '语言运用', '非连文本阅读', '名著阅读', '诗歌阅读', '文言文阅读', '议论文阅读', '文学作品阅读', '作文', '全卷'],
              selected: {
              	'语言积累': true,
              	'语言运用': true,
              	'非连文本阅读': true,
              	'名著阅读': true,
              	'诗歌阅读': false,
              	'文言文阅读': false,
              	'议论文阅读': false,
              	'文学作品阅读': false,
              	'作文': false,
              	'全卷': false
              }
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
            dataZoom: [{
              show: true,
              height: 30,
              xAxisIndex: [
                0
              ],
              bottom: 30,
              start: 10,
              end: 80,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#d3dee5'

              },
              textStyle: {
                color: '#fff' },
              borderColor: '#90979c'


            }, {
              type: 'inside',
              show: true,
              height: 15,
              start: 1,
              end: 35
            }],
            series: [{
              name: '语言积累',
              type: 'line',
              stack: '语言积累',
              barMaxWidth: 35,
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
              name: '语言运用',
              type: 'line',
              stack: '语言运用',
              barMaxWidth: 35,
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
              name: '非连文本阅读',
              type: 'line',
              stack: '非连文本阅读',
              symbolSize: 10,
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
              name: '名著阅读',
              type: 'line',
              stack: '名著阅读',
              symbolSize: 10,
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
            }, {
              name: '诗歌阅读',
              type: 'line',
              stack: '诗歌阅读',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(252,30,48,1)',
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
                1.1,
                0.7,
                0.4,
                0.3
              ]
            }, {
              name: '文言文阅读',
              type: 'line',
              stack: '文言文阅读',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(122,230,148,1)',
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
                0.6,
                0.5,
                0.2
              ]
            }, {
              name: '议论文阅读',
              type: 'line',
              stack: '议论文阅读',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(52,23,48,1)',
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
                0.5,
                0.2,
                0.3,
                0.3
              ]
            }, {
              name: '文学作品阅读',
              type: 'line',
              stack: '文学作品阅读',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(122,200,50,1)',
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
                0.3,
                0.4,
                0.6
              ]
            }, {
              name: '作文',
              type: 'line',
              stack: '作文',
              symbolSize: 10,
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
                0.1,
                0.3,
                0.6,
                0.7
              ]
            }, {
              name: '全卷',
              type: 'line',
              stack: '全卷',
              symbolSize: 10,
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
                1.2,
                1,
                0.9,
                0.4
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
				this.$router.push({ path: '/special/scoring-item'});
			})
        }
      }
    }
</script>
