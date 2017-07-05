<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData" class="form-inline">
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
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" :key="key" v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column label="考试" width="100" fixed>
						<template scope="scope">
							七上
						</template>
					</el-table-column>
					<el-table-column label="指标" width="90" fixed sortable>
						<template scope="scope">
							得分
						</template>
					</el-table-column>
					</el-table-column>
					<el-table-column prop='number2' label="语文" width='100'></el-table-column>
					<el-table-column prop='number1' label='数学' width="120"></el-table-column>
					<el-table-column prop='number3' label='英语' width="120"></el-table-column>
					<el-table-column prop='number4' label='思品' width="120"></el-table-column>
					<el-table-column prop='number5' label='历史' width="120"></el-table-column>
					<el-table-column prop='number6' label='地理' width="120"></el-table-column>
					<el-table-column prop='number7' label='物理' width="120"></el-table-column>
					<el-table-column prop='number1' label='化学' width="120"></el-table-column>
					<el-table-column prop='number2' label='生物' width="120"></el-table-column>
					<el-table-column prop='number4' label='总分' width="120"></el-table-column>
					<el-table-column prop='number6' label='折合总分' width="120"></el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { fetchList } from 'api/data';
	export default {
		data() {
			return {
				name: '同安一中初中2018届Xxx历次质检成绩总表',
				screenHeight: 0,
				list: [],
				key: 0,
				total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
					selectedSubject: '启悟中学',
					selectedClass: '1'
        }
			}
		},
		mounted() {
			this.getList();
			window.onresize = () => {
				this.screenHeight = this.setTableHeight(this.listLoading);
				this.key++;
      }
		},
		methods: {
			getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          this.autoTable();
        })
      },
      autoTable() {
        this.screenHeight = this.setTableHeight(this.listLoading);
				this.key++;
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      formatter(val) {
      	if(val < 60 ) {
      		return 'red'
      	}else if(val == 60 ) {
      		return 'rgb(251,178,23)'
      	}else if(val>90) {
      		return 'rgb(6,128,67)'
      	}
      },
      onSearch() {
      }
		}
	}
</script>