<template>
  <div>
    <!-- <el-form :inline="true" :model="formData" class="demo-form-inline">
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
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
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
          color: colorArray(5, 9),
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
          this.chart = echarts.init(document.getElementById('chart'));
          const xData = (function() {
            const data = ['语言积累', '语言运用', '非连文本阅读', '名著阅读', '文言文阅读', '议论文阅读', '文学作品阅读', '作文', '全卷'];
            return data;
          }());
          const color = this.color;
          this.chart.setOption({
            title: {
              text: '专题得分率监控图',
              x: 'center',
              textStyle: {
                color: '#333',
                fontSize: '20',
              },
              padding: [20, 0, 0, 0]
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                textStyle: {
                  color: '#fff'
                }
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
              bottom: '25%',
              orient: 'vertical',
              right: 'right',
              textStyle: {
                color: '#90979c'
              },
              data: ['平均', '八上']
            },
            calculable: true,
            xAxis: [{
              type: '',
              triggerEvent: true,
              data: xData,
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: '#333'
                }
              }
            }],
            yAxis: [{
              type: 'value',
              name: '百分比(%)',
              splitLine: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 2,
                textStyle: {
                  color: '#333'
                }
              },
              splitArea: {
                show: false
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
            series: [{
              name: '平均',
              type: 'bar',
              barMaxWidth: 35,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: color[0],
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
                5,
                6,
                7,
                5,
                9
              ]
            },{
              name: '八上',
              type: 'bar',
              barMaxWidth: 35,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: color[1],
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
                7,
                5,
                6,
                7,
                5,
                9,
                5,
                3,
                6
              ]
            }]
          }),
      this.chart.on('click', params => {
        // console.log(params);
        if(params.componentType === "xAxis") {
          console.log('我点击 的x轴');
        }
        // console.log(this.link[params.seriesName])
        this.$router.push({ path: '/ability/analysis'});
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
