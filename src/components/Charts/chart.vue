<template>
	<div>
		<div id="chart" :style="{height:height,width:width}"></div>
	</div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  export default {
  	props: {
	    width: {
	      type: String,
	      default: '100%'
	    },
	    height: {
	      type: String,
	      default: '600px'
	    },
	    setChartOption:{},
	    clickChart:{
	    	type: Boolean,
	    	default: false
	    },
	    xParmas: {
	    	type: Object
	    },
	    clickPath: {
	    	type: String,
	    	default: ''
	    }
	  },
  	data() {
  		return {
  			chart: null,
  		}
  	},
  	watch: {
  		setChartOption(curVal,oldVal){
  			this.chart.setOption(curVal);
        if(this.clickChart) this.addEchartClick();
  		}
  	},
  	mounted() {
  		console.log('echart组件');
      this.initChart();
    },
  	methods: {
  		initChart() {
        this.chart = echarts.init(document.getElementById('chart'), 'macarons');
      },
      setOption(){
        this.chart.setOption(this.setChartOption);
      },
      addEchartClick() {
        var _that = this;
        this.chart.on('click', params => {
          if(params.componentType === "xAxis") {
            var id = _that.xParmas[params.value];
            _that.$router.push({ path: _that.clickPath,  query: { id: id, name: params.value }});
          }
        })
      }
  	}
  }
</script>