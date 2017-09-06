<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			 <el-button v-for='item in classList' @click="getList()" :type="item" :key="item" style="margin-bottom: 15px;width:90px;">{{item}}</el-button>
		</div>
		<div>
		<el-row :gutter="15">
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
		  <el-col :span="16">
		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
					<div class="chart" id="chart" style="height:600px;width:100%"></div>
          <div class="ui-course">
            <div class="clearfix ui-course_nr">
              <ul class="ui-course_nr2">
                <li>2007
                  <div class="ui-once">
                    <h1>2007</h1>
                    <p>内容描述4</p>
                  </div>
                </li>
                <li>2008
                  <div class="ui-once">
                    <h1>2008</h1>
                    <p>内容描述5</p>
                  </div>
                </li>
                <li>2009
                  <div class="ui-once">
                    <h1>2009</h1>
                    <p>内容描述6</p>
                  </div>
                </li>
                <li>2013
                  <div class="ui-once">
                    <h1>2013</h1>
                    <p>内容描述7</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
  import { fetchList, fetchPv } from 'api/data';
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
  			],
  			examinationList: [
  				{ name: '考试1' },
  				{ name: '考试2' },
  				{ name: '考试3' }
  			],
        data:[
          {
            "list":[
              [0,0,0,0,0.02,0.2],
              [0,0,0,0,0.02,0.2]
            ],
            "name":["七上考试","七上考试","七上考试",],
            "success":true,
            "right":["七上考试","七上考试","七上考试",],
            "title":[
              {"名著阅读":3},
              {"语言运用":1},
              {"非连续性文本阅读":2},
              {"诗歌阅读":4},
              {"文言文阅读":5}
            ]
          }  
        ],
  			data1: null,
  			data2: null,
  			listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        }
  		}
  	},
  	mounted() {
  		this.getList();
  	},
  	methods: {
  		getList() {
        fetchList(this.listQuery).then(response => {
          this.data1 = response.data.list[0].array1;
          this.data2 = response.data.list[1].array1;
        	this.initChart();
        });
      },
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
        this.setOption();
      },
      setOption() {
        const data1 = this.data1;
        const data2 = this.data2;
        this.chart.setOption({
          title: {
            text: '所有考试市、区专题得分率监控图',
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
            right: '0',
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
            data: ['得分率', '超均率', '名次', '进步值', '优良率', '名次', '进步值', '及格率', '名次', '进步值', '低分率', '进步值']
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
            itemStyle: {
              normal: {
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
            data: data2
          }, {
            name: '厦门市',
            type: 'bar',
            itemStyle: {
              nor2al: {
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
            data: data1
          }
          ]
        })
		  }
  	}
  }
</script>