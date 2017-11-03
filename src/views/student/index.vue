<template>
	<div>
		<!--   -->
		<div>
			<el-row :gutter="15">
			  <el-col :span="24">
			  	<div class="wrap">
						<chart height='600px' width='100%' :setChartOption="chart.setOption" :clickChart="false"></chart>
            <div class="ui-course">
              <!-- <div class="clearfix ui-course_nr">
                <ul class="ui-course_nr2">
                  <li v-for='item in klass'>{{item.time}}
                    <div class="ui-once">
                      <h1>{{item.time}}</h1>
                      <p>{{item.name}}</p>
                    </div>
                  </li>
                </ul>
              </div> -->
            </div>
					</div>
			  </el-col>
			</el-row>
			<div style="height:15px"></div>
			<el-row :gutter="15">
			  <el-col :span="12">
			  	<div class="wrap">
			  		<index-item id="echart_1" />
			  	</div>
			  	<div style="height:15px"></div>
			  	<div class="wrap">
			  		<index-item id="echart_2" />
			  	</div>
			  </el-col>
			  <el-col :span="12">
			  	<div class="wrap">
			  		<index-item id="echart_3" />
			  	</div>
			  	<div style="height:15px"></div>
			  	<div class="wrap">
			  		<index-item id="echart_4" />
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { teacherTop } from 'api/index';
  import chart from '@/components/Charts/chart';
  import IndexItem from './index/indexItem';
  import { student } from 'api/index'
  export default {
  	components: { IndexItem, chart },
    computed: {
      ...mapGetters([
        'uid',
        'gradeNo'
      ])
    },
  	data() {
  		return {
  			name: '',
        listQuery: {
          grade: 0
        },
        chart: {
          data: [],
          title: [],
          right: [],
          series: [],
          setOption: {},
          legend: []
        }
  		}
  	},
  	mounted() {
      this.getData();
  	},
  	methods: {
      getData() {
        student({id: this.uid, grade: this.gradeNo}).then(res => {
          let data = res.data.data;
          console.log(data);
          this.chart.title = data.subject;
          for(let index in data.data){
            this.chart.legend.push(index);
            this.chart.series.push({
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
              data: data.data[index].split(',')
            })
            console.log(index, data.data[index].split(','))
          }
          this.setOption();
        })
      },
    	setOption() {
    		let _that = this;
        this.chart.setOption = {};
        this.chart.setOption = {
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
            data: _that.chart.title
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
          series: _that.chart.series
        }
    	}	
  	}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.ui-left-wrap,.ui-right-wrap{
		width: 120px;
		li{
			margin-bottom: 6px;
		}
	}
	.chart{
		margin: 0 auto;
	}
</style>