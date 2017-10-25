<template>
	<div>
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
							<!-- <router-link to="/achievement/administration-discipline-hierarchy"> -->
							{{scope.row.schoolName}}
							<!-- </router-link> -->
						</template>
					</el-table-column>
					<el-table-column prop="examineeCount" label="生数" width="90" sortable>
					</el-table-column>
					<el-table-column prop='gradeLeader' label='备课组长' width="120"></el-table-column>
					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpSchoolScoreRate.averageRate" label="平均分" width="100"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.scoreRate" label="得分率" width="100" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.averageValue" label="超均率" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.ranking" label="名次" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.progressValue" label="进步值" width="100" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpSchoolExcellentRate.excellentCount" label="优良数" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.excellentRate" label="优良率" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.ranking" label="名次" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.progressValue" label="进步值" width="100" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='及格率' header-align='center'>
						<el-table-column 
							prop="tmpSchoolPassRate.passCount" label="及格数" width="100" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.passRate" label="及格率" width="100" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.ranking" label="名次" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolPassRate.progressValue" label="进步值" width="100" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeCount" label="低分数" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeRate" label="低分率" width="100" sortable></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.progressValue" label="进步值" width="100" sortable></el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div v-show='!listLoading' class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
  import { getLatestTest } from 'utils/auth';
	import { getPaperScore } from 'api/grades';
	export default {
		data() {
			return {
				name: '',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          id: '',
          pageNo: 1,
          pageSize: 30
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
        let paper = JSON.parse(getLatestTest());
        this.listQuery.id = paper.id;
        console.log(this.listQuery);
        getPaperScore(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
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
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>