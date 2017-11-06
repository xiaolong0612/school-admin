<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="periodChange">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="gradeChange">
            <el-option v-for="item in classList" :label="item.label" :value="item.label" :key="item.label">
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
				<el-table v-loading="listLoading" :data="list.data" border style="width: 100%" :max-height="screenHeight">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' :prop='first.value' :align="first.children != undefined ? 'center' : 'left'">
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
	import { mapGetters } from 'vuex';
	import { getLatestTest } from 'utils/auth';
  import { gradeList } from 'utils/data';
	import store from 'store';
	import { getSchoolScoreRateByPaperNameAndPeriodAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '各科总分监控',
				screenHeight: 0,
				classList: [],
        periodList: [],
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
          grade: '一年级',
          paperName: '',
        }
			}
		},
		computed: {
      ...mapGetters([
        'subject',
        'gradeNo'
      ])
    },
		created() {

    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
			// 设置顶部搜索条件
      this.setForm();
			this.getList();
		},
		methods: {
			setForm(){
        // 年级
        let grade_list = gradeList('all');
        for(let i=0; i<grade_list.length; i++){
          for(var o=0; o<grade_list[i].options.length; o++){
            this.classList.push(grade_list[i].options[o]);
          }
        };
        for(let i in this.classList){
          this.$set(this.classList[i], 'select', '');
        }
        // 届
        let year = new Date().getFullYear();
        console.log(year);
        for(let i=0; i<3; i++){
          this.periodList.push({
            label: year+i,
            value: year+i,
          })
        }
      },
			getList() {
        this.listLoading = true;
        let paper = JSON.parse(getLatestTest());
	      this.listQuery.paperName = paper.name;
	      this.listQuery.period = paper.period;
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
      },
      periodChange(val){
      	this.listQuery.period = val;
				this.getList();

      },
      gradeChange(val){
      	this.listQuery.grade = val;
				this.getList();
      }
		}
	}
</script>