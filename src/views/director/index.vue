<template>
	<div>
    <div class="ui-search-wrap" id="ui-search-wrap">
        <el-button v-for='item in classList' @click="getList()" :type="item.type" :key="item" style="margin-bottom: 15px;width:90px;">{{item.label}}</el-button>
    </div>
		<div class="echarts-wrap ui-echart-wrap">
			<div class="chart" id="chart" style="height:600px;width:100%"></div>
      <div class="ui-course">
        <div class="clearfix ui-course_nr">
          <ul class="ui-course_nr2">
            <li>2007
              <div class="ui-once">
                <h1>2007</h1>
                <p>内容描述4</p>
              </div>
            </li>
            <li>2008
              <div class="ui-once">
                <h1>2008</h1>
                <p>内容描述5</p>
              </div>
            </li>
            <li>2009
              <div class="ui-once">
                <h1>2009</h1>
                <p>内容描述6</p>
              </div>
            </li>
            <li>2013
              <div class="ui-once">
                <h1>2013</h1>
                <p>内容描述7</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { headmaster } from 'api/index';

  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
  	data() {
  		return {
  			name: '',
        list: {
          right: [],
          data: [],
          xAxis: []
        },
        listQuery: {
          period: 2017,
          grade: '初一年级'
        },
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
          pageNo: 1,
          pageSize: 30,
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
      this.initChart();
    	this.getList();
    },
  	methods: {
  		getList() {
        headmaster(this.listQuery).then(response => {
          console.log(response);
          this.list.right = response.data.right;
          this.list.data = response.data.data;
          this.list.title = response.data.title;
          this.setOption()
        });
      },
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption() {
        _that = this;
        this.chart.setOption({
          title: {
            text: '总分监控表',
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
          legend: {
            orient: 'vertical',
            bottom: '25%',
            right: _that.list.right
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
            data: ['语文', '数学', '英语', '物理', '化学', '生物', '思品', '历史', '地理', '总分', '折合总分']
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              textStyle: {
              	color: '#333'
              }
            }
          }],
          series: [{
            name: '得分率',
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
            data: _that.list.data[0],
          }, {
            name: '超均率',
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
            data: _that.list.data[1],
          }, {
            name: '位置',
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
            data: _that.list.data[2],
          }, {
            name: '进步值',
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
            data: _that.list.data[3],
          }]
        })
			}
  	}
  }
</script>