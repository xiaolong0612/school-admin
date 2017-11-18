<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="periodChange">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="gradeChange">
            <el-option v-for="item in classList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap">
      <chart height='calc(100vh - 165px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { bureau } from 'api/index';
  import { gradeList } from 'utils/data';

  import chart from '@/components/Charts/chart';
  export default {
    components: { chart },
    data() {
      return {
        name: '',
        classList: [],
        periodList: [],
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
        listQuery: {
          period: '',
          grade: '七年级'
        }
      }
    },
    created() {
      this.listQuery.period = new Date().getFullYear() + 2;
    },
    mounted() {
      // 设置顶部搜索条件
      this.setForm();
      this.getList();
    },
    methods: {
      getList() {
        bureau(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
            for(let i in this.chart){
              this.chart[i] = []
            }
            this.setOption();
            return;
          };
          let data = res.data.data;

          this.chart.series = [];
          this.chart.X = [];
          this.chart.legend = [];
          
          this.chart.X = data.title;
          for(let index in data.data){
            this.chart.legend.push(index);
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
          this.setOption();
        });
      },
      setForm(){
        // 年级
        let grade_list = gradeList('all');
        for(let i=0; i<grade_list.length; i++){
          for(var o=0; o<grade_list[i].options.length; o++){
            this.classList.push(grade_list[i].options[o]);
          }
        };
        for(let i in this.classList){
          this.$set(this.classList[i], 'select', '');
        }
        // 届
        let year = new Date().getFullYear();
        for(let i=0; i<3; i++){
          this.periodList.push({
            label: year+i,
            value: year+i,
          })
        }
      },
      periodChange(val){
        this.listQuery.period = val;
        this.getList();
      },
      gradeChange(val){
        this.listQuery.grade = val;
        this.getList();
      },
      setOption() {
        var _that = this;
        this.chart.setOption = {
          title: {
            text: '',
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