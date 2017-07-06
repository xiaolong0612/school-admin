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
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
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
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
        this.setOption();
      },
      setOption() { 
        this.chart.setOption({
          title: {
            text: '所有考试市、区专题得分率监控图',
            x: 'center',
            textStyle: {
              color: '#fff',
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
            bottom: '20%',
            right: '0',
            textStyle: {
              color: '#90979c'
            },
            data: ['厦门市', '同安区']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            data: ['得分率', '超均率', '名次', '进步值', '优良率', '名次', '进步值', '及格率', '名次', '进步值', '低分率', '进步值']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [
          {
            name: '同安区',
            type: 'bar',
            data: [0.2, 0.4, 0.2, 0.5, 0.4, 0.2, 0.5, 0.4, 0.2, 0.5, 0.2, 0.5]
          }, {
            name: '厦门市',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                }
              }
            },
            data: [ 0.6, 0.8, 0.4, 0.2, 0.8, 0.4, 0.2, 0.8, 0.4, 0.2, 0.4, 0.2]
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