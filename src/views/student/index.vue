,
,<template>
	<div>
		<!--   -->
		<div>
			<el-row :gutter="15">
			  <el-col :span="24">
			  	<div class="wrap">
						<div class="chart" id="chart" style="height:600px;width:100%"></div>
					</div>
			  </el-col>
			</el-row>
			<div style="height:15px"></div>
			<el-row :gutter="15">
			  <el-col :span="12">
			  	<div class="wrap">
			  		<index-item id="echart_1" />
			  	</div>
			  	<div style="height:15px"></div>
			  	<div class="wrap">
			  		<index-item id="echart_2" />
			  	</div>
			  </el-col>
			  <el-col :span="12">
			  	<div class="wrap">
			  		<index-item id="echart_3" />
			  	</div>
			  	<div style="height:15px"></div>
			  	<div class="wrap">
			  		<index-item id="echart_4" />
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题

  import IndexItem from './index/indexItem';
  export default {
  	components: {
  		IndexItem
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
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
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
              fontSize: '20',
            },
            padding: [25, 0, 0, 0]
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
            right: '20px',
            data: ['厦门市', '同安区']
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
            data: ['语文', '数学', '英语', '物理', '化学', '生物', '思品', '历史', '地理', '总分', '折合总分']
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
          series: [
          {
            name: '同安区',
            type: 'bar',
            stack: '语言运用',
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
            data: [ 0.2, 0.4, 0.2, 0.5, 0.4, 0.2, 0.5, 0.4, 0.2, 0.5, 0.2 ]
          }, {
            name: '厦门市',
            type: 'bar',
            stack: '非连文本阅读',
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
            data: [ 0.6, 0.8, 0.4, 0.2, 0.8,0.4,0.2, 0.8,0.4,0.2,0.4 ]
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