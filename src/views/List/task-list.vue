<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item>
	        <el-upload
				    class="upload-demo"
				    ref="upload"
				    :action="'http://118.178.93.124/admin/upload?type=3&teacherId='+uid"
				    :on-success='onSuccess'
				    :on-error='onErroe'
				    type="file"
				    accept=".xlsx, .xls"
				    :show-file-list="false"
				    :file-list="fileList">
				    <el-button slot="trigger" type="primary">批量导入成绩</el-button>
				  </el-upload>
	      </el-form-item>
	      <el-form-item>
				<el-button type="warning" @click="handleCalculation">计算</el-button>
	      </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name'}">
					<el-table-column prop='id' label="序号" width="90" sortable></el-table-column>
					<el-table-column prop='userName' label="老师" width="90" sortable></el-table-column>
					<el-table-column prop='name' label="任务名" width="130" sortable></el-table-column>
					<el-table-column prop='stateStr' label="状态" width="160" sortable></el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { getTaskRecord, calculation } from 'api/task';
	export default {
		data() {
			return {
				name: '任务列表',
				screenHeight: 0,
				list: [],
				interval: null,
				fileList:[],
				total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 20
        },
        fromData: {}
			}
		},
		computed: {
      ...mapGetters([
        'uid'
      ])
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
			this.refreshTime();
		},
		beforeRouteLeave (to, from, next) {
		  next();
		  clearInterval(this.interval)
		},
		methods: {
			getList() {
        this.listLoading = true;
        getTaskRecord(this.listQuery).then(response => {
        	let data = response.data
          this.list = data.list;
          this.total = data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCalculation() {
      	calculation(this.uid).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '恭喜你，这是一条成功消息',
	          type: 'success'
	        });
      	})
      },
      refreshTime() {
      	var _that = this;
      	this.interval = setInterval(function() {
      		_that.getList();
      	},10000)
      },
      onSuccess(response, file, fileList) {
      	console.log(response)
      	this.$message({
          message: '文件上传成功',
          type: 'success'
        });
      },
      onErroe(err, file, fileList) {
      	this.$message({
          message: '文件上传失败',
          type: 'success'
        });
      }
		}
	}
</script>