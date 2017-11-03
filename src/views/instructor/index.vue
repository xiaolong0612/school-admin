<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">  
        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="getList">
            <el-option v-for="item in classList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
                      {{item.specialTopicName}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{item.scoreRate}}
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-col>
  		  <el-col :span="16">
  		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
  					<chart height='calc(100vh - 165px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
  				</div>
  		  </el-col>
  		  <el-col :span="4">
          <div class="wrap" style="margin-bottom: 15px">
            <ul>
              <li v-for="item in qualityList">
                <el-row class="ui-sidebar">
                  <el-col :span="12">
                    <div class="ui-label">
                      {{item.name}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{item.number}}
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
          <div class="wrap" style="margin-bottom: 15px">
            <ul>
              <li v-for="item in level">
                <el-row class="ui-sidebar">
                  <el-col :span="12">
                    <div class="ui-label">
                      {{item.levelName}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{item.scoreRate}}
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
  import { teacherTop } from 'api/index';
  import { gradeList } from 'utils/data';
  import chart from '@/components/Charts/chart';
  export default {
    components: { chart },
  	data() {
  		return {
  			name: '',
  			classList: [],
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
  			specialList: [],
  			qualityList: [],
        level: [],
  			examinationList: [
  				{ name: '考试1' },
  				{ name: '考试2' },
  				{ name: '考试3' }
  			],
        listQuery: {
          id: '',
          grade: ''
        }
  		}
  	},
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    created() {
      let grade_list = gradeList('all');
      for(let i=0; i<grade_list.length; i++){
        for(var o=0; o<grade_list[i].options.length; o++){
          this.classList.push(grade_list[i].options[o]);
        }
      };
      for(let i in this.classList){
        this.$set(this.classList[i], 'select', '');
      }
    },
  	mounted() {
      this.listQuery.id = this.uid;
  		this.getList('七年级');
  	},
  	methods: {
      selectGrade(index){
        for(let i in this.classList){
          if(index == i) this.classList[i].select = 'info';
          else this.classList[i].select = '';
        }
        return this.classList[index].label;
      },
  		getList(grade) {
        this.listQuery.grade = grade;
        teacherTop(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
            for(let i in this.chart){
              this.chart[i] = []
            }
            this.setOption();
            return;
          };
          // this.$message.success('查询成功！');
          var data = res.data.data;
          this.chart.name = data.name;
          this.chart.data = data.data;
          this.chart.X = data.title;
          this.chart.legend = data.right;
            this.chart.series = {
              name: '',
              type: 'bar',
              barMaxWidth: '100',
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
              data: this.chart.data
            }
          // }
        	this.setOption();
          this.specialList = data.left;
          this.level = data.level;
          this.qualityList = [];
          for(var item in data.right){
            this.qualityList.push({
              name: data.right[item].split(':')[0],
              number: data.right[item].split(':')[1]
            })
          };

        });
      },
      setOption() {
        var _that = this;
        this.chart.setOption = {
          title: {
            text: _that.chart.name,
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
          legend: {
            orient: 'vertical',
            bottom: '25%',
            right: '2%',
            data: _that.chart.legend,
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
            data: _that.chart.X
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
          series: _that.chart.series
        }
		  }
  	}
  }
</script>