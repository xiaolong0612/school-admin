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
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column prop="test" label="历次" width="150" fixed></el-table-column>
					<el-table-column prop="number5" label="语文" width="60">
						<el-table-column label='优秀数' width="100">
							<template scope="scope">
								<div :formatter="formatter(scope.row.number5)" :style="{color: formatter(scope.row.number5)}">{{scope.row.number5}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="数学" width="60">
						<el-table-column label='优秀数' width="100">
							<template scope="scope">
								<div :formatter="formatter(scope.row.number4)" :style="{color: formatter(scope.row.number4)}">{{scope.row.number4}}</div>
							</template>
						</el-table-column>
						</el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="英语" width="60">
						<el-table-column label='优秀数' width="100">
							<template scope="scope">
								<div :formatter="formatter(scope.row.number3)" :style="{color: formatter(scope.row.number3)}">{{scope.row.number3}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="思品" width="60">
						<el-table-column prop="number1" label='优秀数' width="100">
							<template scope="scope">
								<div :formatter="formatter(scope.row.number1)" :style="{color: formatter(scope.row.number1)}">{{scope.row.number1}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="历史" width="60">
						<el-table-column prop="number3" label='优秀数' width="100"></el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="地理" width="60">
						<el-table-column prop="number3" label='优秀数' width="100"></el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="物理" width="60">
						<el-table-column prop="number3" label='优秀数' width="100"></el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="化学" width="60">
						<el-table-column prop="number3" label='优秀数' width="100"></el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column prop="number5" label="生物" width="60">
						<el-table-column prop="number3" label='优秀数' width="100"></el-table-column>
						<el-table-column prop="float3" label="优秀率" width="100"></el-table-column>
						<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
					</el-table-column>
				</el-table>
				<!-- <div v-show="!listLoading" class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div> -->
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
	];
	export default {
		data() {
			return {
				name: '历次考试学校各科优良率监控表',
				screenHeight: 0,
				subjectList,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 4,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
					selectedSubject: '启悟中学'
        }
			}
		},
		created() {
      this.getList();
    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
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
      	this.listQuery.page++;
      	if(this.listQuery.page == 6){
      		this.listQuery.page = 1;
      	}
      	this.getList();
      }
		}
	}
</script>