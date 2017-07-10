<template>
  <div>
    <div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true" :model="fromData">
        <el-form-item label="考点">
          <el-select v-model="fromData.selectedTest" filterable placeholder="请选择" :change="testChange(fromData.selectedTest)">
            <el-option v-for="item in testList" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap">
      <div class="chart" id="chart" style="height:600px;width:100%"></div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
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
  const schoolList = ['启悟中学','育才学校','外国语学校','外国语学校']
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
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
        this.setOption();
      },
      setOption() {
        this.chart.setOption({
          title: {
            text: '所有考试和最近考试单项能力各校发展监控图',
            x: 'center',
            textStyle: {
              color: '#333',
              fontSize: '20',
            },
            padding: [0, 0, 0, 0]
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
            bottom: '25%',
            orient: 'vertical',
            right: '2%',
            textStyle: {
              color: '#90979c'
            },
            data: ['平均', '八上']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            data: ['内厝中学','新店中学','厦门市国祺中学','厦门市第二外国语学校','厦门市五显中学','厦门市东山中学','厦门市启悟中学','同安一中','巷西中学','刘五店中学','巷南中学','彭厝学校','巷东中学','厦门市竹坝学校','厦门市澳溪中学','厦门市城东中学','厦门华兴学校','厦门市美林中学','厦门市莲美中学']
          }],
          yAxis: [{
            type: 'value'
          }],
          dataZoom: [{
            show: true,
            bottom: 30,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          }, {
            type: 'inside',
            show: true,
          }],
          series: [{
            name: '平均',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [0.5,0.3,0.6,0.7,0.5,0.3,0.6,0.7,0.5,0.3,0.6,0.7,0.5,0.3,0.6,0.7,0.5,0.3,0.6,0.7, ],
            markLine: {
            	silent: false
            }
          }, {
            name: '八上',
            type: 'bar',
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
            data: [ 0.2, 0.4,  0.2, 0.5, 0.2, 0.4,  0.2, 0.5, 0.2, 0.4,  0.2, 0.5, 0.2, 0.4,  0.2, 0.5,  0.2, 0.4,  0.2, 0.5]
          }]
        }),
		this.chart.on('click', params => {
	        // console.log(params);
	        if(params.componentType === "xAxis") {
	          console.log('我点击 的x轴');
	        }
			// console.log(this.link[params.seriesName])
			this.$router.push({ path: '/ability/special'});
		})
      }
    }
  }
</script>
