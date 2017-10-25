<template>
  <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
    <div class="chart" id="chart" style="height:600px;width:100%"></div>
  </div>
</template>
<script>
  import { getLatestTest } from 'utils/auth';
  import echarts from 'echarts';
  import { mapGetters } from 'vuex';
  require('echarts/theme/macarons'); // echarts 主题
  import { getPaperSchoolPassRateSpecialTopic } from 'api/ability'
  export default {
    data() {
      return {
        name: '',
        chart: '',
        list: {
          data: [],
          title: [],
          right: []
        },
        x_id:{},
        series: [],
        selected: {},
        listQuery: {
          paperId: '',
        }
      }
    },
    computed: {
      ...mapGetters([
        'uid',
      ])
    },
    mounted() {
      this.setDefault();
      this.initChart();
      this.getList()
    },
    methods: {
      setDefault() {
        let paper = JSON.parse(getLatestTest());
        console.log(paper)
        this.listQuery.paperId = paper.id;
      },
      getList() {
        this.listLoading = true;
        getPaperSchoolPassRateSpecialTopic(this.listQuery).then(res => {
          var data = res.data.data;
          this.name = data.right;
          this.list.right = [];
          let i = 0;
          for(let index in data.data){

            this.list.right.push(index);
            if(i < data.right.length/3) this.selected[index] = true;
            else this.selected[index] = false;
            

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
              data: data.data[index]
            });
            i++;
          }
          this.x_id = data.title;
          this.list.title = [];
          for(var item in data.title){
            this.list.title.push(item);
          }
          console.log(this.selected)
          // this.list.right = data.right;
          this.setOption();
          this.addChartClick();
          this.listLoading = false;
        })
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('chart'),'macarons');
      },
      setOption() {
        var _that = this;
        this.chart.setOption({
          title: {
            text: _that.name,
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
            right: '0',
            data: _that.list.right,
            selected: _that.selected
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
            start: 30,
            end: 70,
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
        })
      },
      addChartClick() {
        this.chart.on('click', params => {
          if(params.componentType === "xAxis") {
            console.log(this.x_id[params.value]);
            this.$router.push({ path: '/ability/class', query: {id: this.x_id[params.value]}});
          }
          // console.log(this.link[params.seriesName])
          // this.$router.push({ path: '/ability/school'});
        })
      }
    }
  }
</script>
