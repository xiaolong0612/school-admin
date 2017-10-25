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
	import { getLatestTest } from 'utils/auth';
	import { mapGetters } from 'vuex';
	import { quaryAllScoreRataByPeriodForPage } from 'api/excellent';
	export default {
		data() {
			return {
				name: '总分跟踪管理',
				screenHeight: 0,
				list: {
					data: [],
					head: []
				},
				total: null,
        listLoading: true,
        listQuery: {
          period: '',
          pageNo: 1,
          pageSize: 30,
          grade: '',
          subject: '',
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
			this.screenHeight = this.setTableHeight(false);
			this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){

        let paper = JSON.parse(getLatestTest());

        this.listQuery.subject = this.subject;
	      this.listQuery.grade = this.gradeNo;
	      this.listQuery.period = paper.period;
			},
			getList() {
        this.listLoading = true;
	      
        quaryAllScoreRataByPeriodForPage(this.listQuery).then(res => {
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