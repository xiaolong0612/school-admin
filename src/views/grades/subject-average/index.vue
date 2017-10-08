<template>
	<div>
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
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import store from 'store';
	import { getSchoolScoreRateBySubjectAndPeriodAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '学科均分监控',
				screenHeight: 0,
				list: {
					data: [],
					head: []
				},
				total: null,
        listLoading: true,
        listQuery: {
        	pageNo: 1,
        	pageSize: 30,
          period: 2017,
          subject: "语文",
          grade: "初一年"
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
      this.listQuery.subject = this.subject;
      this.listQuery.grade = this.gradeNo;

    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getSchoolScoreRateBySubjectAndPeriodAndGrade(this.listQuery).then(res => {
          this.list.data = res.data.data.data;
          this.list.head = res.data.data.head;
          this.total = res.data.data.total;
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