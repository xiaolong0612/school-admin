<template>
	<div>
		<!-- <div class="ui-search-wrap" id="ui-search-wrap">
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
		</div> -->
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="schoolName" label="学校" width="150" fixed></el-table-column>
					<el-table-column prop="examineeCount" label="生数" width="90" sortable>
					</el-table-column>
					<el-table-column prop='gradeLeader' label='备课组长' width="120"></el-table-column>

					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpClassScoreRate.averageRate" label="平均分" width="100">
						</el-table-column>
						<el-table-column prop="tmpClassScoreRate.scoreRate" label="得分率" width="100" sortable>
						</el-table-column>
						<el-table-column prop="tmpClassScoreRate.averageValue" label="超均率" width="100"></el-table-column>
						<el-table-column prop="tmpClassScoreRate.ranking" label="名次" width="100"></el-table-column>
						<el-table-column prop="tmpClassScoreRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpClassExcellentRate.excellentCount" label="优良数" width="100"></el-table-column>
						<el-table-column prop="tmpClassExcellentRate.excellentRate" label="优良率" width="100"></el-table-column>
						<el-table-column prop="tmpClassExcellentRate.ranking" label="名次" width="100"></el-table-column>
						<el-table-column prop="tmpClassExcellentRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='及格率' header-align='center'>
						<el-table-column prop="tmpClassPassRate.passCount" label="及格数" width="100"></el-table-column>
						<el-table-column prop="tmpClassPassRate.passRate" label="及格率" width="100"></el-table-column>
						<el-table-column prop="tmpClassPassRate.ranking" label="名次" width="100"></el-table-column>
						<el-table-column prop="tmpClassPassRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpClassLowGradeRate.lowGradeCount" label="低分数" width="100"></el-table-column>
						<el-table-column prop="tmpClassLowGradeRate.lowGradeRate" label="低分率" width="100"></el-table-column>
						<el-table-column prop="tmpClassLowGradeRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { queryTmpClassBasicByPaperIdAndSchoolIdForPage } from 'api/score';
	export default {
		data() {
			return {
				name: '单次考试全区各校学科分层监控表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          paperId: 2,
          schoolId: ''
        },
        fromData: {
					selectedSubject: '语文',
					selectedschool: '启悟中学'
        }
			}
		},
		computed: {
      ...mapGetters([
        'schoolId'
      ])
    },
		created() {
			this.listQuery.schoolId = this.schoolId;
		},
		mounted() {
			this.getList();
			this.screenHeight = this.setTableHeight(false);
		},
		methods: {
			getList() {
        this.listLoading = true;
        queryTmpClassBasicByPaperIdAndSchoolIdForPage(this.listQuery).then(res => {
          this.list = res.data.list;
          this.total = res.data.total;
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