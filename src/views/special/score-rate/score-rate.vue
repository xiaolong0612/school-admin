<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="queryChange('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目">
          <el-select v-model="listQuery.subject " filterable placeholder="请选择" @change="queryChange('subject')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <!-- <div class="chart" id="chart" style="height:600px;width:100%"></div> -->
      <chart height='calc(100vh - 165px)' width='100%' :setChartOption="setOption" :clickChart="true" :xParmas="x_id" clickPath="/special/score-rate/school" :otherQuery="listQuery"></chart>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getLatestTest, attrGrade, attrPeriod,attrSubject } from 'utils/auth';
  import { gradeList } from 'utils/data';
  import { getPaperList, getAllPeriod } from 'api/list';
  import chart from '@/components/Charts/chart'
  import { getAllSpecialTopic } from 'api/special';
  export default {
    components: { chart },
    data() {
      return {
        name: '',
        gradeList: [],
        periodList: [],
        subjectList: [],
        listQuery: {
          period: '',
          grade: '',
          subject: '',
          paperId: ''
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
    computed: {
      ...mapGetters([
        'subject',
        'gradeNo',
        'user'
      ])
    },
    mounted() {
      // 设置顶部搜索条件
      this.setForm();
      this.getAllPeriod();
    },
    methods: {
      setDefault(){
        this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];
        this.getPaperList();
      },
      setForm(){
        this.gradeList = this.user.grade.split(',');
        this.listQuery.period = this.periodList[0];
        this.subjectList = this.user.userinfo.subject.split(',');
      },
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
      getPaperList(type){
        let query = {

          period: this.listQuery.period,
          grade: this.listQuery.grade,
          // grade: '八年级',
          subject: this.user.userinfo.subject
        }
        switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
        }
        getPaperList(query).then(res => {
          if(typeof res == 'undefined' || res.data.list.length == 0){
            this.list.data = [];
            this.listLoading = false;
            return false;
          }
          this.examinationList = res.data.list;
          this.listQuery.paperId = this.examinationList[0].id;
          this.getList();
        })
      },
      getList() {
        this.list.title = [];
        this.series = [];

        if(getLatestTest().length == 0){
          this.$message.error('sorry, 暂无考试信息');
          return;
        }

        getAllSpecialTopic(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
            this.series = [];
            this.setChartOption();
            return;
          };
          var data = res.data[0];
          this.list.data = data.data;
          this.list.title = [];
          for(let index in data.title){
            this.list.title.push(index)
          }
          this.x_id = data.title;

          // this.list['title'] = data.title;
          this.list.right = data.right;
          // this.legend = []
          this.series = [];
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
      queryChange(type){
        switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
          case 'subject':
            attrSubject(this.listQuery.subject);
            break;
        }
        this.getList();
      },
      setChartOption() {
        var _that = this;
        this.setOption = {
          title: {
            text: '专题得分率',
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
            top: '10%',
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
          series: _that.series
        }
      }
    }
  }
</script>