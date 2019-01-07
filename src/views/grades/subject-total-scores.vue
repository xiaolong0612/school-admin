<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="getExaminationPaperSplit('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="getExaminationPaperSplit('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="科目选择">
          <el-select v-model="listQuery.subject " filterable placeholder="请选择" @change="getExaminationPaperSplit('subject')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="→"></el-form-item>
        <el-form-item label="试卷">
          <el-select v-model="listQuery.paperName" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in paperList" :label="item.name" :value="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table v-loading="listLoading" v-if="!listLoading" :data="list.data" border style="width: 100%" :max-height="screenHeight">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' :prop='first.value' :align="first.children != undefined ? 'center' : 'left'">
	          <el-table-column v-if="first.children != undefined && second.value != 'prepareLeader'" v-for='(second,index) in first.children' :label="second.name" :key='second.name' :sortable="second.name != '组长' ? true:false" :prop="first.value+'.'+second.value">
		            <template scope="scope">
                  <div v-if="second.name == '进步值'" :style="{color: scope.row[first.value][second.value] < 0 ? 'red' : '#333'}">{{scope.row[first.value][second.value]}}</div>
		              <div v-else>
                    <span v-if="second.value == 'averageRate' || second.value == 'scoreRate'">
                    {{(scope.row[first.value][second.value]*100).toFixed(2)}}%</span>
                    <span v-else>{{scope.row[first.value][second.value]}}</span>
                  </div>
		            </template>
		          </el-table-column>

		          <template scope="scope" v-if="first.children == undefined">
		            <div>{{scope.row[first.value]}}</div>
		          </template>
		        
		        </el-table-column>
		    </el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { getLatestTest, attrGrade, attrPeriod, attrSubject } from 'utils/auth';
  import { getExaminationPaperSplit, getAllPeriod } from 'api/list';
  import { gradeList, periodList } from 'utils/data';
	import store from 'store';
	import { getSchoolScoreRateByPaperNameAndPeriodAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '各科总分监控',
				screenHeight: 0,
				gradeList: [],
        periodList: [],
        paperList:[],
        subjectList: [],
				list: {
					head: [],
					data: []
				},
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          period: '',
          grade: '九年级',
          paperName: '',
        }
			}
		},
		computed: {
      ...mapGetters([
        'subject',
        'gradeNo',
        'user'
      ])
    },
		created() {

    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
			// 设置顶部搜索条件
      this.setForm();

      this.getAllPeriod();
		},
		methods: {
			setForm(){
        // 年级
        
        this.gradeList = this.user.grade.split(',');
        this.listQuery.period = this.periodList[0];
        // this.subjectList = this.user.userinfo.subject.split(',');
      },
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
      setDefault(){
        this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        // this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];
        this.getExaminationPaperSplit();
      },
      getExaminationPaperSplit(type){
        let query = {

          period: this.listQuery.period,
          grade: this.listQuery.grade,
          // grade: '八年级',
          // subject: this.listQuery.subject
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
        getExaminationPaperSplit(query).then(res => {
          if(typeof res == 'undefined' || res.data.list.length == 0){
            this.list.data = [];
            this.paperList = [];
            this.listLoading = false;
            return false;
          }
          this.paperList = res.data.list;
          this.listQuery.paperName = this.paperList[0].name;
          this.getList();
        })
      },
			getList() {
        this.listLoading = true;
        getSchoolScoreRateByPaperNameAndPeriodAndGrade(this.listQuery).then(res => {
          if(typeof res == 'undefined'){
          	// this.$message.error('sorry,没有查询到考试信息');
            this.list.data = [];
            this.listLoading = false;
          	return;
          }
          let data = res.data.data;
          this.list.data = data.data;
          this.list.head = data.head;
          this.total = data.total;
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