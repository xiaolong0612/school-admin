<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

        <el-form-item label="届">
          <el-select v-model="paperQuery.period" filterable clearable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="paperQuery.grade" filterable clearable placeholder="请选择" @change="queryChange('grade')">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="科目">
          <el-select v-model="paperQuery.subject" filterable clearable placeholder="请选择" @change="queryChange('subject')">
            <el-option v-for="item in subjectList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="→"></el-form-item>
        <el-form-item label="试卷">
          <el-select v-model="listQuery.name" filterable clearable placeholder="请选择" @change="getList">
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
				<el-table v-loading="listLoading" :data="list.data" border style="width: 100%">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name'>
	          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name'>
		            <template scope="scope">
		              <div>{{scope.row[first.value][second.value]}}</div>
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
	import store from 'store';
	import { mapGetters } from 'vuex';
  import { periodList, gradeList, subjectList } from 'utils/data';
  import { getPaperList } from 'api/list';
	import { getLatestTest } from 'utils/auth';
	import { allStudentScore } from 'api/grades';
	export default {
		data() {
			return {
				name: '学生成绩监控',
        periodList: periodList(),
        gradeList:[],
        subjectList: subjectList(),
        paperList: [],
				screenHeight: 0,
				list: {
					data: [],
					head: []
				},
        listLoading: false,
        total: null,
        listQuery: {
          pageNo: 1,
					pageSize: 50,
					name: ''
        },
        paperQuery: {
          period: '2019',
          grade: '七年级',
          subject: ''
        }
			}
		},
		computed: {
      ...mapGetters([
        'subject',
        'gradeNo'
      ])
    },
		mounted() {
      this.setForm();
      this.setDefault(this.getPaperData());
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
      setDefault(callbak){
        this.paperQuery.period = this.periodList[0].value;
        this.paperQuery.grade = this.gradeList[0].label;
        this.paperQuery.subject = this.subjectList[0].value;
        if(typeof callbak == 'function') callbak
      },
      queryChange(val){
        this.getPaperData();
      },
      getPaperData(){
        this.listQuery.name = '';
        getPaperList(this.paperQuery).then( res => {
          if(typeof res == 'undefined'){
          	this.paperList = [];
          	return
          };
          this.paperList = res.data.list;
        })
      },
			getList() {
        this.listLoading = true;
        this.listQuery.period = this.paperQuery.period;
        this.listQuery.grade = this.paperQuery.grade;
        allStudentScore(this.listQuery).then(res => {
        	if(typeof res == 'undefined'){
        		this.list.data = [];
        		this.listLoading = false;
        		return
        	}
          var data = res.data.data;
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