<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="学科">
          <el-select v-model="listQuery.subject" placeholder="请选择" @change="subjectChange">
            <el-option label="语文" value="语文"></el-option>
            <el-option label="英语" value="英语"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%;">
			<chart height='600px' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import chart from '@/components/Charts/chart';
	import { getStudentScoreRate } from 'api/student';
	export default {
    components: { chart },
		data() {
			return {
				listQuery: {
					studentId: '',
					subject: ''
				},
				chart: {
					name: '',
          data: [],
          X: [],
          legend: [],
          series: [],
          setOption: {}
				}
			}
		},
		computed: {
      ...mapGetters([
        'uid'
      ])
    },
    mounted() {
    	this.setDefalt();
    	this.getlist();
    },
    methods: {
    	setDefalt(){
    		this.listQuery.studentId = 2470;
    		this.listQuery.subject = '语文';
    	},
    	clearChart() {
    		this.chart.legend = [];
    		this.chart.series = [];
    		this.chart.X = [];
    		this.chart.setOption.series = [];
    	},
    	getlist(){
    		getStudentScoreRate(this.listQuery).then(res => {
    			this.clearChart();
    			if(typeof res == 'undefined') return;
    			var data = res.data.data;
    			this.chart.name = res.data.title;
    			for(let x in data.title){
    				this.chart.X.push(x);
    			}
    			for(let item in data.data){
    				this.chart.legend.push(item);
    				this.chart.series.push({
              name: item,
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
              data: data.data[item]
            })
    			}
    			this.setOption();
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
            data: _that.chart.legend,
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
          series: _that.chart.series
        }
		  },
    	subjectChange(val){
    		this.getlist();
    	}
    }
	}
</script>