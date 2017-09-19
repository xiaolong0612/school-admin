<template>
  <div class="echarts-wrap ui-echart-wrap">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import { getPaperIdSchoolExcellentRate } from 'api/excellent'
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
    data() {
      return {
        chart: '',
        list: {
          data: [],
          right: [],
          title: []
        },
        titleText: {},
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
        listQuery: {
          paperId: 2,
        }
      }
    },
    mounted() {
      this.initChart();
      this.getList();
      this.addChartClick();
    },
    methods: {
      getList() {
        getPaperIdSchoolExcellentRate(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.right = data.right;
          this.list.data = data.data;
          var titleText = [];
          for(var item in data.title){
            titleText.push(item);
          }
          this.list.title = titleText;
          this.setOption();
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
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
            axisTick: {
              alignWithLabel: true
            },
            nameRotate: 50,
            data: _that.list.title
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
            barMaxWidth: 100,
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
            data: _that.list.data
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
      }
    }
  }
</script>
