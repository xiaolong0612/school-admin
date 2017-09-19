<template>
	<div>
		<!-- <div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班级">
					<el-select v-model="fromData.selectedClass" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.number1" :key="item.number1">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
		          <el-button type="primary" @click="onSearch">查询</el-button>
		        </el-form-item>
			</el-form>
		</div> -->
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column prop="school" label="学校" width="150" fixed></el-table-column>
					<el-table-column prop='number1' label="班级" width="90" fixed></el-table-column>
					<el-table-column prop='name5' label="学生" width="90" fixed></el-table-column>
					<el-table-column prop='name2' label='班主任' width="120"></el-table-column>
					<el-table-column label='语文' header-align='center'>
						<el-table-column prop="name3" label="教师" width="100"></el-table-column>
						<el-table-column prop="number1" label="均分" sortable width="100" style="color:red">
						</el-table-column>
						<el-table-column prop="float1" label="得分率" width="100" sortable></el-table-column>
						<el-table-column prop="float2" label="超均率" width="100"></el-table-column>
						<el-table-column label="区位置" width="100">
							<template scope="scope">
								<div>{{scope.row.number4}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="number5" label="市位置" width="100">
							<template scope="scope">
								<div>{{scope.row.number5}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="number6" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='数学' header-align='center'>
						<el-table-column prop="name4" label='教师' width="100"></el-table-column>
						<el-table-column prop="number1" label="均分" width="100"></el-table-column>
						<el-table-column prop="float4" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float3" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number8" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number6" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='英语' header-align='center'>
						<el-table-column prop="name5" label="教师" width="100"></el-table-column>
						<el-table-column prop="number2" label="均分" width="100"></el-table-column>
						<el-table-column prop="float8" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float4" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number2" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='总分' header-align='center'>
						<el-table-column prop="number1" label="均分" width="100"></el-table-column>
						<el-table-column prop="float3" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float4" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number2" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='折合总分' header-align='center'>
						<el-table-column prop="number1" label="均分" width="100"></el-table-column>
						<el-table-column prop="number3" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float7" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number2" label="进步值" width="100"></el-table-column>
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
	import { getAllStudentScore } from 'api/score';
	export default {
		data() {
			return {
				name: '单次考试全区所有学生成绩总表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          paperName: '七上考试',
          paperId: 2,
          period: 2017,
          grade: ''
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
        getAllStudentScore(this.listQuery).then(response => {
        	console.log(response);
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getList();
      },
      onSearch() {

      }
		}
	}
</script>