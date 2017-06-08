<template>
  <div>
    <el-form :inline="true" :model="fromData" class="demo-form-inline">
      <el-form-item label="考点">
        <el-select v-model="fromData.selectedTest" filterable placeholder="请选择" :change="testChange(fromData.selectedTest)">
          <el-option v-for="item in testList" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校">
        <el-select v-model="fromData.selectedSchool" filterable placeholder="请选择" :change="schoolChange(fromData.selectedSchool)">
          <el-option v-for="item in schoolList" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
    </el-form>
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
    const testList = [
      {value: '0', label: 'all'},
      {value: '1', label: '表示'},
      {value: '2', label: '理解'},
      {value: '3', label: '表达运用'},
      {value: '4', label: '综合分析'},
      {value: '5', label: '奖赏评价'},
      {value: '6', label: '探究创新'},
      {value: '7', label: '写作'}
    ]
    const schoolList = [
      {value: '0', label: 'all'},
      {value: '1', label: '启悟中学'},
      {value: '2', label: '育才学校'},
      {value: '3', label: '外国语学校'}
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
          fromData: {
            selectedSubject: 'all',
            selectedTest: 'all',
            selectedSchool: 'all'
          },
          testList,
          schoolList
        }
      },
      mounted() {
        this.initChart();
      },
      methods: {
        subjectChange(value) {
          console.log(value)
        },
        testChange(value) {
          console.log(value)
        },
        schoolChange(value) {
          console.log(value)
        },
        onSearch() {
          console.log('search')
        },
        initChart() {
          this.chart = echarts.init(document.getElementById('chart'));
          const xData = (function() {
            const data = ['识记', '理解', '表达运用', '综合分析'];
            return data;
          }());
          this.chart.setOption({
            backgroundColor: '#344b58',
            title: {
              text: '所有考试市、区专题得分率监控图',
              x: 'center',
              textStyle: {
                color: '#fff',
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
              x: '15%',
              top: '10%',
              textStyle: {
                color: '#90979c'
              },
              data: ['厦门市平均', '同安区平均', '厦门市七上', '同安区七上']
            },
            calculable: true,
            xAxis: [{
              type: '',
              triggerEvent: true,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisLabel: {
                interval: 0
              },
              data: xData
            }],
            yAxis: [{
              type: 'value',
              splitLine: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 2
              },
              splitArea: {
                show: false
              }
            }],
            series: [{
              name: '厦门市平均',
              type: 'bar',
              barWidth: 50,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: 'rgba(255,144,128,1)',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    position: 'insideTop',
                    formatter(p) {
                      return p.value > 0 ? p.value : '';
                    }
                  }
                }
              },
              data: [
                0.5,
                0.3,
                0.6,
                0.7
              ],
              markLine: {
              	silent: false
              }
            },{
              name: '同安区七上',
              type: 'bar',
              barWidth: 50,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(152,230,48,1)',
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
              data: [
                0.7,
                1,
                0.4,
                0.5
              ]
            }
            ]
          }),
			this.chart.on('click', params => {
		        // console.log(params);
		        if(params.componentType === "xAxis") {
		          console.log('我点击 的x轴');
		        }
				// console.log(this.link[params.seriesName])
				this.$router.push({ path: '/ability/analysis'});
			})
        }
      }
    }
</script>