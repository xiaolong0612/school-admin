<template>
	<div>
		<!-- <div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSchool" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学科">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
					  <el-option value="语文" key="语文">
					  </el-option>
					  <el-option value="数学" key="数学">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
			</el-form>
		</div> -->
		<div class="ui-table-wrap clearfix">
			<div class="ui-table-title-wrap">
				<router-link class="fr" to="/achievement/teaching-average">
					<el-button type="warning" size="small">查看教学班</el-button>
				</router-link>
				<h3 class="ui-table-title">
					<wscn-icon-svg icon-class="shuxian"/>
					{{name}}
				</h3>
			</div>
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
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { getAllClassScoreRate } from 'api/score';
	export default {
		data() {
			return {
				name: '所有考试全区行政班均分监控表',
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
        	grade: '',
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
        console.log(this.listQuery)
        getAllClassScoreRate(this.listQuery).then(res => {
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