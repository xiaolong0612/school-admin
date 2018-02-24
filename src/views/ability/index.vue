<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">  
        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="getList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable clearable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目">
          <el-select v-model="listQuery.subject" filterable clearable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
      <chart height='calc(100vh - 165px)' width='100%' :setChartOption="chart.setOption" :clickChart="true" clickPath="/ability/class" :xParmas="x_id"></chart>
    </div>
  </div>
</template>
<script>
  import { getLatestTest, attrPeriod, attrGrade } from 'utils/auth';
  import chart from '@/components/Charts/chart';
  import { getPaperList, getAllPeriod } from 'api/list';
  import { mapGetters } from 'vuex';
  import { getPaperSchoolPassRateSpecialTopic } from 'api/ability'
  export default {
    components: { chart },
    data() {
      return {
        name: '',
        chart: '',
        periodList: [],
        gradeList: [],
        subjectList: [],
        list: {
          data: [],
          title: [],
          right: []
        },
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
        x_id:{},
        series: [],
        selected: {},
        listQuery: {
          grade: '',
          period: '',
          subject: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'uid',
        'user'
      ])
    },
    mounted() {
      this.getAllPeriod();
    },
    methods: {
      setDefault() {
        this.gradeList = this.user.grade.split(',');
        this.subjectList = this.user.userinfo.subject.split(',');
        let paper = JSON.parse(getLatestTest());
        // this.listQuery.paperId = paper.id;
        this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        this.listQuery.subject = this.subjectList[0];
        this.getList('');
      },

      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
      getList() {
        this.listLoading = true;
        attrGrade(this.listQuery.grade);
        attrPeriod(this.listQuery.period);
        getPaperSchoolPassRateSpecialTopic(this.listQuery).then(res => {
          this.chart.series = [];
          console.log(1)
          if(typeof res == 'undefined'){
            this.setOption();
            console.log(2)
            return false;
          }
          var data = res.data;
          this.chart.name = '能力发展';
          this.chart.right = data.right;
          let i = 0;
          for(let index in data.date){
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
              data: data.date[index]
            });
          }
          this.x_id = [];
          this.chart.X = [];
          this.x_id = data.title;
          for(var item in data.title){
            this.chart.X.push(item);
          }
          // this.list.right = data.right;
          this.setOption();
          this.listLoading = false;
        })
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
            padding: [20, 0, 0, 0]
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
            data: _that.chart.right
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
            start: 30,
            end: 70,
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
