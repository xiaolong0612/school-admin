<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">	
				<el-form-item>
	        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
	      </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<a @click="isA4 = !isA4" class="fr mr15"><span class="cWhite">切换查看方式</span></a>
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}-试题列表
			</h3>
			<div class="A4" v-if="isA4">
				<h2 class="paper-title">{{name}}</h2>
				<ul class="big_list">
					<li class="big_item mb25" v-for="item in list">
						<h3 class="big_title mb10">{{item.title}}{{item.testSpecialTopic}}/{{item.testName}}</h3>
						<p class="big_content ml25">{{item.content}}</p>
					</li>
				</ul>
			</div>
			<div class="ui-table-main" v-else>
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%"  :default-sort = "{prop: 'questionNumber'}">
					
					<el-table-column type="expand">
			      <template scope="scope">
			        <el-form label-position="left" inline class="demo-table-expand pr100">
			        	<el-row :gutter="20">
								  <el-col :span="6">
								  	<el-form-item label="题干">
					            <el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.title"></el-input>
          						<span v-show="!scope.row.edit">{{scope.row.title}}</span>
					          </el-form-item>
								  </el-col>
								  <el-col :span="6">
								  	<el-form-item label="题目">
					            <el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.content"></el-input>
          						<span v-show="!scope.row.edit">{{scope.row.content}}</span>
					          </el-form-item>
								  </el-col>
								  <el-col :span="6">
								  	<el-form-item label="附件">
					            <el-upload
					            	v-show="scope.row.edit"
											  class="upload-demo"
							  				:data="scope.row"
											  :action="gpath.action" 
											  :on-success='handlePicSuccess'
											  :on-remove="handlePicRemove"
											  :file-list="fromData.pic">
											  <el-button size="small" type="primary">点击上传</el-button>
											</el-upload>
          						<div class='file-list' v-show="!scope.row.edit">
												<a target="_blank" :href="item.url" v-for="item in scope.row.pic">
													<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
														<div class="file_item">
															<img class="file_icon" :src='"/static/img/suffix/"+ item.suffix+".png"' />
															<p class="file_name">{{item.name}}</p>
														</div>
													</el-tooltip>
												</a>
				          		</div>
					          </el-form-item>
								  </el-col>
								</el-row>
								<el-row>
								  <el-col :span="12">
								  	<el-form-item label="参考答案">
					            <el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入内容" v-model="scope.row.answer"></el-input>
          						<span v-show="!scope.row.edit">{{scope.row.answer}}</span>
					          </el-form-item>
								  </el-col>
								  <el-col :span="12">
								  	<el-form-item label="试题解析">
					            <el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入内容" v-model="scope.row.analysis"></el-input>
          						<span v-show="!scope.row.edit">{{scope.row.analysis}}</span>
					          </el-form-item>
								  </el-col>
								</el-row>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="questionNumber"
			      label="题号"
			      width="100"
			      sortable
			      :sort-method="tableSort">
			      <template scope="scope">
			      	<el-input v-show="scope.row.edit" placeholder="请输入内容" v-model="scope.row.questionNumber"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.questionNumber}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="title"
			      label="题干">
			      <template scope="scope">
			      	<p class="eli-2">{{scope.row.title}}</p>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="content"
			      label="题目">
			      <template scope="scope">
			      	<p class="eli-2">{{scope.row.content}}</p>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="score"
			      label="分值"
			      width="100">
			      <template scope="scope">
			      	<el-input v-show="scope.row.edit" placeholder="请输入内容" v-model="scope.row.score"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.score}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      label="专题／考点"
			      width="250">

			      <template scope="scope">
					    <el-cascader
					    	v-show="scope.row.edit"
					    	expand-trigger="hover"
					    	v-model="scope.row.defaultTest"
							  :options="testSpecialTopic"
							  @active-item-change="getTestItem">
							</el-cascader>
          		<span v-show="!scope.row.edit">{{scope.row.testSpecialTopic}}/{{scope.row.testName}}</span>
						</template>

			    </el-table-column>

			    <el-table-column
			      prop="scoreCriterion"
			      label="评分标准">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="scope.row.scoreCriterion"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.scoreCriterion}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="cases"
			      label="典型案例">
			      <template scope="scope">
			      	<el-upload
			      		v-show="scope.row.edit"
							  class="upload-demo"
							  :data="scope.row"
							  :action="gpath.action" 
							  :on-success='handleCasesSuccess'
							  :on-remove="handleCasesRemove"
							  :file-list="scope.row.cases">
							  <el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
							<div class='file-list' v-show="!scope.row.edit">
								<a target="_blank" :href="item.url" v-for="item in scope.row.cases">
									<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
										<div class="file_item">
											<img class="file_icon" :src='"/static/img/suffix/"+ item.suffix+".png"' />
											<p class="file_name">{{item.name}}</p>
										</div>
									</el-tooltip>
								</a>
          		</div>
						</template>
			    </el-table-column>

					<el-table-column prop="" label="操作" width="140">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<i class="el-icon-edit mr10" @click="handleEditRow(scope)"></i>
								<i class="el-icon-delete" @click="showDiallogDel(scope.row)"></i>

								<!-- <el-button type="info" icon="el-icon-edit" size="small" @click="handleEditRow(scope)"></el-button>
								<el-button type="danger" icon="el-icon-delete" size="small" @click="showDiallogDel(scope.row)"></el-button> -->
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="el-icon-success" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="el-icon-circle-close" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div v-show="!listLoading" class="pagination-container fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
		  </div>
		</div>
		<el-dialog
		  title="添加试题"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <el-form class="small-space ui-form" :model="fromData" label-position="right" :rules="rules" ref="fromData" label-width="100px" style="padding:0 30px;">

        <el-form-item label="题号" prop="questionNumber">
          <el-input v-model="fromData.questionNumber"></el-input>
        </el-form-item>

        <el-form-item label="题干">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="fromData.title"></el-input>
        </el-form-item>

        <el-form-item label="题目">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.content">
          </el-input>
        </el-form-item>

        <el-form-item label="附件">
          <el-upload
					  class="upload-demo"
					  :action="gpath.action" 
					  :on-success='formPicSuccess'
					  :on-remove="formPicRemove"
					  :file-list="fromData.pic">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
        </el-form-item>

        <!-- <el-form-item label="内容" prop="content">
          <el-input v-model="fromData.content"></el-input>
        </el-form-item> -->

        <el-form-item label="分值" prop="score">
          <el-input v-model.number="fromData.score"></el-input>
        </el-form-item>
				
				<el-form-item label="专题/考点" prop="testSpecialTopicId">
					<el-cascader
			    	expand-trigger="hover"
			    	v-model="fromDataDefaultTest"
					  :options="testSpecialTopic"
					  @active-item-change="getTestItem">
					</el-cascader>
				</el-form-item>

        <el-form-item label="评分标准">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.scoreCriterion">
          </el-input>
        </el-form-item>

        <el-form-item label="典型例题" prop="cases">

        	<el-upload
					  class="upload-demo"
					  :action="gpath.action" 
					  :on-success='formCasesSuccess'
					  :on-remove="formCasesRemove"
					  :file-list="fromData.cases">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>

          <span v-show="false" v-model="fromData.cases">
          </span>
        </el-form-item>
				
      </el-form>
      <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleAdd" type="primary">确定</el-button>
      	<el-button @click="resetForm">重置</el-button>
      	<el-button @click="dialogVisible = false" :plain="true" type='warning'>取消</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogDel"
		  size="tiny">
		  <span>确定要删除</span>
		  <span style="color: red">{{del_content.questionNumber}}{{del_content.title}}</span>
		  <span>吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDel = false">取 消</el-button>
		    <el-button type="primary" @click="handleDel()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { getExaminationPaperItemList, addExaminationPaperItem, modExaminationPaperItem, delExaminationPaperItem} from 'api/test/examination';
	import { getUseTestSites } from 'api/test/test';
	export default {
		data() {
			return {
				isA4: true,
				name: '',
				list: [],
				casesList: [],
				backList: [],
				screenHeight: 0,
				total: 0,
        listLoading: true,
        dialogVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          examinationPaperId: this.$route.params.id
        },
        testQuery: {
        	subject: '',
        	id: 0
        },
        testSpecialTopic: [],
        testSpecialTopicItem: [],
        testSpecialTopicOption: {
        	value: 'value',
        	label: 'label',
        	children: 'childred'
        },
        testName: [],
        fromData: {
        	subject: '',
        	questionNumber: '',
					testSitesId: '',
					testCode: '1',
					testSpecialTopicId: '',
					title: '',
					content: '',
					score: '',
					answer: '',
					analysis: '',
					examinationPaperId: '',
					cases: [],
					scoreCriterion: '',
					pic:[]
        },
        fromDataDefaultTest: [],
        rules: {
        	questionNumber: [
            { required: true, trigger: 'blur', message: '请填写题号' }
          ],
        	score: [
            { required: true, type: 'number', trigger: 'blur', message: '请填写分值' }
          ],
        	testSpecialTopicId: [
            { required: true, trigger: 'blur', message: '请选择专题考点' }
          ]
        },
        dialogVisible: false,
        dialogDel: false,
        del_content: {}
			}
		},
		created() {
			this.name = this.$route.params.name;

			this.testQuery.subject = this.$route.params.subject;
    },
		mounted() {
			
      this.getList();
      this.getTestSpecialTopic(0);
		},
		methods: {
			getList() {
        this.listLoading = true;
        getExaminationPaperItemList(this.listQuery).then(response => {
        	this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        		this.$set(this.list[i], 'defaultTest', []);
        		if(this.list[i].cases == '' || this.list[i].cases == null){
        			this.list[i].cases=[]
        		}else{
        			this.list[i].cases = JSON.parse(this.list[i].cases);
        		}
        		if(this.list[i].pic == '' || this.list[i].pic == null){
        			this.list[i].pic=[]
        		}else{
        			this.list[i].pic = JSON.parse(this.list[i].pic);
        		}
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      getTestList(id) {
      	this.testQuery.parentId = id;
      	getUseTestSites(this.testQuery).then(res => {
      		if(typeof res == 'undefined') return;
      		return res.data.list
      	})
      },
      getTestSpecialTopic() {
      	this.testQuery.id = 0;
      	getUseTestSites(this.testQuery).then(res => {
      		if(typeof res == 'undefined') return;
      		for(let item in res.data.list){
      			this.testSpecialTopic.push({
      				label: res.data.list[item].name,
      				value: res.data.list[item].id,
      				children: []
      			})
      		}
      	})
      },
      getTestItem(val) {
      	this.testQuery.id = val[0];
      	getUseTestSites(this.testQuery).then(res => {
      		if(typeof res == 'undefined' || res.data.list.length == 0) return;
      		let list = res.data.list;
      		for(let i=0; i<this.testSpecialTopic.length; i++){
      			if(this.testSpecialTopic[i].value == val[0]){
	      			this.testSpecialTopic[i].children = [];
	      			for(let item=0; item<list.length; item++){
		      			this.testSpecialTopic[i].children.push({
		      				label: list[item].name,
		      				value: list[item].id
		      			})
		      		}
	      		}
      		}
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
      handleAdd(){
      	let data ={
        	subject: this.$route.params.subject,
        	questionNumber: this.fromData.questionNumber,
					testSitesId: this.fromDataDefaultTest[1],
					testCode: '1',
					testSpecialTopicId: this.fromDataDefaultTest[0],
					title: this.fromData.title,
					content: this.fromData.content,
					score: this.fromData.score,
					answer: this.fromData.answer,
					analysis: this.fromData.analysis,
					scoreCriterion: this.fromData.scoreCriterion,
					examinationPaperId: this.$route.params.id
        };
        if(this.fromData.cases.length == 0){
        	data.cases = '';
        }else{
        	data.cases= JSON.stringify(this.fromData.cases)
        }
        if(this.fromData.pic.length == 0){
        	data.pic = '';
        }else{
        	data.pic= JSON.stringify(this.fromData.pic)
        }
  			addExaminationPaperItem(data).then(response => {
  				if(typeof response == 'undefined') return;
          this.$message({
	          message: '添加成功',
	          type: 'success'
	        });
	        this.dialogVisible = false;
	        this.getList();
		      this.resetForm();
      	})
      },
      handleMod(scope){
      	let data = {};
      	for(let i in scope.row){
      		if(i == 'cases') data[i] = JSON.stringify(scope.row[i]);
      		else if(i == 'pic'){
      			data[i] = JSON.stringify(scope.row[i]);
      		}
      		else if(i == 'testSitesId') data[i] = scope.row.defaultTest[1];
      		else if(i == 'testSpecialTopicId') data[i] = scope.row.defaultTest[0];
      		else if(i == 'defaultTest') continue;
      		else data[i] = scope.row[i];
      	}
      	modExaminationPaperItem(data).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        this.getList();
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		address: this.backList[index].address,
      		cases: this.backList[index].cases,
      		pic: this.backList[index].pic
      	}
      	scope.row.cases = bridge.cases;
      	scope.row.edit = false;
      },
      handleDel() {
      	this.dialogDel = false;
      	delExaminationPaperItem(this.del_content.id).then(response => {
      		if(typeof response != 'undefined'){
      			this.$message({
		          message: '删除成功',
		          type: 'success'
		        });
		        this.getList();
		        this.dialogDel = false;
      		}
      	})
      },
      showDiallogDel(row){
      	this.del_content = row;
      	this.dialogDel = true;
      },
      resetForm() {
      	this.fromData={
        	subject: '',
        	questionNumber: '',
					testSitesId: '',
					testCode: '1',
					testSpecialTopicId: '',
					title: '',
					content: '',
					score: '',
					answer: '',
					analysis: '',
					examinationPaperId: '',
					cases: [],
					pic: []
        }
      },
     //  formPicSuccess(res, file, fileList){
     //  	if(!res.success) return;
     //  	this.fromData.pic = '';
     //  	var tempCases = [];
     //  	for (var item in fileList) {
     //  		tempCases.push({
					// 	name: fileList[item].name,
  			// 		originalName: fileList[item].originalName,
  			// 		size: fileList[item].size,
  			// 		suffix: fileList[item].suffix,
  			// 		url: fileList[item].response.url
					// })
     //  	}
     //  	this.fromData.pic = JSON.stringify(tempCases);
     //  },
     //  formPicRemove(file, fileList) {
     //  	this.fromData.cases = '';
     //  	var tempCases = [];
     //  	for (var item in fileList) {
     //  		tempCases.push({
					// 	name: fileList[item].name,
  			// 		originalName: fileList[item].originalName,
  			// 		size: fileList[item].size,
  			// 		suffix: fileList[item].suffix,
  			// 		url: fileList[item].response.url
					// })
     //  	}
     //  	this.fromData.pic = JSON.stringify(tempCases);
     //  },

     //  handlePicSuccess(res, file, fileList){
     //  	if(!res.success) return;
     //  	if(typeof res.id != 'undefined'){
     //  		for(let i=0; i<this.list.length; i++){
     //  				this.list[i].pic.push({
     //  					name: res.originalName,
     //  					originalName: res.name,
     //  					size: res.size,
     //  					suffix: res.suffix,
     //  					url: res.url
     //  				});
     //  			}
     //  		}
     //  	}
     //  },
     //  handlePicRemove(file, fileList) {
     //  	for(let i=0; i<this.list.length; i++){
     //  		for(let c=0; c<this.list[i].pic.length; c++){
     //  			if(this.list[i].pic[c].url == file.url){
     //  				this.list[i].pic = [];
     //  				for(let f=0; f<fileList.length; f++){
     //  					this.list[i].pic.push({
     //  						name: fileList[f].name,
	    //   					originalName: fileList[f].originalName,
	    //   					size: fileList[f].size,
	    //   					suffix: fileList[f].suffix,
	    //   					url: fileList[f].url
     //  					})
     //  				}
     //  			}
     //  		}
     //  	}
     //  },
      handleCasesSuccess(res, file, fileList){
      	console.log(res)
      	if(!res.success) return;
      	if(typeof res.id != 'undefined'){
      		for(let i=0; i<this.list.length; i++){
      			if(this.list[i].id == res.id){

      				this.list[i].cases.push({
      					name: res.originalName,
      					originalName: res.name,
      					size: res.size,
      					suffix: res.suffix,
      					url: res.url
      				});
      			}
      		}
  			}
      },
      handleCasesRemove(file, fileList) {
      	for(let i=0; i<this.list.length; i++){
      		for(let c=0; c<this.list[i].cases.length; c++){
      			if(this.list[i].cases[c].url == file.url){
      				this.list[i].cases = [];
      				for(let f=0; f<fileList.length; f++){
      					this.list[i].cases.push({
      						name: fileList[f].name,
	      					originalName: fileList[f].originalName,
	      					size: fileList[f].size,
	      					suffix: fileList[f].suffix,
	      					url: fileList[f].url
      					})
      				}
      			}
      		}
      	}
      },
      handleEditRow(scope) {
      	scope.row.edit = true;
      	scope.row.defaultTest = [scope.row.testSpecialTopicId, scope.row.testSitesId]
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
      			
      			if(parseInt(a[i]) > parseInt(b[i])){
      				// console.log(a[i], b[i], true);
      				return true;
      			}
      			else if(parseInt(a[i]) < parseInt(b[i])){
      				// console.log(a[i], b[i], false);
      				return false;
      			}
      			else continue;
      		}else if(typeof a[i] == 'undefined' && typeof b[i] != 'undefined'){
      			// console.log(a[i], b[i], true)
      			return true
      		}else if(typeof a[i] != 'undefined' && typeof b[i] == 'undefined'){
      			// console.log(a[i], b[i], false)
      			return false
      		}else{
      			// console.log(a[i], b[i], true)
      			return true
      		}
      	}
      }
		}
	}
</script>