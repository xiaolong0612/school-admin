<template>
	<div>
		<el-row :gutter="15">
		  <el-col :offest="4" :span="16">
		  	<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
					<div class="chart" id="chart" style="height:600px;width:100%"></div>
				</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getPaperIdSchoolExcellentRate } from 'api/grades';
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
  	data() {
  		return {
  			name: '',
  			classList: [],
        list: {
          data: {},
          title: [],
          right: []
        },
        listQuery: {
          paperId: 2
        },
        series: []
  		}
  	},
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    created() {

    },
  	mounted() {
      this.initChart();
  		this.getList();
  	},
  	methods: {
  		getList() {
        getPaperIdSchoolExcellentRate(this.listQuery).then(res => {
          var data = res.data.data;
          this.list.data = data.data;

          for(let title_index in data.title){
            console.log(title_index)
            this.list.title.push(title_index)
          }

          this.list.right = data.right.split(',');
          for(let index in this.list.right){
            this.series.push({
              name: this.list.right[index],
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
              data: this.list.data[this.list.right[index]]
            })
          }
        	this.setOption();
        });
      },
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        var _that = this;
        this.chart.setOption({
          title: {
            text: '优良率监控图',
            subtext: '切换至表格',
            sublink: '#/grades/excellent-rate/table',
            subtarget: 'self',
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
            data: _that.list.right
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
            start: 10,
            end: 80,
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
</script>