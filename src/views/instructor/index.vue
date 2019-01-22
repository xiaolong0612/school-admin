<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">  
        <!-- <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in periodList" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="getPaperList">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
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
                    <div class="ui-label" style="white-space:nowrap;">
                      {{item.specialTopicName}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{item.scoreRate.toFixed(2)}}%
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-col>
  		  <el-col :span="16">
  		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
  					<chart height='calc(100vh - 265px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
            
            <el-button-group>
              <el-button type="primary" size='small' icon="el-icon-arrow-left" :disabled="paperPage.index == examinationList.length-1" @click="getList('+')">上一卷</el-button>
              <el-button type="primary" size="small" @click="getList('-')" :disabled="paperPage.index == 0">下一卷<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
  				</div>
  		  </el-col>
  		  <el-col :span="4">
          <div class="wrap" style="margin-bottom: 15px">
            <ul>
              <li v-for="item in qualityList">
                <el-row class="ui-sidebar">
                  <el-col :span="12">
                    <div class="ui-label" style="white-space:nowrap;">
                      {{item.name}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{(item.number*100).toFixed(2)}}%
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
                    <div class="ui-label" style="white-space:nowrap;">
                      {{item.levelName}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="ui-number">
                      {{(item.scoreRate*100).toFixed(2)}}%
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
  import { teacherTop, indexSide } from 'api/index';
  import { getPaperList } from 'api/list';
  import { attrGrade } from 'utils/auth';
  import chart from '@/components/Charts/chart';
  export default {
    components: { chart },
  	data() {
  		return {
  			name: '',
  			gradeList: [],
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
        paperPage:{
          index: 0,
        },
  			specialList: [],
  			qualityList: [],
        level: [],
  			examinationList: [],
        listQuery: {
          id: '',
          grade: '',
          paperId: '',
        }
  		}
  	},
    computed: {
      ...mapGetters([
        'user',
        'uid',
        'subject'
      ])
    },
  	mounted() {
      this.setForm();
      this.setDefault();
  		this.getPaperList();
  	},
  	methods: {
      setForm(){
        this.gradeList = this.user.grade.split(',');
      },
      setDefault(){
        this.listQuery.id = this.uid;
        this.listQuery.grade = typeof attrGrade() == 'undefined' ? this.gradeList[0] : attrGrade();
      },
      empty(){
        this.chart.series.data = [];
        this.examinationList[this.paperPage.index].name = '';
        this.setOption();

        for(var i in this.specialList){
          this.specialList[i].scoreRate = 0;
        }
        for(var i in this.level){
          this.level[i].scoreRate = 0;
        }
        for(var i in this.qualityList){
          this.qualityList[i].number = 0;
        }
      },
      getPaperList(){
        let query = {
          grade: this.listQuery.grade,
          // grade: '八年级',
          subject: this.user.userinfo.subject
        }

      this.getSide();
        getPaperList(query).then(res => {
          if(res.data.list.length == 0){
            this.$message.error('暂无试卷');
            this.empty();
          }else{
            this.examinationList = res.data.list;
            if(this.examinationList.length == 0 || this.examinationList.length == 1){
              this.paperPage.index = 0;
            }
            this.getList('');
          }
        })
      },
      getSide(){
        let query = {
          subject: this.subject,
          grade: this.listQuery.grade
        }
        indexSide(query).then(res => {
          if(res == undefined){
            return false;
          }
          var data = res.data.data
          this.specialList = data.left;
          this.level = data.level;
          this.qualityList = [];
          for(var item in data.right){
            this.qualityList.push({
              name: data.right[item].split(':')[0],
              number: data.right[item].split(':')[1]
            })
          };
        })
      },
  		getList(type) {
        if(type == '-'){
          this.paperPage.index--;
        }else if(type == '+'){
          this.paperPage.index++;
        }
        this.listQuery.paperId = this.examinationList[this.paperPage.index].id;
        attrGrade(this.listQuery.grade);
        teacherTop(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
            this.chart.data = [];
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

        });
      },
      setOption() {
        var _that = this;
        this.chart.setOption = {
          title: {
            text: this.examinationList[this.paperPage.index].name,
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