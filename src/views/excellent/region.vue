<template>
  <div>
    <!-- <el-form :inline="true" :model="formData" class="form-inline fr">
      <el-form-item label="全区">
        <el-select v-model="formData.selectedRange" filterable placeholder="请选择" :change="rangeChange(formData.selectedRange)">
          <el-option v-for="item in rangeList" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="showSchool" label="学校">
        <el-select v-model="formData.selectedSchool" clearable placeholder="请选择" :change="schoolChange(formData.selectedSchool)">
          <el-option v-for="item in schoolList" filterable  :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form> -->
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  const rangeList = [
    {value: '学校'},
    {value: '行政班'},
    {value: '教学班'}
  ];
  const schoolList = [
    {value: '启悟中学'},
    {value: '育才学校'}
  ]
  export default {
    data() {
      return {
        chart: '',
        link: {
        	语言积累: 'http://www.baidu.com',
        	语言运用: 'http://www.yuyan.com',
        	非连文本阅读: 'http://www.lal.com',
        	名著阅读: 'http://www.baidu.com',
        	诗歌阅读: 'http://www.baidu.com',
        	文言文阅读: 'http://www.baidu.com',
        	议论文阅读: 'http://www.baidu.com',
        	文学作品阅读: 'http://www.baidu.com',
        	作文: 'http://www.baidu.com',
        	全卷: 'http://www.baidu.com'
        },
        formData: {
          selectedRange: '学校',
          selectedSchool: ''
        },
        showSchool: true,
        rangeList: rangeList,
        schoolList: schoolList
      }
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
        this.setOption();
        this.addChartClick();
      },
      setOption() {
        this.chart.setOption({
          title: {
            text: '单次考试全区各校优良率',
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
            data: ['全市', '启悟中学', '育才学校', '城东学校', '莲美学校']
          }],
          yAxis: [{
            type: 'value',
            name: '百分比(%)',
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
              color: '#333' },
            borderColor: '#90979c'
          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          series: [{
            name: 'data',
            type: 'bar',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop'
                }
              }
            },
            data: [
              5,
              3,
              6,
              7,
              5
            ]
          }]
        })
      },
      addChartClick() {
        this.chart.on('click', params => {
          // console.log(params);
          if(params.componentType === "xAxis") {
            console.log('我点击 的x轴');
          }
          // console.log(this.link[params.seriesName])
          this.$router.push({ path: '/excellent/region-school'});
        })
      },
      rangeChange(value) {
        if(value == '学校') {
          this.showSchool = false
        }else {
          this.showSchool = true
        }
      },
      schoolChange(value) {
        console.log(value)
      },
      onSearch() {

      }
    }
  }
</script>
