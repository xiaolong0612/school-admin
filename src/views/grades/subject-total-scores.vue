<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable placeholder="请选择" @change="getList('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级选择">
          <el-select v-model="listQuery.grade" filterable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
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
	import { getLatestTest, attrGrade, attrPeriod } from 'utils/auth';
  import { gradeList, periodList } from 'utils/data';
  import { getAllPeriod } from 'api/list';
	import store from 'store';
	import { getSchoolScoreRateByPaperNameAndPeriodAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '各科总分监控',
				screenHeight: 0,
				gradeList: [],
        periodList: periodList(),
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
      },
      getAllPeriod(){
        getAllPeriod().then(res => {
          this.listQuery.period = res.data.list[0];
          this.setDefault();
        })
      },
      setDefault(){
        if(typeof attrPeriod() != 'undefined') this.listQuery.period = attrPeriod();
        else this.listQuery.period = this.periodList[this.periodList.length-1].value;
        if(typeof attrGrade() != 'undefined') this.listQuery.grade = attrGrade();
        this.getList();
      },
			getList(type) {

        switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
        }

        this.listLoading = true;
        let paper = JSON.parse(getLatestTest());
	      this.listQuery.paperName = paper.name;
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