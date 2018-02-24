<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">
				
				<el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="getPaperList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="考试">
        	 <el-select v-model="listQuery.paperId" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in paperList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专题/考点">
        	<el-cascader
			    	expand-trigger="click"
			    	v-model="fromTest"
					  :options="testSpecialTopic"
					  @change="getList"
			    	clearable
    				change-on-select>
					</el-cascader>
        </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border >
					<el-table-column type="expand">
						<template scope="props">
							<el-form label-position="left" style="background-color:#fbfdff">
								<el-row :gutter="30">
								  <el-col :span="12">
								  	<el-form-item label="题干">
								  		<br>{{props.row.title}}
								  	</el-form-item>
								  </el-col>
								  <el-col :span="12">
								  	<el-form-item label="题目内容">
											<br>{{props.row.content}}
								  	</el-form-item>
								  </el-col>
								</el-row>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column prop='name' label="试卷">
						<template scope="scope">
							<a @click="getList('paperId', scope.row)" class="c-blue">{{scope.row.name}}</a>
						</template>
					</el-table-column>
					<el-table-column prop='questionNumber' label="题号" width="100" sortable :sort-method="tableSort"></el-table-column>
					<!-- <el-table-column prop='testSpecialTopic' label="专题" width="150"></el-table-column>
					<el-table-column prop='testName' label="考点" width="150"></el-table-column>
					<el-table-column prop='testLevelCode' label="层级编号" width="150"></el-table-column>
					<el-table-column prop='testLevelName' label="层级名称" width="150"></el-table-column> -->
					<!-- <el-table-column prop='title' label="题干"></el-table-column> -->
					<el-table-column prop='score' label="分数" sortable width="100"></el-table-column>
					<el-table-column prop='score' label="专题／考点">
						<template scope="scope">
							<a @click="getList('testTopicId', scope.row)" class="c-blue">{{scope.row.testSpecialTopic}}</a>
							 / 
							<a @click="getList('testSitesId', scope.row)" class="c-blue">{{scope.row.testName}}</a>
						</template>
					</el-table-column>
					<!-- <el-table-column prop='content' label="题目内容"></el-table-column> -->
					<el-table-column prop='analysis' label="质量分析">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.analysis"></el-input>
							<span v-show="!scope.row.edit">{{scope.row.analysis}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='teachAdvice' label="教学建议">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.teachAdvice"></el-input>
							<span v-show="!scope.row.edit">{{scope.row.teachAdvice}}</span>
						</template>
					</el-table-column>
					
					<el-table-column v-if="hasPermission()" label="操作" width="140px">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<i class="el-icon-edit mr10" @click="scope.row.edit = true"></i>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="el-icon-success" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="el-icon-circle-close" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div v-show="!listLoading" class="pagination-container fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
	import { getLatestTest, attrGrade, attrPeriod } from 'utils/auth';
	import { getTestSitesList, getUseTestSites } from 'api/test/test';
  import { getAllPeriod } from 'api/list';
	import { listInstructorQualityAnalysis, modTeachAdvice } from 'api/special';
	import { getExaminationPaperList } from 'api/test/paper';
	export default {
		data() {
			return {
				name: '质量分析',
				screenHeight: 0,
				testSitesList: [],
				fromTest: [],
				paperList: [],
				periodList: [],
        testSpecialTopic: [],
				listQuery: {
					pageNo: 1,
					pageSize: 50,
					testTopicId: '',
					testSitesId: '',
					paperId: '',
					period: ''
				},
				paperQuery: {
					period: '',
					subject: '',
					paperId: ''
				},
				list: [],
				backList: [],
				listLoading: false,
				total: 0,
				is_edit: false,
				testQuery: {
        	subject: '',
        	id: 0
        },
			}
		},
		computed: {
      ...mapGetters([
        'roles',
        'subject',
        'gradeNo'
      ])
    },
		mounted() {
			this.getAllPeriod();
			this.getTestSitesList();
			this.getTestSpecialTopic(0);
			// this.getList()
		},
		methods: {
			hasPermission(){
				return this.roles.indexOf('7') != -1;
			},
			setDefault(){
				
				this.testQuery.subject = this.subject;
				this.paperQuery.subject = this.subject;
				this.paperQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
				this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
				this.getPaperList();
			},

      getAllPeriod(){
        getAllPeriod().then(res => {
          this.periodList = res.data.list;
          this.setDefault();
        })
      },
			getTestItem(index, val) {
      	getUseTestSites({subject: this.subject, id:val}).then(res => {
      		if(typeof res == 'undefined' || res.data.list.length == 0) return [];
      		let list = res.data.list;
      		var children = [];
    			for(let item=0; item<list.length; item++){
      			children.push({
      				label: list[item].name,
      				value: list[item].id
      			})
      		};
      		this.testSpecialTopic[index].children = children;
      	})
      },
      getTestSpecialTopic() {
      	getUseTestSites({subject: this.subject, id:0}).then(res => {
      		if(typeof res == 'undefined'){
      			this.testSpecialTopic = [];
      			return;
      		}
      		for(let item in res.data.list){
      			this.testSpecialTopic.push({
      				label: res.data.list[item].name,
      				value: res.data.list[item].id,
      				children: []
      			})
      			this.getTestItem(item, res.data.list[item].id)
      		}
      	})
      },
			getTestSitesList(){
				let query = {
          pageNo: 1,
          pageSize: 100,
          name: '',
          subject: this.subject,
          parentId: '0'
        };
				getTestSitesList(query).then( res => {
					this.testSitesList = res.data.list;
					// this.getList();
				})
			},
			getPaperList(type){
				switch(type){
          case 'period':
            attrPeriod(this.paperQuery.period);
            break;
        }
				this.listQuery.paperId = '';
				getExaminationPaperList({
					pageNo: 1,
					pageSize: 500,
					period: this.listQuery.period,
					subject: this.subject,
				}).then( res => {
					this.paperList = res.data.list;
					this.listQuery.paperId = this.paperList[0].id;
					this.getList();
				})
			},
			getList(type, val){
				this.listLoading = true;
				console.log(this.fromTest)
				this.listQuery.testSpecialTopicId = this.fromTest[0];
				this.listQuery.testTopicId = this.fromTest[1] == undefined ? '' : this.fromTest[1];
				if(typeof type != 'undefined'){
					if(type == 'testTopicId'){
						this.listQuery.testTopicId = val.testSpecialTopicId;
						this.fromTest = [];
						this.fromTest[0] = this.listQuery.testTopicId

					}else if(type == 'testSitesId'){
						this.listQuery.testTopicId = val.testSpecialTopicId;
						this.listQuery.testSitesId = val.testSitesId;

						this.fromTest[0] = this.listQuery.testTopicId;
						this.fromTest[1] = this.listQuery.testSitesId;
					}else if(type == 'paperId'){
						this.listQuery.paperId = val.examinationPaperId
					}
					
				}
				listInstructorQualityAnalysis(this.listQuery).then(res => {
					if(typeof res == 'undefined'){
						this.list = [];
						this.listLoading = false;
					}
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
						this.getList();
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
      },
      queryChange(){
      	this.getPaperList();
      },
      tableSort(a, b){
      	a = a.questionNumber.split('_');
      	b = b.questionNumber.split('_');
      	let a_len = a.length;
      	let b_len = b.length;
      	let len = 0;
      	if(a_len <= b_len) len = b_len;
      	else len = a_len;
      	for(let i=0; i<len; i++){
      		if(typeof a[i] != 'undefined' && typeof b[i] != 'undefined'){
      			if(parseInt(a[i]) > parseInt(b[i])) return true;
      			else if(parseInt(a[i]) < parseInt(b[i])) return false;
      			else continue;
      		}else if(typeof a[i] == 'undefined' && typeof b[i] != 'undefined'){
      			return true
      		}else if(typeof a[i] != 'undefined' && typeof b[i] == 'undefined'){
      			return false
      		}else{
      			return true
      		}
      	}
      }
		}
	}
</script>

