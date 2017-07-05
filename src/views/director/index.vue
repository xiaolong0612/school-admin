<template>
	<div>
    <div class="ui-search-wrap" id="ui-search-wrap">
        <el-button v-for='item in classList' @click="getList()" :type="item.type" :key="item" style="margin-bottom: 15px;width:90px;">{{item.label}}</el-button>
    </div>
		<!-- <div class="fr wrap" style="width:29%;padding: 15px 15px 0;">
			<el-button v-for='item in classList' @click="getList()" :type="item.type" :key="item" style="margin-bottom: 15px;width:120px;">{{item.label}}</el-button>
		</div> -->
		<div class="echarts-wrap ui-echart-wrap" style="padding-right: 3%">
			<div class="chart" id="chart" style="height:600px;width:100%"></div>
		</div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { fetchList, fetchPv } from 'api/data';
    import { colorArray } from 'utils/index'

     // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
    export default {
    	data() {
    		return {
    			color: colorArray(5 ,8),
    			data1: null,
    			data2: null,
    			data3: null,
    			data4: null,
    			name: '',
    			classList: [{
	          value: '1',
	          label: '七年级'
	        }, {
	          value: '2',
	          label: '八年级'
	        }, {
	          value: '3',
	          label: '九年级'
	        }, {
	          value: '4',
	          label: '高一'
	        }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
            value: '5',
            label: '高二'
          }, {
	          value: '6',
	          label: '高三'
	        }],
          fromData: {
            selectedClass: ''
          },
    			listQuery: {
            page: 1,
            limit: 20,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id'
          }
    		}
    	},
    	created() {
      	
      },
      mounted() {
      	this.getList();
      },
    	methods: {
    		select(item) {
    			this.getList();
    			if(typeof item.type == 'undefined'){
    				this.$set(item, 'type', 'primary');
    			}else {
    				if(item.type != 'primary'){
    					item.type = 'primary'
    				}else {
    					this.classList.forEach(function(value, index) {
    						value.type = ""
    					})
    					item.type = 'primary'
    				}
    			}
    		},
    		getList() {
          fetchList(this.listQuery).then(response => {
            this.data1 = response.data.list[0].array2;
            this.data2 = response.data.list[1].array2;
            this.data3 = response.data.list[2].array2;
            this.data4 = response.data.list[3].array2;
          	this.initChart();
          });
        },
    		initChart() {
          this.chart = echarts.init(document.getElementById('chart'));
          const data1 = this.data1;
          const data2 = this.data2;
          const data3 = this.data3;
          const data4 = this.data4;
          const color = this.color;
          this.chart.setOption({
            title: {
              text: '同安区初中2018届七上市质检总分监控图（最近考试）',
              x: 'center',
              textStyle: {
                color: '#333',
                fontSize: '20',
              },
              padding: [20, 0, 0, 0]
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                textStyle: {
                  color: '#fff'
                }
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
              bottom: '25%',
              orient: 'vertical',
              right: 'right',
              textStyle: {
                color: '#90979c'
              },
              data: ['得分率', '超均率', '位置', '进步值']
            },
            calculable: true,
            xAxis: [{
              type: '',
              triggerEvent: true,
              nameTextStyle: {
              	color: '#333'
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: true
              },
              splitArea: {
                show: false
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                	color: '#333'
                }
              },
              data: ['语文', '数学', '英语', '物理', '化学', '生物', '思品', '历史', '地理', '总分', '折合总分']
            }],
            yAxis: [{
              type: 'value',
              splitLine: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 2,
                textStyle: {
                	color: '#333'
                }
              },
              splitArea: {
                show: false
              }
            }],
            series: [{
              name: '得分率',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: color[0],
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
              data: data2,
            }, {
              name: '超均率',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: color[1],
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
              data: data1,
            }, {
              name: '位置',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: color[2],
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
              data: data3,
            }, {
              name: '进步值',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: color[3],
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
              data: data4,
            }]
          })
				}
    	}
    }
</script>