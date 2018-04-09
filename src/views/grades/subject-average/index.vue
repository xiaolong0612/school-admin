<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">

				<el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="getList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable clearable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目">
          <el-select v-model="listQuery.subject " filterable placeholder="请选择" @change="getList('subject')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
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
				<el-table v-if="!listLoading && data_null" v-loading.body="listLoading" :data="list.data" border style="width: 100%"  stripe :max-height="screenHeight">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' :header-align="first.children != undefined ? 'center' : 'left'">
	          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name'>
		            <template scope="scope">
		              <div v-if="second.name == '进步值'" :style="{color: scope.row[first.value][second.value] < 0 ? 'red' : '#333'}">{{scope.row[first.value][second.value]}}</div>
		              <div v-else>{{scope.row[first.value][second.value]}}</div>
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
  import { getLatestTest, attrPeriod, attrGrade, attrSubject } from 'utils/auth';
	import { gradeList, periodList } from 'utils/data';
  import { getPaperList, getAllPeriod } from 'api/list';
	import store from 'store';
	import { getSchoolScoreRateBySubjectAndPeriodAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '学科均分监控',
				screenHeight: 0,
				periodList: [],
        gradeList: [],
        subjectList: [],
				list: {
					data: [],
					head: []
				},
				total: null,
        listLoading: true,
        data_null: true,
        listQuery: {
        	pageNo: 1,
        	pageSize: 50,
          period: '',
          subject: "",
          grade: ""
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
			this.setForm();
			this.setDefault();
		},
		methods: {
			setForm(){
				this.gradeList = this.user.grade.split(',');
        this.subjectList = this.user.userinfo.subject.split(',');
			},
			setDefault(){
				
				this.listQuery.subject = this.subject;
				this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];

				this.getAllPeriod();

			},
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
					this.listQuery.period = typeof attrPeriod() != 'undefined' ?  attrPeriod() : this.periodList[0];
        	this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];
          this.getList('');
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
        getSchoolScoreRateBySubjectAndPeriodAndGrade(this.listQuery).then(res => {
        	if(typeof res == 'undefined'){
            this.list.data = [];
            this.list.head = [];
            this.total = 0;
          	this.listLoading = false;
            this.data_null = false;
          	return;
        	}
          this.list.data = res.data.data.data;
          this.list.head = res.data.data.head;
          this.total = res.data.data.total;
          this.data_null = true;
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