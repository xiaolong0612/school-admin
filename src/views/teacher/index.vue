<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-button v-for='item in classList' type="info" :key="item"  style="margin-bottom: 15px;width:90px;">{{item}}</el-button>
		</div>
		<div>
		<el-row :gutter="15">
		  <el-col :span="16">
		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
					<div class="chart" id="chart" style="height:600px;width:100%"></div>
				</div>
		  </el-col>
		  <el-col :span="4">
		  	<div class="wrap">
					<ul>
						<li v-for="item in specialList">
							<el-row class="ui-sidebar">
							  <el-col :span="12">
							  	<div class="ui-label">
							  		<router-link to="/">{{item.name}}</router-link>
							  	</div>
							  </el-col>
							  <el-col :span="12">
							  	<div class="ui-number">
							  		<router-link to="/">{{item.number}}</router-link>
							  	</div>
							  </el-col>
							</el-row>
						</li>
					</ul>
		  	</div>
		  </el-col>
		  <el-col :span="4">
		  	<div class="wrap" style="margin-bottom: 15px">
		  		<ul>
						<li v-for="item in qualityList">
							<el-row class="ui-sidebar">
							  <el-col :span="12">
							  	<div class="ui-label">
							  		<router-link to="/">{{item.name}}</router-link>
							  	</div>
							  </el-col>
							  <el-col :span="12">
							  	<div class="ui-number">
							  		<router-link to="/">{{item.number}}</router-link>
							  	</div>
							  </el-col>
							</el-row>
						</li>
					</ul>
				</div>
				<div class="wrap">
					<ul>
						<li v-for="item in testList">
							<el-row class="ui-sidebar">
							  <el-col :span="12">
							  	<div class="ui-label">
							  		<router-link to="/">{{item.name}}</router-link>
							  	</div>
							  </el-col>
							  <el-col :span="12">
							  	<div class="ui-number">
							  		<router-link to="/">{{item.number}}</router-link>
							  	</div>
							  </el-col>
							</el-row>
						</li>
					</ul>
		  	</div>
		  </el-col>
		</el-row>
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
  			specialList: [
    			{name: '语言积累', number: '0%'},
    			{name: '语言运用', number: '0%'},
    			{name: '非连阅读', number: '5%'},
    			{name: '名著阅读', number: '0%'},
    			{name: '诗歌阅读', number: '50%'},
    			{name: '文言文阅读', number: '0%'},
    			{name: '议论文阅读', number: '5%'},
    			{name: '说明文阅读', number: '8%'},
    			{name: '文学阅读', number: '50%'},
    			{name: '写作', number: '60%'}
  			],
  			qualityList: [
  				{name: '得分率', number: '60%'},
  				{name: '超均率', number: '1%'},
  				{name: '优良率', number: '20%'},
  				{name: '及格率', number: '36%'},
  				{name: '低分率', number: '77%'}],
  			testList: [
  				{name: '识记', number: '80%'},
  				{name: '理解', number: '75%'},
  				{name: '表达运用', number: '76%'},
  				{name: '分析综合', number: '55%'},
  				{name: '鉴赏评价', number: '50%'},
  				{name: '探究创新', number: '50%'}
  			]
  		}
  	},
  	mounted() {
  		this.initChart();
  	},
  	methods: {
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'));
        this.setOption();
      },
      setOption() { 
        const xData = (function() {
          const data = ['得分率', '超均率', '名次', '进步值', '优良率', '名次', '进步值', '及格率', '名次', '进步值', '低分率', '进步值'];
          return data;
        }());
        this.chart.setOption({
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