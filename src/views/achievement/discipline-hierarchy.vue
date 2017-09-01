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
			<div class="ui-table-title-wrap">
				<router-link class="fr" to="/achievement/teaching-discipline-hierarchy">
					<el-button type="warning" size="small">查看教学班</el-button>
				</router-link>
				<h3 class="ui-table-title">
					<wscn-icon-svg icon-class="shuxian"/>
					{{name}}
				</h3>
			</div>
			<div class="ui-table-main">
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="schoolName" label="学校" width="150" fixed>
						<template scope="scope">
							<router-link to="/achievement/administration-discipline-hierarchy">{{scope.row.schoolName}}</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="examineeCount" label="生数" width="90" sortable>
					</el-table-column>
					<el-table-column prop='gradeLeader' label='备课组长' width="120"></el-table-column>
					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpSchoolScoreRate.averageRate" label="平均分" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.scoreRate" label="得分率" width="100" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.averageValue" label="超均率" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.ranking" label="名次" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpSchoolExcellentRate.excellentCount" label="优良数" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.excellentRate" label="优良率" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.ranking" label="名次" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='及格率' header-align='center'>
						<el-table-column prop="passCount" label="及格数" width="100"></el-table-column>
						<el-table-column prop="passRate" label="及格率" width="100"></el-table-column>
						<el-table-column prop="progressValue" label="名次" width="100"></el-table-column>
						<el-table-column prop="ranking" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeCount" label="低分数" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeRate" label="低分率" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div v-show='false' class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { getPaperScore } from 'api/score';
	export default {
		data() {
			return {
				name: '',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          id: 2,
          pageNo: 1,
          pageSize: 15
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
			this.screenHeight = this.setTableHeight(false);
		},
		methods: {
			getList() {
        this.listLoading = true;
        getPaperScore(this.listQuery).then(response => {
        	console.log(response)
          this.list = response.data.list;
          this.name = this.list[0].paperName;
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