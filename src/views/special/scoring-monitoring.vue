<template>
  <div class="echarts-wrap ui-echart-wrap">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import { getScore } from 'api/special'
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
        listQuery: {
          paperId: 2
        },
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
        }
      }
    },
    mounted() {
      this.initChart();
      this.getList();
      this.addEchartClick();
    },
    methods: {
      getList() {
        getScore(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.right = data.right;
          this.list.data = data.data;
          this.list.title = data.title;
          this.setOption();
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
        console.log(this.list)
        this.chart.setOption({
          title: {
            text: '所有考试市、区专题得分率监控图',
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
            data: _that.list.title
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            data: ['语言积累', '语言运用', '非连文本阅读', '名著阅读', '诗歌阅读', '文言文阅读', '议论文阅读', '文学作品阅读', '作文', '全卷']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '市平均',
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
            data: _that.list.data
          }]
        })
      },
      addEchartClick() {
        this.chart.on('click', params => {
          // console.log(params);
          if(params.componentType === "xAxis") {
            console.log(params);
          }
          // console.log(this.link[params.seriesName])
          // this.$router.push({ path: '/special/scoring-item'});
        })
      }
    }
  }
</script>
