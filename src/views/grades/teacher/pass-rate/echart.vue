<!-- <template>
  <div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
      <div class="chart" id="chart" style="height:600px;width:100%"></div>
    </div>
  </div>
</template>
<script>
  import { getLatestTest } from 'utils/auth';
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  import { getClassScoreRateByPeriodAndGradeAndSchoolIdEacher } from 'api/grades';
  export default {
    data() {
      return {
        name: '优良率',
        screenHeight: 0,
        listQuery: {
          paperId: 7
        },
        listLoading: false,
        list: [],
        series: []
      }
    },
    mounted() {
      
      this.initChart();
      this.getList();
    },
    methods: {
      getList() {
        if(getLatestTest().length == 0){
          this.$message.error('sorry, 暂无考试信息');
          return;
        }
        this.listQuery.paperId = JSON.parse(getLatestTest()).paperId;
        getClassScoreRateByPeriodAndGradeAndSchoolIdEacher(this.listQuery).then(res => {
          var data = res.data.data;
          this.list['data'] = data.data;
          this.list['title'] = data.title;
          this.list['right'] = data.right;

          for(let index in this.list.right){
            this.series.push({
              name: '',
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
              data: this.list.data
            })
          }

          this.specialList = data.left;
          this.qualityList = [];
          for(var item in data.right){
            this.qualityList.push({
              name: data.right[item].split(':')[0],
              number: data.right[item].split(':')[1]
            })
          };

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
            text: _that.name,
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
        })
      }
    }
  }
</script> -->