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
	import { getStudentScore } from 'api/student';
	export default {
		data() {
			return {
				name: '',
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
       		studentId: '',
        }
			}
		},
		computed: {
      ...mapGetters([
        'uid'
      ])
    },
		mounted() {
			
			this.setDefault();
      this.getList();
		},
		methods: {
			setDefault(){
				this.listQuery.studentId = this.uid;
			},
			getList() {
        this.listLoading = true;
        getStudentScore(this.listQuery).then(res => {
        	this.name = res.data.name;
        	let data = res.data.data;
        	console.log(data)
          this.list.data = data.data;
          this.list.head = data.head;
          this.total = res.data.total;
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