<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">

      	<el-form-item label="届">
          <el-select v-model="fromData.period" filterable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学校">
          <el-select v-model="fromData.schoolId" filterable placeholder="请选择" @change="queryChange('school')">
            <el-option v-for="item in schoolList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="fromData.grade" filterable placeholder="请选择" @change="queryChange('grade')">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.label" :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="→"></el-form-item>

        <el-form-item label="班级列表">
          <el-select v-model="listQuery.classId" filterable placeholder="请选择" @change="getList">
            <el-option v-for="item in classList" :label="item.name" :value="item.id" :key="item.id">
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
				<el-table :data="list.data" border style="width: 100%">
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
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
  import { gradeList } from 'utils/data';
	import { getLatestTest } from 'utils/auth';
	import { getSchoolList } from 'api/info-administration/school';
	import { getClassList } from 'api/list';
	import { getClassPassRateByPeriodAndClassIdAndGrade } from 'api/pass_rate';
	export default {
		data() {
			return {
				name: '学校各科及格率比较',
				list: [],
				screenHeight: 0,
				total: null,
        listLoading: true,
        gradeList: [],
        periodList: [],
        schoolList: [],
        classList: [],
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          period: 2017,
          grade: '七年级',
          classId: ''
        },
        fromData: {
					period: '',
					schoolId: '',
					grade: ''
        }
			}
		},
		computed: {
      ...mapGetters([
        'classNo'
      ])
    },
		mounted() {
			// 设置顶部搜索条件
      this.setForm();

			this.getSchoolList();
		},
		methods: {
			setDefault(){
				this.screenHeight = this.setTableHeight(true);
				this.fromData = {
					period: new Date().getFullYear(),
					schoolId: this.schoolList[0].id,
					grade: '七年级'
        };

        let paper = JSON.parse(getLatestTest());
			},
			setForm(){
        // 年级
        let grade_list = gradeList('all');
        for(let i=0; i<grade_list.length; i++){
          for(var o=0; o<grade_list[i].options.length; o++){
            this.gradeList.push(grade_list[i].options[o]);
          }
        };
        // 届
        let year = new Date().getFullYear();
        for(let i=0; i<3; i++){
          this.periodList.push({
            label: year+i,
            value: year+i,
          })
        }
      },
			getList() {
        this.listLoading = true;
        getClassPassRateByPeriodAndClassIdAndGrade(this.listQuery).then(res => {
          this.list['data'] = res.data.data.data;
          this.list['head'] = res.data.data.head;
          this.total = res.data.data.total;
          this.listLoading = false;
        })
      },
      getSchoolList(){
      	let query = {
          pageNo: 1,
          pageSize: 999,
          name: '',
          type: ''
        };
      	getSchoolList(query).then( res => {
      		this.schoolList = res.data.list;
					this.setDefault();
      		this.getClassList();
      	})
      },
      getClassList(){
      	getClassList(this.fromData).then( res => {
      		if(res.data.list.length == 0){
      			this.listQuery.classId = '';
      			this.classList = [];
      			this.list.data = [];
      		}
      		else{
      			this.classList = res.data.list;
      			this.listQuery.classId = this.classList[0].id;
      		}
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
      queryChange(val) {
      	if(val != 'school') this.listQuery[val] = this.fromData[val];
      	this.getClassList();
      }
		}
	}
</script>