<template>
  <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
    <chart height='calc(100vh - 85px)' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
  </div>
</template>
<script>
  import { getLatestTest, attrPeriod, attrGrade } from 'utils/auth';
  import { mapGetters } from 'vuex';
  import chart from '@/components/Charts/chart';
  import { getClassSpecialTopicBySchoolId } from 'api/ability'
  export default {
    components: { chart },
    data() {
      return {
        chart: '',
        list: {
          data: [],
          title: [],
          right: []
        },
        chart: {
          name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
        },
        listQuery: {
          period: attrPeriod(),
          grade: attrGrade(),
          code: ''
        },
        series: []
      }
    },
    computed: {
      ...mapGetters([
        'schoolId',
      ])
    },
    mounted() {
      this.setDefault();
      this.getList()
    },
    methods: {
      setDefault(){
        let paper = JSON.parse(getLatestTest());
        this.listQuery.code = this.$route.query.id;
      },
      getList() {
        this.listLoading = true;
        getClassSpecialTopicBySchoolId(this.listQuery).then(res => {
          if(typeof res == 'undefined') return;
          var data = res.data;
          this.chart.name = this.$route.query.name + '-各校发展监控图';
          this.chart.legend = data.right;
          let i = 0;
          for(let index in data.date){
            this.series.push({
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
              data: data.date[index]
            });
            i++;
          }
          this.chart.X = data.title;
          // this.list.right = data.right;
          this.setOption();
          this.listLoading = false;
        })
      },
      setOption() {
        var _that = this;
        this.chart.setOption = {
          title: {
            text: _that.chart.name,
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
            top: '10%',
            right: '0',
            data: _that.chart.legend
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
              rotate: 45,
              interval: 0,
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
            bottom: 15,
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
      }
    }
  }
</script>
