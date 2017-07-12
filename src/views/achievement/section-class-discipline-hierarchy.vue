<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData" class="form-inline">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSchool" placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学科">
					<el-select v-model="fromData.selectedSubject" placeholder="请选择">
					  <el-option v-for="item in list" :value="item.subject" :key="item.subjent">
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
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="school" label="学校" width="150" fixed></el-table-column>
					<el-table-column prop="number1" label="生数" width="90" sortable>
					</el-table-column>
					<el-table-column prop='name1' label='备课组长' width="120"></el-table-column>
					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="float1" label="平均分" width="100"></el-table-column>
						<el-table-column prop="number2" label="得分率" width="100" sortable>
						</el-table-column>
						<el-table-column prop="number3" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number4" label="名次" width="100"></el-table-column>
						<el-table-column prop="float2" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="number5" label="优良数" width="100"></el-table-column>
						<el-table-column prop="number2" label="优良率" width="100"></el-table-column>
						<el-table-column prop="number5" label="名次" width="100"></el-table-column>
						<el-table-column prop="float4" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='及格率' header-align='center'>
						<el-table-column prop="float3" label="及格数" width="100"></el-table-column>
						<el-table-column prop="float1" label="及格率" width="100"></el-table-column>
						<el-table-column prop="number3" label="名次" width="100"></el-table-column>
						<el-table-column prop="float2" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="float3" label="低分数" width="100"></el-table-column>
						<el-table-column prop="number4" label="低分率" width="100"></el-table-column>
						<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
					</el-table-column>
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
	import { fetchList, fetchPv } from 'api/data';
	import { setTableHeight } from '../../utils/tableHeight'
	export default {
		data() {
			return {
				name: '单次考试全区各校学科分层监控表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
					selectedSubject: '语文',
					selectedschool: '启悟中学'
        }
			}
		},
		created() {
		},
		mounted() {
			this.getList();
			this.screenHeight = setTableHeight(false);
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
			formatter(row) {
				if(row.chineseScoringRate < 6){
					this.isRed = true
				}
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

			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>