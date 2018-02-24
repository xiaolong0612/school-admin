<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">
        <el-form-item label="届">
          <el-select v-model="listQuery.period" clearable placeholder="请选择" @change="getList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" clearable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
		</div>
		<div>
		<el-row :gutter="15">
      <el-col :span="0">
      </el-col>
		  <el-col :span="24">
		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
					<chart height='calc(100vh - 265px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
				</div>
		  </el-col>
		  <el-col :span="0">
		  </el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getAllPeriod } from 'api/list';
  import { attrPeriod, attrGrade } from 'utils/auth';
  import { principalIndex } from 'api/index';
  import { gradeList } from 'utils/data'
  import chart from '@/components/Charts/chart';
  export default {
    components: { chart },
  	data() {
  		return {
  			name: '',
  			gradeList: [],
        subjectList: [],
        list: [{
          data: [],
          title: [],
          right: []
        }],
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
  			testList: [],
  			examinationList: [
  				{ name: '考试1' },
  				{ name: '考试2' },
  				{ name: '考试3' }
  			],
        data:[],
        listQuery: {
          grade: '',
          period: ''
        }
  		}
  	},
    computed: {
      ...mapGetters([
        'uid',
        'user'
      ])
    },
    created() {
    },
  	mounted() {
  		this.getAllPeriod();
  	},
  	methods: {
      setDefault(){
        this.gradeList = this.user.grade.split(',');
        this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        this.getList();
      },
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
  		getList() {
        principalIndex(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
            this.chart[i] = {
              name: '',
              data: [],
              X: [],
              legend: [],
              series: [],
              setOption: {}
            }
            this.setOption();
            return;
          };
          // this.$message.success('查询成功！');
          var data = res.data;
          this.chart.name = '';
          this.chart.X = [];
          for(let index in data.title){
            this.chart.X.push(index);
          }
          this.x_id = data.title;
          this.chart.series = [];
          for(let d in data.data){
            this.chart.series.push({
              name: d,
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
              data: data.data[d]
            })
          }
          this.chart.legend = data.right;
            
          // }
          this.setOption();

        });
      },
      setOption() {
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
            start: 0,
            end: 100,
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