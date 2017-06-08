<template>
	<div class="instructor-wrap">
		<div class="text-center" style="margin-bottom: 20px;">
			<el-button v-for='item in classList' type="info" :key="item">{{item}}</el-button>
		</div>
		<div class="echarts-wrap">
			<div class="chart" id="chart" style="height:600px;width:70%"></div>
		</div>
	</div>
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
    	data() {
    		return {
    			name: '',
    			classList: ['七年级', '八年级', '九年级', '高一', '高二', '高三'],
    			specialList: ['语言积累20%', '语言运用30%', '非连阅读35%', '名著阅读70%', '诗歌阅读50', '文言文阅读60%', '议论文阅读55%', '说明文阅读58%', '文学阅读50%', '写作60%'],
    			qualityList: ['得分率60%', '超均率1%', '优良率', '及格率70%', '低分率1%'],
    			testList: ['识记80%', '理解75%', '表达运用76%', '分析综合55%', '鉴赏评价50%', '探究创新50%'],
    			examinationList: [
    				{ name: '考试1' },
    				{ name: '考试2' },
    				{ name: '考试3' }
    			]
    		}
    	},
    	mounted() {
    		this.initChart();
    	},
    	methods: {
    		// 最近一次打开
    		examinationActive(index) {
    			if(index == 0){
    				return 'finish'
    			}else{
    				return 'wait'
    			}
    		},
    		examinationOpen(item) {
    			console.log(item)
    			if(typeof item.finish == 'undefined'){
    				this.$set(item, "finish", true);
    			} else{
    				item.finish = !item.finish;	
    			}
    		},
    		initChart() {
	          this.chart = echarts.init(document.getElementById('chart'));
	          const xData = (function() {
	            const data = ['得分率', '超均率', '名次', '进步值', '优良率', '名次', '进步值', '及格率', '名次', '进步值', '低分率', '进步值'];
	            return data;
	          }());
	          this.chart.setOption({
	            backgroundColor: '#344b58',
	            title: {
	              text: '所有考试市、区专题得分率监控图',
	              x: 'center',
	              textStyle: {
	                color: '#fff',
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
	              x: '15%',
	              top: '10%',
	              textStyle: {
	                color: '#90979c'
	              },
	              data: ['厦门市', '同安区']
	            },
	            calculable: true,
	            xAxis: [{
	              type: '',
	              triggerEvent: true,
	              axisLine: {
	                lineStyle: {
	                  color: '#fff'
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
	                interval: 0
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
	                  color: '#fff'
	                }
	              },
	              axisTick: {
	                show: false
	              },
	              axisLabel: {
	                interval: 2
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
	                0.5,
	                0.4,
	                0.2,
	                0.5,
	                0.4,
	                0.2,
	                0.5,
	                0.2,
	                0.5
	              ]
	            }, {
	              name: '厦门市',
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
	                0.2,
	                0.8,
	                0.4,
	                0.2,
	                0.8,
	                0.4,
	                0.2,
	                0.4,
	                0.2
	              ]
	            }
	            ]
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