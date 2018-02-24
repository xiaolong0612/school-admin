<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="班级类型">
          <el-select v-model="listQuery.subject" filterable placeholder="请选择" @change="subjectChange">
            <el-option label="语文" value="语文"></el-option>
            <el-option label="数学" value="数学"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="化学" value="化学"></el-option>
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
	import { getLatestTest } from 'utils/auth';
	import { getSchoolScoreRateBySubjectAndPeriodAndGrade_2 } from 'api/subject';
	export default {
		data() {
			return {
				name: '学校各科均分',
				list: {
					data: [],
					head: []
				},
				screenHeight: 0,
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          period: 2019,
          grade: '七年级',
          subject: '语文'
        }
			}
		},
		mounted() {
			
			this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){
				

        let paper = JSON.parse(getLatestTest());
	      this.listQuery.paperId = paper.id;
	      this.listQuery.grade = paper.grade;
	      
			},
			getList() {
        this.listLoading = true;
        getSchoolScoreRateBySubjectAndPeriodAndGrade_2(this.listQuery).then(response => {
          this.list.data = response.data.data.data;
          this.list.head = response.data.data.head;
          this.total = response.data.total;
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
      subjectChange(val){
      	this.listQuery.subject = val;
      	this.getList();
      }
		}
	}
</script>