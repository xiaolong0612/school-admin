<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true">
        <el-form-item label="班级类型">
          <el-select v-model="listQuery.state" filterable placeholder="请选择" @change="stateChange">
            <el-option label="全部" value=""></el-option>
            <el-option label="教学班" value="0"></el-option>
            <el-option label="行政班" value="1"></el-option>
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
	import { quaryAllScoreRataByPeriodForPage } from 'api/total_score';
	export default {
		data() {
			return {
				name: '总分跟踪管理',
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
       		period: 2017,
       		subject: '语文',
       		grade: '七年级',
 					state: '' // 0教学班 1行政班
        }
			}
		},
		created() {
      this.getList();
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
		},
		methods: {
			getList() {
        this.listLoading = true;
        quaryAllScoreRataByPeriodForPage(this.listQuery).then(response => {
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
      stateChange(val) {
      	this.listQuery.state = val;
      	this.getList();
      }
		}
	}
</script>