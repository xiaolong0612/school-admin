<template>
  <div class="echarts-wrap ui-echart-wrap">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import { getAllSpecialTopic } from 'api/special'
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
        linkId: [],
        titleText: [],
        titleId: [],
        listQuery: {
          period: 2017
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
        getAllSpecialTopic(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.right = data.right[0].split(',');
          this.list.data = data.data[0].split(",");
          for(var item in data.title){
            this.titleText.push(item);
          }
          this.list.title = this.titleText;

          this.linkId = data.title;
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
            data: _that.list.right
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            data: _that.list.title
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '市平均',
            type: 'bar',
            barMaxWidth: 60,
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
        var _that = this;
        this.chart.on('click', params => {
          // console.log(params);
          if(params.componentType === "xAxis") {
            var id = _that.linkId[params.value];
            this.$router.push({ path: '/special/scoring-item',  query: { id: id }});
          }
          // console.log(this.link[params.seriesName])
          // this.$router.push({ path: '/special/scoring-item'});
        })
      }
    }
  }
</script>
