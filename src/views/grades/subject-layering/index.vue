<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">

				<el-form-item label="届">
          <el-select v-model="listQuery.period" placeholder="请选择" @change="getPaperList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" placeholder="请选择" @change="getPaperList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目选择">
          <el-select v-model="listQuery.subject " filterable placeholder="请选择" @change="getPaperList('subject')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
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
          <el-select v-model="listQuery.id" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in examinationList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
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
				<el-table v-loading.body="listLoading" :data="list" stripe border style="width: 100%"  :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="schoolName" label="学校" fixed>
						<template scope="scope">
							<!-- <router-link to="/achievement/administration-discipline-hierarchy"> -->
							{{scope.row.schoolName}}
							<!-- </router-link> -->
						</template>
					</el-table-column>
					<el-table-column prop="className" label="班级" width="100" v-if="classTyoeQuery.state != -1">
					</el-table-column>
					<el-table-column prop="examineeCount" label="生数" width="90">
					</el-table-column>
					<el-table-column prop='gradeLeader' label='备课组长' width="120"></el-table-column>
					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpSchoolScoreRate.averageRate" label="平均分"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.scoreRate" label="得分率">
						</el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.averageValue" label="超均率"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.ranking" label="名次"></el-table-column>
						<el-table-column prop="tmpSchoolScoreRate.progressValue" label="进步值">
							<template scope="scope">
                  <div :style="{color: scope.row.tmpSchoolScoreRate.progressValue < 0 ? 'red' : '#333'}">
                  	{{scope.row.tmpSchoolScoreRate.progressValue}}
                  </div>
		          </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpSchoolExcellentRate.excellentCount" label="优良数"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.excellentRate" label="优良率"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.ranking" label="名次"></el-table-column>
						<el-table-column prop="tmpSchoolExcellentRate.progressValue" label="进步值">
							<template scope="scope">
                  <div :style="{color: scope.row.tmpSchoolPassRate.progressValue < 0 ? 'red' : '#333'}">
                  	{{scope.row.tmpSchoolPassRate.progressValue}}
                  </div>
		          </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label='及格率' header-align='center'>
						<el-table-column 
							prop="tmpSchoolPassRate.passCount" label="及格数">
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.passRate" label="及格率">
						</el-table-column>
						<el-table-column prop="tmpSchoolPassRate.ranking" label="名次"></el-table-column>
						<el-table-column prop="tmpSchoolPassRate.progressValue" label="进步值">
							<template scope="scope">
                  <div :style="{color: scope.row.tmpSchoolPassRate.progressValue < 0 ? 'red' : '#333'}">
                  	{{scope.row.tmpSchoolPassRate.progressValue}}
                  </div>
		          </template>
						</el-table-column>
					</el-table-column>
					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeCount" label="低分数"></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.lowGradeRate" label="低分率"></el-table-column>
						<el-table-column prop="tmpSchoolLowGradeRate.progressValue" label="进步值">
							<template scope="scope">
                  <div :style="{color: scope.row.tmpSchoolLowGradeRate.progressValue < 0 ? 'red' : '#333'}">
                  	{{scope.row.tmpSchoolPassRate.progressValue}}
                  </div>
		          </template>
						</el-table-column>
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
  import { mapGetters } from 'vuex';
  import { getLatestTest, attrPeriod, attrGrade,attrSubject } from 'utils/auth';
	import { gradeList, periodList, subjectList } from 'utils/data';
	import { getPaperList, getAllPeriod } from 'api/list';
	import { getPaperScore, getClassScore} from 'api/grades';
	export default {
		data() {
			return {
				name: '',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: false,
        periodList: [],
        gradeList: [],
        subjectList: [],
        examinationList:[],
        paperQuery: {
        	period: '',
        	grade: '',
        	subject: ''
        },
        listQuery: {
          id: '',
          pageNo: 1,
          pageSize: 50,
          grade: '',
          period: '',
          subject: ''
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
		computed: {
      ...mapGetters([
        'subject',
        'user'
      ])
    },
		mounted() {
			this.setForm();
			this.getAllPeriod();
		},
		methods: {
			setForm(){
        this.gradeList = this.user.grade.split(',');
        this.subjectList = this.user.userinfo.subject.split(',');
			},
			setDefault(){
				

				this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
				this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];

				this.getPaperList();
			},
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
			getPaperList(type){
				let query = {

          period: this.listQuery.period,
          grade: this.listQuery.grade,
          // grade: '八年级',
          subject: this.listQuery.subject
        }

        switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
          case 'subject':
            attrSubject(this.listQuery.subject);
            break;
        }

				getPaperList(query).then( res => {
					this.examinationList = [];
					this.listQuery.id = '';
					this.list = [];
					if(typeof res == 'undefined' || res.data.list.length == 0) return;
					this.examinationList = res.data.list;

					this.listQuery.id = res.data.list[0].id;
					this.getList();
				})
			},
			getList(type) {

        switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
          case 'subject':
            attrSubject(this.listQuery.subject);
            break;
        }
        this.listLoading = true;
        getPaperScore(this.listQuery).then(response => {
        	if(typeof response == 'undefined'){
            this.list = [];
            this.total = 0;
            this.name = '';
          	this.listLoading = false;
          	return;
        	}
          this.list = response.data.list;
          for(var i in this.list){
            this.list[i].tmpSchoolScoreRate.progressValue = parseFloat(this.list[i].tmpSchoolScoreRate.progressValue)
            this.list[i].tmpSchoolExcellentRate.progressValue = parseFloat(this.list[i].tmpSchoolExcellentRate.progressValue)
            this.list[i].tmpSchoolPassRate.progressValue = parseFloat(this.list[i].tmpSchoolPassRate.progressValue)
          }
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
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>