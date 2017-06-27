<template>
	<div>
		<h3 class="title-name">
			<wscn-icon-svg style="color: rgb(107,194,85);font-size: 20px" icon-class="shuxian"/>
			{{name}}
		</h3>
		<el-table :data="list" v-loading.body="listLoading" border style="width: 100%" :max-height="maxHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
			<el-table-column prop="school" label="单位" width="150" fixed>
				<template scope="scope">
					<router-link to="/fraction/administration">
						{{scope.row.school}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop='number1' label="生数" width="90" fixed></el-table-column>
			<el-table-column prop='name2' label='年段长' width="120"></el-table-column>
			<el-table-column label='入学' header-align='center'>
				<el-table-column prop="number1" label="总分" sortable width="100" style="color:red">
				</el-table-column>
				<el-table-column prop="float1" label="得分率" width="100" sortable></el-table-column>
				<el-table-column prop="float2" label="超均率" width="100"></el-table-column>
				<el-table-column label="区位置" width="100">
					<template scope="scope">
						<div :formatter="formatter(scope.row.number4)" :style="{color: formatter(scope.row.number4)}">{{scope.row.number4}}</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column label='七上' header-align='center'>
				<el-table-column prop="name4" label='年段长' width="100"></el-table-column>
				<el-table-column prop="number1" label="总分" width="100"></el-table-column>
				<el-table-column prop="float4" label="得分率" width="100"></el-table-column>
				<el-table-column prop="float3" label="超均率" width="100"></el-table-column>
				<el-table-column prop="number8" label="区位置" width="100"></el-table-column>
				<el-table-column prop="number6" label="市位置" width="100"></el-table-column>
				<el-table-column prop="number1" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='七下' header-align='center'>
				<el-table-column prop="name5" label="年段长" width="100"></el-table-column>
				<el-table-column prop="number2" label="均分" width="100"></el-table-column>
				<el-table-column prop="float8" label="得分率" width="100"></el-table-column>
				<el-table-column prop="float4" label="超均率" width="100"></el-table-column>
				<el-table-column prop="number3" label="区位置" width="100"></el-table-column>
				<el-table-column prop="number2" label="市位置" width="100"></el-table-column>
				<el-table-column prop="number5" label="进步值" width="100"></el-table-column>
			</el-table-column>
		</el-table>
		<div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
	</div>
</template>
<script>
	import { fetchList, fetchPv } from 'api/data';
	export default {
		data() {
			return {
				name: '历次质检全区总分监控表',
				list: null,
				maxHeight: '',
				isRed: false,
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
			}
		},
		created() {
      this.getList();
    },
		mounted() {
			this.maxHeight = window.innerHeight-80;
			window.onresize = () => {
	          return (() => {
	            this.maxHeight = window.innerHeight-80;
	          })()
	        }
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
      }
		}
	}
</script>