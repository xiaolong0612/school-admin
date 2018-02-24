<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

        <el-form-item label="届">
          <el-select v-model="paperQuery.period" placeholder="请选择" @change="getPaperList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="paperQuery.grade" placeholder="请选择" @change="getPaperList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="班级类型">
          <el-select v-model="classTyoeQuery.state" filterable placeholder="请选择" @change="queryChange('state')">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="行政班" :value="0"></el-option>
            <el-option label="教学班" :value="1"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="→"></el-form-item>

        <el-form-item label="考试列表">
          <el-select v-model="listQuery.paperId" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in examinationList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="fr">
          <router-link to="/grades/pass-rate/table" >
            <el-button type="primary">切换查看方式</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <chart height='calc(100vh - 265px)' width='100%' :setChartOption="chart.setOption" :clickChart="true" clickPath="/grades/pass-rate/class" :xParmas="x_id"></chart>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getPaperList, getAllPeriod } from 'api/list';
  import { getLatestTest, attrPeriod, attrGrade } from 'utils/auth';
  import { getSchoolPassRateByPeriodAndSubjectAndGradeEchart } from 'api/grades';
  import chart from '@/components/Charts/chart';
  export default {
    components: { chart },
    computed: {
      ...mapGetters([
        'schoolId',
        'gradeNo',
        'schoolId',
        'subject',
        'user'
      ])
    },
    data() {
      return {
        name: '及格率',
        screenHeight: 0,
        listQuery: {
          paperId: ''
        },
        paperQuery: {
          period: '2019',
          grade: '七年级',
          subject: ''
        },
        gradeList: [],
        periodList: [],
        examinationList: [],
        listLoading: false,
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
        x_id: []
      }
    },
    mounted() {
      this.setForm();
      this.getAllPeriod();
    },
    methods: {
      setForm(){
        this.gradeList = this.user.grade.split(',');
      },
      setDefault(){
        

        this.paperQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.paperQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];

        this.paperQuery.subject = this.subject;
        this.getPaperList();
      },
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
      getPaperList(type){
        let query = {

          period: this.paperQuery.period,
          grade: this.paperQuery.grade,
          // grade: '八年级',
          subject: this.subject
        }

        switch(type){
          case 'period':
            attrPeriod(this.paperQuery.period);
            break;
          case 'grade':
            attrGrade(this.paperQuery.grade);
            break;
        }

        getPaperList(query).then( res => {
          this.examinationList = [];
          this.listQuery.paperId = '';
          this.list = [];
          if(typeof res == 'undefined' || res.data.list.length == 0) return;
          this.examinationList = res.data.list;

          this.listQuery.paperId = res.data.list[0].id;
          this.getList();
        })
      },
      getList() {

        this.listLoading = true;
        getSchoolPassRateByPeriodAndSubjectAndGradeEchart({paperId:this.listQuery.paperId}).then(res => {
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
        console.log(this.chart)
      }
    }
  }
</script>