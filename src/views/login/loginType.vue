<template>
	<el-row>
	  <el-col :span="8" v-for="(item, index) in loginType" :key="item.type">
	    <el-card :body-style="{ padding: '0px' }">
	      <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
	      <div style="padding: 14px;" @click="loginGetType(item.type)">
	        <span>{{item.name}}</span>
	        <div class="bottom clearfix">
	          <time class="time">{{ currentDate }}</time>
	          <el-button type="text" class="button">操作按钮</el-button>
	        </div>
	      </div>
	    </el-card>
	  </el-col>
	</el-row>
</template>

<script>
	//  store from '../../store'
	export default {
		data() {
			return {
				currentDate: new Date(),
				loginType: [
					{
						name: '领导',
						type: 'leader'
					},
					{
						name: '老师',
						type: 'teacher'
					},
					{
						name: '学生',
						type: 'student'
					}
				],
			}
		},
		mounted: function() {

		},
		methods: {
			loginGetType: function(type){
            	this.$store.dispatch('SetLoginType', type).then((res) => {
                	this.$router.push({ path: '/login' });
            	})
			}
		}

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoprd>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>