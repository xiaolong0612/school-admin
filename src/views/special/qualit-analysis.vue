<template>
	<div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border :max-height="screenHeight">
					<el-table-column prop='name' label="试卷" width="150"></el-table-column>
					<el-table-column prop='questionNumber' label="题号" width="100" sortable></el-table-column>
					<!-- <el-table-column prop='testSpecialTopic' label="专题" width="150"></el-table-column>
					<el-table-column prop='testName' label="考点" width="150"></el-table-column>
					<el-table-column prop='testLevelCode' label="层级编号" width="150"></el-table-column>
					<el-table-column prop='testLevelName' label="层级名称" width="150"></el-table-column> -->
					<el-table-column prop='title' label="题干" width="350"></el-table-column>
					<el-table-column prop='score' label="分数" width="100" sortable></el-table-column>
					<el-table-column prop='content' label="题目内容" width="350"></el-table-column>
					<el-table-column prop='analysis' label="质量分析" width="350">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.analysis"></el-input>
							<span v-show="!scope.row.edit">{{scope.row.analysis}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='teachAdvice' label="教学建议" width="350">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.teachAdvice"></el-input>
							<span v-show="!scope.row.edit">{{scope.row.teachAdvice}}</span>
						</template>
					</el-table-column>
					
					<el-table-column v-if="hasPermission()" label="操作" width="140">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button type="info" icon="edit" size="small" @click="scope.row.edit = true"></el-button>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="circle-check" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="circle-cross" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="pagination-container fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
	import { listInstructorQualityAnalysis, modTeachAdvice } from 'api/special';
	export default {
		data() {
			return {
				name: '质量分析',
				screenHeight: 0,
				listQuery: {
					pageNo: 1,
					pageSize: 30,
					grade: '九年级',
					peroid: 2017,
					testSitesId: 156
				},
				list: [],
				backList: [],
				listLoading: [],
				total: 0,
				is_edit: false
			}
		},
		computed: {
      ...mapGetters([
        'roles'
      ])
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList()
		},
		methods: {
			hasPermission(){
				return this.roles.indexOf('7') != -1;
			},
			getList(){
				this.listLoading = true;
				listInstructorQualityAnalysis(this.listQuery).then(res => {
					this.list = res.data.list;
					this.total = res.data.totalPage;
					this.listLoading = false;
					if(this.hasPermission()){
						for(let i=0; i<this.list.length; i++){
	        		this.$set(this.list[i], 'edit', false);
	        	}
	        	this.backList = JSON.parse(JSON.stringify(this.list));
					}
				})
			},
			handleMod(scope){
				let data = {
					id: scope.row.id,
					teachAdvice: scope.row.teachAdvice,
					analysis: scope.row.analysis
				}
				modTeachAdvice( data ).then(res => {
					scope.row.edit = false;
					if(res.data.success){
						this.backList[scope.$index].teachAdvice = data.teachAdvice;
						this.backList[scope.$index].analysis = data.analysis;
						this.$message.success('编辑成功');
					}
				})
			},
			handleCancel(scope){
				scope.row.teachAdvice = this.backList[scope.$index].teachAdvice;
				scope.row.analysis = this.backList[scope.$index].analysis;
				scope.row.edit = false;
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

