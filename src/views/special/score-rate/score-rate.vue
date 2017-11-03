<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="queryChange">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="queryChange">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <!-- <div class="chart" id="chart" style="height:600px;width:100%"></div> -->
      <chart height='calc(100vh - 165px)' width='100%' :setChartOption="setOption" :clickChart="true" :xParmas="x_id" clickPath="/special/score-rate/school"></chart>
    </div>
  </div>
</template>
<script>
  import { getLatestTest } from 'utils/auth';
  import { gradeList } from 'utils/data';
  import chart from '@/components/Charts/chart'
  import { getAllSpecialTopic } from 'api/special';
  export default {
    components: { chart },
    data() {
      return {
        name: '',
        gradeList: [],
        periodList: [],
        listQuery: {
          period: '',
          grade: ''
        },
        listLoading: false,
        list: {
          data: [],
          title: [],
          right: []
        },
        x_id:{},
        series: [],
        setOption: {},
      }
    },
    mounted() {
      // 设置顶部搜索条件
      this.setForm();
      this.setDefault();
      this.getList();
    },
    methods: {
      setDefault(){
        this.listQuery.period = this.periodList[0].value;
        this.listQuery.grade = this.gradeList[0].label;
      },
      setForm(){
        // 年级
        let grade_list = gradeList('all');
        for(let i=0; i<grade_list.length; i++){
          for(var o=0; o<grade_list[i].options.length; o++){
            this.gradeList.push(grade_list[i].options[o]);
          }
        };
        // 届
        let year = new Date().getFullYear();
        for(let i=0; i<3; i++){
          this.periodList.push({
            label: year+i,
            value: year+i,
          })
        }
      },
      getList() {
        this.list.title = [];
        this.series = [];

        if(getLatestTest().length == 0){
          this.$message.error('sorry, 暂无考试信息');
          return;
        }
        let paper = JSON.parse(getLatestTest());
        this.listQuery.period = paper.period;

        getAllSpecialTopic(this.listQuery).then(res => {
          if(typeof res == 'undefined') return;
          var data = res.data.data;
          this.list.data = data.data;
          for(let index in data.title){
            this.list.title.push(index)
          }
          this.x_id = data.title;

          // this.list['title'] = data.title;
          this.list.right = data.right;
          // this.legend = []
          for(let index in data.data){
            // this.legend.push(this.list.right[index]);
            this.series.push({
              name: index,
              type: 'bar',
              barMaxWidth: 100,
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
          this.setChartOption();
          // this.addEchartClick();
        })
      },
      queryChange(){
        this.getList();
      },
      setChartOption() {
        var _that = this;
        this.setOption = {
          title: {
            text: '所有考试区专题得分率监控图',
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
            data: _that.list.right,
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
          series: _that.series
        }
      }
    }
  }
</script>