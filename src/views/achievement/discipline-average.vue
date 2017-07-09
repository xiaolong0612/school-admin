<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
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
				<el-table :data="list" border style="width: 100%" :max-height="screenHeight">
					<el-table-column prop="school" label="学校" width="120" fixed>
						<template scope='scope'>
							<router-link to="/achievement/teaching-average">
								{{scope.row.school}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-columnlabel='入学考试' header-align='center'>
						<el-table-column prop="number1" label="平均分" width="100"></el-table-column>
						<el-table-column prop="number2" label="区位置" width="100" sortable>
						</el-table-column>
					</el-table-column>
					<el-table-column label='七上质检' header-align='center'>
						<el-table-column prop="number1" label="备课组长" width="100"></el-table-column>
						<el-table-column prop="number2" label="均分" width="100"></el-table-column>
						<el-table-column prop="number3" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float1" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number2" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number4" label="市位置" width="100"></el-table-column>
						<el-table-column prop="float3" label="进步值" width="100"></el-table-column>
					</el-table-column>
					<el-table-column label='七下质检' header-align='center'>
						<el-table-column prop="name3" label="备课组长" width="100"></el-table-column>
						<el-table-column prop="number5" label="均分" width="100"></el-table-column>
						<el-table-column prop="number6" label="得分率" width="100"></el-table-column>
						<el-table-column prop="float3" label="超均率" width="100"></el-table-column>
						<el-table-column prop="number5" label="区位置" width="100"></el-table-column>
						<el-table-column prop="number1" label="市位置" width="100"></el-table-column>
						<el-table-column prop="number2" label="进步值" width="100"></el-table-column>
					</el-table-column>
				</el-table>
				<div v-show="!listLoading" class="page-wrap fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import { fetchList, fetchPv } from 'api/data';
	export default {
		data() {
			return {
				name: '所有考试全区各校学科均分监控表',
				screenHeight: 0,
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
        	selectedSchool: '启悟中学',
					selectedSubject: '语文'
        }
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