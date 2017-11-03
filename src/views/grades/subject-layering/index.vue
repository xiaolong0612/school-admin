<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">

				<el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable clearable placeholder="请选择" @change="queryChange('grade')">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

				<!-- <el-form-item label="班级类型">
          <el-select v-model="classTyoeQuery.state" filterable placeholder="请选择" @change="queryChange('state')">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="行政班" :value="0"></el-option>
            <el-option label="教学班" :value="1"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="→"></el-form-item>

        <el-form-item label="考试列表">
          
        </el-form-item>

			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<div class="ui-table-title-wrap">
				<h3 class="ui-table-title">
					<wscn-icon-svg icon-class="shuxian"/>
					{{name}}
				</h3>
			</div>
			<div class="ui-table-main">
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="schoolName" label="学校" fixed>
						<template scope="scope">
							<!-- <router-link to="/achievement/administration-discipline-hierarchy"> -->
							{{scope.row.schoolName}}
							<!-- </router-link> -->
						</template>
					</el-table-column>
					<el-table-column prop="className" label="班级" width="100" sortable v-if="classTyoeQuery.state != -1">
					</el-table-column>
					<el-table-column prop="examineeCount" label="生数" width="90" sortable>
					</el-table-column>
					<el-table-column prop='gradeLeader' label='备课组长' width="120"></el-table-column>
					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpSchoolScoreRate.averageRate" label="平均分" sortable></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.scoreRate" label="得分率" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.averageValue" label="超均率" sortable></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.ranking" label="名次" sortable></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.progressValue" label="进步值" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpSchoolExcellentRate.excellentCount" label="优良数" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.excellentRate" label="优良率" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.ranking" label="名次" sortable></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.progressValue" label="进步值" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='及格率' header-align='center'>
						<el-table-column 
							prop="tmpSchoolPassRate.passCount" label="及格数" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.passRate" label="及格率" sortable>
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.ranking" label="名次" sortable></el-table-column>
						<el-table-column prop="tmpSchoolPassRate.progressValue" label="进步值" sortable></el-table-column>
					</el-table-column>
					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeCount" label="低分数" sortable></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeRate" label="低分率" sortable></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.progressValue" label="进步值" sortable></el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div v-show='!listLoading' class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
  import { getLatestTest } from 'utils/auth';
	import { gradeList, periodList } from 'utils/data';
	import { getPaperScore, getClassScore} from 'api/grades';
	export default {
		data() {
			return {
				name: '',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        periodList: periodList(),
        gradeList: [],
        listQuery: {
          id: '',
          pageNo: 1,
          pageSize: 50,
          grade: '',
          period: ''
        },
        classTyoeQuery: {
        	id: '',
          pageNo: 1,
          pageSize: 50,
          state: -1
        },
        classType: ''
			}
		},
		mounted() {
			this.setForm();
			this.setDefault();
			this.getList();
		},
		methods: {
			setForm(){
				let grade_list = gradeList('all');
	      for(let i=0; i<grade_list.length; i++){
	        for(var o=0; o<grade_list[i].options.length; o++){
	          this.gradeList.push(grade_list[i].options[o]);
	        }
	      };
			},
			setDefault(){
				this.screenHeight = this.setTableHeight(true);
				console.log(this.gradeList)
				this.listQuery.grade = this.gradeList[0].label;
				this.listQuery.period = this.periodList[0].value;
			},
			getList() {
        this.listLoading = true;
        let paper = JSON.parse(getLatestTest());
        this.listQuery.id = paper.id;
        getPaperScore(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.name = response.data.name;
          this.listLoading = false;
        })
      },
      getclassTypeListData(){
      	this.listLoading = true;
        let paper = JSON.parse(getLatestTest());
        this.classTyoeQuery.id = paper.id;
        getClassScore(this.classTyoeQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.name = response.data.name;
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
      queryChange(val){
      	if(this.classTyoeQuery.state == -1){
        	this.listQuery.pageNo = 1;
      		this.getList();
      	}else{
        	this.classTyoeQuery.pageNo = 1;
      		this.getclassTypeListData();
      	}
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>