<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">	
				<el-form-item label="学校选择">
          <el-select v-model="listQuery.schoolId" filterable placeholder="请选择" @change="schoolChange">
            <el-option v-for="item in schoolList" :label="item.name" :value="item.id" :key="item.id">
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
				<el-table :data="list.data" border style="width: 100%" :height="screenHeight">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' sortable>
	          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name' sortable>
	            <template scope="scope">
	              <div>{{scope.row[first.value][second.value]}}</div>
	            </template>
	          </el-table-column>

	          <template scope="scope" v-if="first.children == undefined">
	            <div>{{scope.row[first.value]}}</div>
	          </template>
	        
	        </el-table-column>
	    	</el-table>
				<div v-show="!listLoading" class="page-wrap fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getLatestTest } from 'utils/auth';
	import { mapGetters } from 'vuex';
	import { getClassLowGradeRateByPeriodAndGradeAndSchoolIdTable } from 'api/grades';
	import { getAllSchoolList } from 'api/info-administration/school';
	export default {
		data() {
			return {
				name: '全区各科优良率比较',
				list: {},
				schoolList: [],
				screenHeight: 0,
				total: null,
        listLoading: true,
        listQuery: {
          period: '',
          grade: '',
          pageNo: 1,
          pageSize: 30,
          schoolId: ''
        }
			}
		},
		computed: {
      ...mapGetters([
        'schoolId',
        'gradeNo'
      ])
    },
		created() {
    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
			this.getSchoolList();
      this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){

        let paper = JSON.parse(getLatestTest());

        this.listQuery.schoolId = this.schoolId;
	      this.listQuery.grade = this.gradeNo;
	      this.listQuery.period = paper.period;
			},
			getList() {
        this.listLoading = true;
        getClassLowGradeRateByPeriodAndGradeAndSchoolIdTable(this.listQuery).then(res => {
        	console.log(res)
          this.list['data'] = res.data.data.data;
          this.list['head'] = res.data.data.head;
          this.total = res.data.data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      getSchoolList(){
      	getAllSchoolList().then(res => {
      		this.schoolList = res.data.list;
      	})
      },
      schoolChange() {
      	this.getList();
      }
		}
	}
</script>