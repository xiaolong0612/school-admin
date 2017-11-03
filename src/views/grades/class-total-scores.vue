<template>
	<div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<!-- <el-table :data="list.data" border style="width: 100%">
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
		    </el-table> -->
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
	import { getLatestTest } from 'utils/auth';
	import { allStudentScore } from 'api/grades';
	export default{
		data() {
			return {
				name: '',
				screenHeight: 0,
				listLoading: true,
				total: null,
				list: {
					data: [],
					head: []
				},
				listQuery: {
					pageNo: 1,
					pageSize: 50,
					paperId: ''
				}
			}
		},
		mounted(){
			this.setDefault();
			this.getList();
		},	
		mounted: {
			setDefault(){
				this.screenHeight = this.setTableHeight(false);

        let paper = JSON.parse(getLatestTest());
	      this.listQuery.paperId = 11;
			},
			getList(){
				allStudentScore(this.listQuery).then( res=> {
					console.log(res)
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