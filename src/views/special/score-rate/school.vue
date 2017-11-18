<template>
  <div>
    <router-link :to="{path: '/special/qualit-manage', query:{specialTopicId: listQuery.specialTopicId, name: name}}">
      <el-button type="primary" style="margin-bottom:15px;">
        切换查看所有考试-{{name}}专题值监控表
      </el-button>
    </router-link>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <chart height='600px' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
    </div>
  </div>
</template>
<script>
  import chart from '@/components/Charts/chart';
  import { getLatestTest } from 'utils/auth';
  import { getPaperSchoolPassRateSpecialTopic } from 'api/special';
  export default {
    components: { chart },
    data() {
      return {
        name: '',
        listQuery: {
          paperId: '',
          specialTopicId: ''
        },
        listLoading: false,
        list: {
          data: [],
          title: [],
          right: []
        },
        series: [],
        legend: [],
        chart: {
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {},
        }
      }
    },
    mounted() {
      this.name = this.$route.query.name;

      if(getLatestTest().length == 0){
        this.$message.error('sorry, 暂无考试信息');
        return;
      }
      let paper = JSON.parse(getLatestTest());
      this.listQuery.paperId = paper.id;
      this.listQuery.specialTopicId = this.$route.query.id;

      // this.initChart();
      this.getList();
    },
    methods: {
      getList() {

        getPaperSchoolPassRateSpecialTopic(this.listQuery).then(res => {
          var data = res.data.data;
          console.log(data);
          this.list.data = data.data;
          for(let index in data.title){
            this.list.title.push(index)
          }
          this.x_id = data.title;

          // this.list['title'] = data.title;
          this.list.right = data.right.split(',');
          this.series = [];
          this.legend = [];
          this.legend.push(this.list.right);
          this.series.push({
            name: this.list.right,
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
            data: this.list.data[this.list.right]
          })
          console.log(this.list.data)
          this.setOption();
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
        this.chart.setOption = {
          title: {
            text: _that.list.right+"-"+_that.name,
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
            data: _that.legend,
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
            data: _that.list.title
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
          series: _that.series
        }
      },
      // addEchartClick() {
      //   var _that = this;
      //   this.chart.on('click', params => {
      //     if(params.componentType === "xAxis") {
      //       console.log(this.x_id[params.value]);
      //       var id = _that.x_id[params.value];
      //       this.$router.push({ path: '/special/score-rate/school',  query: { id: id }});
      //     }
      //     // console.log(this.link[params.seriesName])
      //     // this.$router.push({ path: '/special/scoring-item'});
      //   })
      // }
      goAllTests(){
        this.$router.push({ path: '/special/score-rate/school',  query: { id: id }});
      }
    }
  }
</script>