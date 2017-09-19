<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			 <el-button v-for='item in classList' @click="getList()" :type="item.label" :key="item.label" style="margin-bottom: 15px;width:89px;">{{item.label}}</el-button>
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
                    <router-link to="/">{{item.specialTopicName}}</router-link>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="ui-number">
                    <router-link to="/">{{item.scoreRate}}</router-link>
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
          <!-- <div class="ui-course">
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
          </div> -->
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
				<!-- <div class="wrap">
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
		  	</div> -->
		  </el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { teacherTop } from 'api/index';
  import { gradeList } from 'utils/data'
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
  	data() {
  		return {
  			name: '',
  			classList: [],
        list: [{
          data: [],
          title: [],
          right: []
        }],
  			specialList: [],
  			qualityList: [],
  			testList: [],
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
        ]
  		}
  	},
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    created() {
      let grade_list = gradeList('all');
      for(var i=0; i<grade_list.length; i++){
        for(var o=0; o<grade_list[i].options.length; o++){
          this.classList.push(grade_list[i].options[o])
        }
      };
    },
  	mounted() {
      this.initChart();
  		this.getList();
  	},
  	methods: {
  		getList() {
        teacherTop(2).then(res => {
          var data = res.data.data;
          this.list.data = data.data;
          this.list.title = data.title;
        	this.setOption();

          this.specialList = data.left;
          this.qualityList = [];
          for(var item in data.right){
            this.qualityList.push({
              name: data.right[item].split(':')[0],
              number: data.right[item].split(':')[1]
            })
          };

        });
      },
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
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
              data: _that.list.data
            }
          ]
        })
		  }
  	}
  }
</script>