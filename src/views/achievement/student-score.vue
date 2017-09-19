<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
	        <el-button type="primary" @click="onSearch">查询</el-button>
	      </el-form-item>
			</el-form>
		</div>
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
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight">
					<el-table-column prop="school" label="学校" width="120" fixed></el-table-column>
					<el-table-column prop="name1" label="学生" width="100" fixed></el-table-column>
					<el-table-column prop="number1" label="班级" width="70" fixed></el-table-column>
					<el-table-column label='入学考试' header-align='center'>
						<el-table-column prop="number2" label="平均分" width="100"></el-table-column>
						<el-table-column prop="number3" label="均分" width="100" sortable>
						</el-table-column>
						<el-table-column prop="number4" label="位置" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='七上质检' header-align='center'>
						<el-table-column prop="name1" label="备课组长" width="100"></el-table-column>
						<el-table-column prop="number5" label="均分" width="100"></el-table-column>
						<el-table-column prop="float1" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float2" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number4" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number5" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number6" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='七下质检' header-align='center'>
						<el-table-column prop="name3" label="备课组长" width="100"></el-table-column>
						<el-table-column prop="number3" label="均分" width="100"></el-table-column>
						<el-table-column prop="number4" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float3" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number1" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number4" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number3" label="进步值" width="100"></el-table-column>
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
	import { fetchList, fetchPv } from 'api/data';
	const subjectList = [
		{value: '0', label: '语文'},
    	{value: '1', label: '数学'},
    	{value: '2', label: '英语'},
    	{value: '3', label: '物理'},
    	{value: '4', label: '化学'},
    	{value: '5', label: '地理'},
    	{value: '6', label: '思品'},
    	{value: '7', label: '历史'}
	]
	export default {
		data() {
			return {
				name: '所有考试全区行政班均分监控表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
					selectedSubject: '启悟中学',
					selectedClass: '1'
        },
				subjectList
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
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
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
      onSearch() {

      }
		}
	}
</script>