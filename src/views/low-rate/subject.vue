<template>
	<div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

        <el-form-item label="届">
          <el-select v-model="paperQuery.period" filterable clearable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="paperQuery.grade" filterable clearable placeholder="请选择" @change="queryChange('grade')">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目">
          <el-select v-model="paperQuery.subject" filterable clearable placeholder="请选择" @change="queryChange('subject')">
            <el-option v-for="item in subjectList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=""></el-form-item>
        <el-form-item label="试卷">
          <el-select v-model="listQuery.paperId" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in paperList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
		<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
			<chart height='calc(100vh - 165px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
		</div>
	</div>
</template>
<script>
  import { periodList, gradeList, subjectList } from 'utils/data';
  import { clearEchart } from 'utils/index';
  import chart from '@/components/Charts/chart';
	import { getPaperIdSchoolLowRate } from 'api/low_rate';
  import { getPaperList } from 'api/list';
	export default {
    components: { chart },
		data() {
			return {
				name: '各学科优良率',
        periodList: periodList(),
        gradeList:[],
        subjectList: subjectList(),
        paperList: [],
				listQuery: {
					paperId: '',
				},
        paperQuery: {
          period: '2019',
          grade: '七年级',
          subject: ''
        },
				total: 0,
				chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
			}
		},
		mounted() {
      this.setForm();
      this.setDefault(this.getPaperData());

			// this.initChart();
			// this.getList();
		},
		methods: {
      setForm(){
        let grade_list = gradeList('all');
        for(let i=0; i<grade_list.length; i++){
          for(var o=0; o<grade_list[i].options.length; o++){
            this.gradeList.push(grade_list[i].options[o]);
          }
        };
      },
      setDefault(callbak){
        this.paperQuery.period = this.periodList[0].value;
        this.paperQuery.grade = this.gradeList[0].label;
        this.paperQuery.subject = this.subjectList[0].value;
        if(typeof callbak == 'function') callbak
      },
      queryChange(val){
        this.getPaperData();
      },
      getPaperData(){
        this.listQuery.paperId = '';
        getPaperList(this.paperQuery).then( res => {
          if(typeof res == 'undefined') return;
          this.paperList = res.data.list;
          console.log(res.data.list[0].id)
          this.listQuery.paperId = res.data.list[0].id;
          this.getList();
        })
      },
			getList() {
        getPaperIdSchoolLowRate(this.listQuery).then(res => {
          this.chart = clearEchart(this.chart);
          this.setOption();
          if(typeof res == 'undefined') return;
          var data = res.data.data;
          this.chart.name = data.right[0]


          for(let index in data.data){
            this.chart.series.push({
              name: index,
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
              data: data.data[index]
            })
          }
          for( let t in data.title){
            this.chart.X.push(t);
          }
        	this.setOption();
        })
      },
      setOption() {
        this.chart.setOption = {};
        this.chart.setOption = {
          title: {
            text: this.chart.name,
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
            data: this.chart.X
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
          series: this.chart.series
        }
		  }
		}
	}
</script>