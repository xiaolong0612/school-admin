<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
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
					<el-table-column prop="schoolName" key='schoolId' label="学校" width="150" fixed></el-table-column>
					<el-table-column prop='className' key="classId" label="班级" width="90" fixed></el-table-column>
					<el-table-column prop='actualExamineeCount' label="生数" width="90" fixed></el-table-column>
					<el-table-column pro
					<el-table-column label='入学' header-align='center'>
						<el-table-column prop="number1" label="总分" sortable width="100" style="color:red">
						</el-table-column>
						<el-table-column prop="float1" label="得分率" width="100" sortable></el-table-column>
						<el-table-column prop="float2" label="超均率" width="100"></el-table-column>
						<el-table-column label="区位置" width="100">
							<template scope="scope">
								<div :formatter="formatter(scope.row.number4)" :style="{color: formatter(scope.row.number4)}">{{scope.row.number4}}</div>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label='七上' header-align='center'>
						<el-table-column prop="name4" label='班主任' width="100"></el-table-column>
						<el-table-column prop="number1" label="总分" width="100"></el-table-column>
						<el-table-column prop="float4" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float3" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number8" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number6" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='七下' header-align='center'>
						<el-table-column prop="name5" label="班主任" width="100"></el-table-column>
						<el-table-column prop="number2" label="均分" width="100"></el-table-column>
						<el-table-column prop="float8" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float4" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number2" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
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
	import { getClassStudent } from 'api/total_points';
	export default {
		data() {
			return {
				name: '历次质检全区各行政班总分监控表',
				list: [],
				screenHeight: 0,
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          period: 2017			// 届
        },
        fromData: {
					selectedSubject: '启悟中学',
					selectedClass: '1'
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
        getClassStudent(this.listQuery).then(response => {
        	console.log(response);	
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
      	
      }
		}
	}
</script>