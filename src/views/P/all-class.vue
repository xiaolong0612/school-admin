<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData" class="form-inline">
				<el-form-item label="届">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.number4" :key="item.number4">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSchool" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
		          <el-button type="primary" @click="onSearch">查询</el-button>
		        </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column label="学校" width="150" fixed>
						<template scope="scope">
							{{scope.row.school}}
						</template>
					</el-table-column>
					<el-table-column label="班级" width="150" fixed>
						<template scope="scope">
							{{scope.row.number3}}
						</template>
					</el-table-column>
					<el-table-column label="七上">
						<el-table-column prop="name1" label="年段长" width="100"></el-table-column>
						<el-table-column prop="number7" label="P值" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label="七下">
						<el-table-column prop="name3" label="年段长" width="100"></el-table-column>
						<el-table-column prop="number7" label="P值" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label="八上">
						<el-table-column prop="name4" label="年段长" width="100"></el-table-column>
						<el-table-column prop="number7" label="P值" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label="八下">
						<el-table-column prop="name2" label="年段长" width="100"></el-table-column>
						<el-table-column prop="number7" label="P值" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='进步值' width="100">
						<template scope="scope">
							<div :formatter="formatter(scope.row.number5)" :style="{color: formatter(scope.row.number5)}">{{scope.row.number5}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="number7" label="区名次" width="100"></el-table-column>
				</el-table>
				<div v-show="!listLoading" class="page-wrap fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
			</div>
		</div>
	</div>
</template>
<script>
	import { fetchList, fetchPv } from 'api/data';
	const subjectList = [
		{value: '0', label: '语文'},
    	{value: '1', label: '数学'},
    	{value: '2', label: '英语'},
    	{value: '3', label: '物理'},
    	{value: '4', label: '化学'},
    	{value: '5', label: '地理'},
    	{value: '6', label: '思品'},
    	{value: '7', label: '历史'}
	];
	export default {
		data() {
			return {
				name: '所有考试全区所有班级p值监控表',
				subjectList,
				list: [],
				screenHeight: 0,
				isRed: false,
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
					selectedSubject: '10',
					selectedClass: '1',
					selectedSchool: ''
        }
			}
		},
		created() {
      this.getList();
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
		},
		methods: {
			getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      formatter(val) {
      	if(val < 60 ) {
      		return 'red'
      	}else if(val == 60 ) {
      		return 'rgb(251,178,23)'
      	}else if(val>90) {
      		return 'rgb(6,128,67)'
      	}
      },
      onSearch() {
      	this.listQuery.page++;
      	if(this.listQuery.page == 6){
      		this.listQuery.page = 1;
      	}
      	this.getList();
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>