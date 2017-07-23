<template>
	<div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column prop='grade' label="年级" width="90" sortable></el-table-column>
					<el-table-column prop='name' label="班级" width="90" sortable></el-table-column>
					<el-table-column prop='chargeTeacherName' label="班主任" width="120" sortable></el-table-column>
					<el-table-column prop='gradeTeacherName' label="年段长" width="120" sortable></el-table-column>
					<el-table-column prop='schoolName' label="学校" width="150" sortable></el-table-column>
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
	import { getListClass } from 'api/info-administration/class';
	export default {
		data() {
			return {
				name: '班级列表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          name: ''
        },
        fromData: {
					selectedSubject: '启悟中学',
					selectedClass: '1'
        }
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
        getListClass(this.listQuery).then(response => {
        	console.log(response.data.list)
          this.list = response.data.list;
          this.total = response.data.total;
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
      onSearch() {
      	console.log('111');
      }
		}
	}
</script>