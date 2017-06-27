<template>
	<div class="chart" :id="id" style="height:300px;width:100%"></div>
</template>

<script>
  import { mapGetters } from 'vuex';
   // 引入 ECharts 主模块
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/dataZoom');
  export default {
    props: {
      id: {
        type: String,
        default: 'chart'
      }
    },
  	data() {
  		return {
  			name: '',
  			subjectList: [{
          value: '1',
          label: '语文'
        }, {
          value: '2',
          label: '数学'
        }, {
          value: '3',
          label: '英语'
        }, {
          value: '4',
          label: '物理'
        }, {
          value: '5',
          label: '化学'
        }, {
          value: '5',
          label: '地理'
        }, {
          value: '5',
          label: '历史'
        }, {
          value: '5',
          label: '生物'
        }, {
          value: '5',
          label: '思品'
        }]
  		}
  	},
  	mounted() {
  		this.initChart();
  	},
  	methods: {
  		initChart() {
        this.chart = echarts.init(document.getElementById(this.id));
        this.setOption();
			},
    	setOption() {
        let _this = this;
        this.chart.setOption({
          title: {
            text: '同安一中初中2018届Xxx八上市质检质量图（最近考试）',
            x: 'center',
            textStyle: {
              color: '#333',
              fontSize: '16',
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
              show: true
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
            data: ['七上', '七下', '八上', '八下', '九上', '九下']
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
          series: [
          {
            name: '同安区',
            type: 'bar',
            stack: '语言运用',
            itemStyle: {
              normal: {
                color: 'rgb(38, 118, 213)',
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
              0.5,
              0.4,
              0.2
            ]
          }]
        })
      }
  	}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.ui-left-wrap,.ui-right-wrap{
		width: 120px;
		li{
			margin-bottom: 6px;
		}
	}
	.chart{
		margin: 0 auto;
	}
</style>