<template>
  <div class="echarts-wrap ui-echart-wrap">
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
        this.addEchartClick();
      },
      setOption() {
        this.chart.setOption({
          title: {
            text: '优良率',
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
            right: '1%',
            textStyle: {
              color: '#90979c'
            },
            data: ['市平均', '区平均', '市九上', '区九上']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            nameRotate: 50,
            data: ['内厝中学','新店中学','厦门市国祺中学','厦门市第二外国语学校','厦门市五显中学','厦门市东山中学','厦门市启悟中学','同安一中','巷西中学','刘五店中学','巷南中学','彭厝学校','巷东中学','厦门市竹坝学校','厦门市澳溪中学','厦门市城东中学','厦门华兴学校','厦门市美林中学','厦门市莲美中学']
          }],
          yAxis: [{
            type: 'value'
          }],
          dataZoom: [{
            show: true,
            bottom: 15,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          }, {
            type: 'inside',
            show: true,
          }],
          series: [{
            name: 'data',
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop'
                }
              }
            },
            data: [ 5, 3, 6, 7, 5, 0.4, 0.4,1.2, 1, 0.9,1.2, 1, 0.9, 0.9, 0.9,7, 5, 0.4 ]
          }]
        })
      },
      addEchartClick() {
        this.chart.on('click', params => {
          // console.log(params);
          if(params.componentType === "xAxis") {
            console.log('我点击 的x轴');
          }
          // console.log(this.link[params.seriesName])
          this.$router.push({ path: '/special/scoring-test-item'});
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
