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
	import { getLatestTest } from 'utils/auth';
	import { allStudentScore } from 'api/grades';
	export default {
		data() {
			return {
				name: '学生成绩监控',
				screenHeight: 0,
				list: {
					data: [],
					head: []
				},
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
					pageSize: 50,
					paperId: ''
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
			this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){
				this.screenHeight = this.setTableHeight(false);

        let paper = JSON.parse(getLatestTest());
	      this.listQuery.paperId = paper.id;
			},
			getList() {
        this.listLoading = true;
        allStudentScore(this.listQuery).then(res => {
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