<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item>
	        <el-upload
				    class="upload-demo"
				    ref="upload"
				    action="http://118.178.93.124/admin/upload?type=1"
				    type="file"
				    accept=".docx, .doc, .txt"
				    :show-file-list="false"
				    :on-success="handleSuccess"
				    :file-list="fileList">
				    <el-button slot="trigger" size="small" type="primary">批量导入学生</el-button>
				  </el-upload>
	      </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name', order: 'descending'}">
					<el-table-column prop='name' label="姓名" width="90" sortable></el-table-column>
					<el-table-column prop='sexStr' label="性别" width="90" sortable></el-table-column>
					<el-table-column prop='studentNo' label="学号" width="160" sortable></el-table-column>
					<el-table-column prop='studentSecondNo' label="学籍辅号" width="160" sortable></el-table-column>
					<el-table-column prop='grade' label="年级" width="90" sortable></el-table-column>
					<el-table-column prop='classNo' label="班级" width="90" sortable></el-table-column>
					<el-table-column prop='birthdayStr' label="出生年月" width="120" sortable></el-table-column>
					<el-table-column prop='startSchoolTime' label="入学时间" width="130" sortable></el-table-column>
					<el-table-column prop='telephone' label="联系方式" width="130" sortable></el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { getListStudent } from 'api/info-administration/student';
	export default {
		data() {
			return {
				name: '学生列表',
				screenHeight: 0,
				list: [],
				fileList:[],
				total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          name: '',
          studentNo: ''
        },
        fromData: {}
			}
		},
		created() {
      
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getListStudent(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      handleSuccess(response, file, fileList) {

      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      onUpInfo() {
      	console.log('111');
      }
		}
	}
</script>