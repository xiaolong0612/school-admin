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
				<wscn-icon-svg icon-class="shuxian"/>
				{{$route.params.name}}-考点列表
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" 
				:default-sort = "{prop: 'levelCode'}">

			    <el-table-column
			      prop="levelCode"
			      label="层级编号"
			      width="150"
			      sortable>
			      <template scope="scope">
			      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.levelCode"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.levelCode}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="levelName"
			      label="层级名称"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.levelName"></el-input>
          			<span v-show="!scope.row.edit">{{scope.row.levelName}}</span>
						</template>
			    </el-table-column>

					<el-table-column
			      prop="nameCode"
			      label="考点编号"
			      width="120"
			      sortable>
	      		<template scope="scope">
	      			<el-input v-show="scope.row.edit" size="small" v-model="scope.row.nameCode"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.nameCode}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="name"
			      label="考点名称"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          			<span v-show="!scope.row.edit">{{scope.row.name}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="subject"
			      label="科目"
			      width="150">
			      <template scope="scope">
          		<span>{{scope.row.subject}}</span>
						</template>
			    </el-table-column>

			    <!-- <el-table-column
			      prop="analysis"
			      label="试卷分析"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.analysis"></el-input>
          			<span v-show="!scope.row.edit">{{scope.row.analysis}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="scoreCriterion"
			      label="评分标准"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.scoreCriterion"></el-input>
          			<span v-show="!scope.row.edit">{{scope.row.scoreCriterion}}</span>
						</template>
			    </el-table-column> -->

			    <el-table-column
			      prop="casesList"
			      label="考点解析">
			      <template scope="scope">
				      	<el-upload
				      	style="margin-top:10px;"
			      		v-show="scope.row.edit"
							  class="upload-demo"
							  :action="gpath.action"
							  :on-success="fileUpSuccess"
							  :on-remove="handleImgRemove"
							  multiple
							  :data="{id: scope.row.id}"
							  :file-list="scope.row.cases">
							  <el-button size="small" type="primary">点击上传</el-button>
							</el-upload>

							<div class='file-list' v-show="!scope.row.edit">
								<a target="_blank" :href="item.url" v-for="item in scope.row.cases">
									<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
										<div class="file_item">
											<img class="file_icon" :src='item.url' />
											<p class="file_name">{{item.name}}</p>
										</div>
									</el-tooltip>
								</a>
          		</div>
						</template>
			    </el-table-column>

					<el-table-column prop="" label="操作" width="150">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<i class="el-icon-edit mr10" @click="scope.row.edit = true"></i>
								<i class="el-icon-delete" @click="showDiallogDel(scope.row)"></i>
								<!-- <el-button type="info" icon="el-icon-edit" size="small" @click="scope.row.edit = true"></el-button>

								<el-button type="danger" icon="el-icon-delete" size="small" @click="showDiallogDel(scope.row)"></el-button> -->

							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="el-icon-success" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="el-icon-circle-close" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div v-show="!listLoading" class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
		  </div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <el-form class="small-space ui-form" :model="fromData" label-position="right" :rules="rules" ref="fromData" label-width="80px" style="padding:0 30px;">

        <el-form-item label="考点名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <el-form-item label="考点编号" prop="nameCode">
          <el-input v-model="fromData.nameCode"></el-input>
        </el-form-item>

        <el-form-item label="层级编号" prop="level_code">
          <el-input v-model="fromData.levelCode"></el-input>
        </el-form-item>

        <el-form-item label="层级名称" prop="level_name">
          <el-input v-model="fromData.levelName"></el-input>
        </el-form-item>

        <el-form-item label="考点解析" prop="cases">

        	<el-upload
					  class="upload-demo"
					  :action="gpath.action" 
					  :on-success='formImgSuccess'
					  :on-remove="formImgRemove"
					  :file-list="casesList"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>

          <span v-show="false" v-model="fromData.cases">
          </span>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleAdd('fromData')" type="primary">确定</el-button>
      	<el-button @click="resetForm('fromData')">重置</el-button>
      	<el-button @click="dialogVisible = false" :plain="true" type='warning'>取消</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogDel"
		  size="tiny">
		  <span>确定要删除</span>
		  <span style="color: red">{{del_content.nameCode}}{{del_content.name}}</span>
		  <span>吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogDel = false">取 消</el-button>
		    <el-button type="primary" @click="handleDel()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { getTestSitesList, addTestSites, modTestSitesItem, delTestSites} from 'api/test/test';
	export default {
		data() {
			return {
				name: '专题列表',
				list: [],
				casesList: [],
				screenHeight: 0,
				total: 0,
				subjectList: ['语文', '数学', '英语', '物理', '化学', '地理', '历史', '政治'],
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          name: '',
          subject: '',
          parentId: ''
        },
        fromData: {
        	name: '',
					nameCode: '',
					parentId: '',
					levelCode: '',
					levelName: '',
					subject: '',
					teacherId:  '',
					analysis: '',
					scoreCriterion: '',
					cases: '',
					casesList: []
        },
        rules: {
	        name: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					nameCode: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					parentId: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					levelCode: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					levelName: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					subject: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					teacherId:  [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ]
	      },
        dialogVisible: false,
        dialogDel: false,
        del_content: {}
			}
		},
		computed: {
      ...mapGetters([
        'uid',
        'schoolId',
      ])
    },
		created() {
			this.fromData.schoolId = this.schoolId;
			this.fromData.teacherId = this.uid;
			this.fromData.parentId = this.$route.params.id;
			this.fromData.subject = this.$route.params.subject;

      this.listQuery.subject = this.subject;
			this.listQuery.parentId = this.$route.params.id;
    },
		mounted() {
			
      this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getTestSitesList(this.listQuery).then(res => {
        	this.list = res.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        		this.$set(this.list[i], 'popover', false);
        		if(this.list[i].cases == ''){
        			this.list[i].cases = [];
        		}else{
        			this.list[i].cases = JSON.parse(this.list[i].cases);
        		}
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
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
      },
      handleAdd(formName){
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
      			addTestSites(this.fromData).then(res => {
      				if(typeof res == 'undefined') return;
	            this.$message({
			          message: '添加成功',
			          type: 'success'
			        });
			        this.dialogVisible = false;
			        this.resetForm('fromData');
			        this.getList();
	        	})
          } else {
            console.log('error submit!!');
            return false;
          }
      	})
      },
      handleMod(scope){
    		var data = {
    			id: scope.row.id,
    			parentId: scope.row.parentId,
    			name: scope.row.name,
    			nameCode: scope.row.nameCode,
    			levelName: scope.row.levelName,
    			levelCode: scope.row.levelCode,
    			analysis: "",
    			scoreCriterion: "",
    			cases: JSON.stringify(scope.row.cases),
    		};
      	modTestSitesItem(data).then(res => {
      		if(typeof res == 'undefined') return;
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
      		name: this.backList[index].name,
      		nameCode: this.backList[index].nameCode,
      		levelName: this.backList[index].levelName,
      		levelCode: this.backList[index].levelCode,
      	}
      	scope.row.name = bridge.name;
      	scope.row.nameCode = bridge.nameCode;
      	scope.row.levelCode = bridge.levelCode;
      	scope.row.levelName = bridge.levelName;
      	scope.row.edit = false;
      },
      handleDel() {
      	delTestSites(this.del_content.id).then(res => {
      		if(typeof res == 'undefined'){
      			this.dialogDel = false;
      			return;
      		}
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
		      this.getList();
		      this.dialogDel = false;
      	})
      },
      showDiallogDel(row){
      	this.del_content = row;
      	this.dialogDel = true;
      },
      resetForm(formName) {
        this.fromData={
        	name: '',
					nameCode: '',
					levelCode: '',
					levelName: '',
					casesList: []
        }
        this.casesList = [];
      },
      fileUpSuccess(res, file, fileList){
      	for(let i in this.list){
      		if(this.list[i].id == res.id ){
      			this.list[i].cases.push({
    					name: res.originalName,
    					originalName: res.name,
    					size: res.size,
    					suffix: res.suffix,
    					url: res.url
    				});
      		}
      	}
      },
      handleImgRemove(file, fileList) {
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
      formImgSuccess(res, file, fileList){
      	this.fromData.cases = '';
      	var tempCases = [];
      	for (var item in fileList) {
      		tempCases.push({
						name: fileList[item].name,
  					originalName: fileList[item].originalName,
  					size: fileList[item].size,
  					suffix: fileList[item].suffix,
  					url: fileList[item].response.url
					})
      	}

      	this.fromData.cases = JSON.stringify(tempCases);
      	// console.log(this.fromData.cases)
      },
      formImgRemove(file, fileList) {
      	this.fromData.cases = '';
      	var tempCases = [];
      	for (var item in fileList) {
      		tempCases.push({
						name: fileList[item].name,
  					originalName: fileList[item].originalName,
  					size: fileList[item].size,
  					suffix: fileList[item].suffix,
  					url: fileList[item].response.url
					})
      	}

      	this.fromData.cases = JSON.stringify(tempCases);
      }
		}
	}
</script>