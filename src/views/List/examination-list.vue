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
				{{name}}-试题列表
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight">

			    <el-table-column
			      prop="questionNumber"
			      label="题号"
			      width="100">
			    </el-table-column>

			    <el-table-column
			      prop="title"
			      label="题干"
			      width="100">
			    </el-table-column>

			    <el-table-column
			      prop="score"
			      label="分值"
			      width="70">
			    </el-table-column>

			    <el-table-column
			      prop="testLevelName"
			      label="考题"
			      width="140">
			    </el-table-column>

			    <el-table-column
			      prop="testName"
			      label="考点"
			      width="140">
			    </el-table-column>

			    <el-table-column
			      prop="analysis"
			      label="试题解析"
			      width="420">
			      <template scope="scope">
			      	<el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.analysis"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.analysis}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="scoreCriterion"
			      label="质量分析"
			      width="140">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.scoreCriterion"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.scoreCriterion}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="cases"
			      label="典型案例"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.cases"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.cases}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="typeStr"
			      label="类型"
			      width="120">
			    </el-table-column>
					<el-table-column prop="" label="操作" width="140" fixed="right">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button type="info" icon="edit" size="small" @click="scope.row.edit = true"></el-button>
								<el-button type="danger" icon="delete" size="small" @click="handleDel(scope.row.id)"></el-button>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="circle-check" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="circle-cross" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div v-show="!listLoading" class="pagination-container fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
		        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
		  </div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <el-form class="small-space ui-form" :model="fromData" label-position="right" :rules="rules" ref="fromData" label-width="80px" style="padding:0 30px;">

        <el-form-item label="题号" prop="questionNumber">
          <el-input v-model="fromData.questionNumber"></el-input>
        </el-form-item>

        <el-form-item label="题干" prop="title">
          <el-input v-model="fromData.title"></el-input>
        </el-form-item>

        <!-- <el-form-item label="内容" prop="content">
          <el-input v-model="fromData.content"></el-input>
        </el-form-item> -->

        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.content">
          </el-input>
        </el-form-item>

        <el-form-item label="分数" prop="score">
          <el-input v-model="fromData.score"></el-input>
        </el-form-item>

        <el-form-item label="专题" prop="testSpecialTopic">
        	<el-select v-model="fromData.testSpecialTopic" placeholder="请选择专题" @change="getTest">
			      <el-option label="专题1" value="shanghai"></el-option>
			      <el-option label="专题2" value="beijing"></el-option>
			    </el-select>
          <!-- <el-input v-model="fromData.province"></el-input> -->
        </el-form-item>

        <el-form-item label="考点" prop="testName">
        	<el-select v-model="fromData.testName" placeholder="请选择专题">
			      <el-option label="专题1" value="shanghai"></el-option>
			      <el-option label="专题2" value="beijing"></el-option>
			    </el-select>
        </el-form-item>

        <el-form-item label="参考答案" prop="answer">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.answer">
          </el-input>
        </el-form-item>

        <el-form-item label="典型例题" prop="cases">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.cases">
          </el-input>
        </el-form-item>
				
      </el-form>
      <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleAdd('fromData')" type="primary">确定</el-button>
      	<el-button @click="resetForm('fromData')">重置</el-button>
      	<el-button @click="dialogVisible = false" :plain="true" type='warning'>取消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { getExaminationPaperItemList, addExaminationPaperItem, modExaminationPaperItem, delExaminationPaperItem} from 'api/test/examination';
	import { getTestSitesList } from 'api/test/test';
	export default {
		data() {
			return {
				name: '',
				list: [],
				backList: [],
				screenHeight: 0,
				total: 0,
        listLoading: true,
        dialogVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          examinationPaperId: ''
        },
        testSpecialTopic: [],
        testName: [],
        fromData: {
        	name: '',
        	subject: '',
        	questionNumber: '',
					testSitesId: '',
					testCode: '',
					testName: '',
					testSpecialTopic: '',
					testLevelCode: '',
					title: '',
					content: '',
					score: '',
					answer: '',
					analysis: '',
					scoreCriterion: '',
					examinationPaperId: '',
					cases: ''
        },
        rules: {
        	questionNumber: [
        		{ required: true, message: '必填项', trigger: 'blur' }
        	],
					testName: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					testSpecialTopic: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					title: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					content: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					score: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					answer: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					analysis: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					scoreCriterion: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					cases: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ]
	      },
        dialogVisible: false
			}
		},
		created() {
			this.listQuery.examinationPaperId = this.$route.params.id;
			this.fromData.id = this.$route.params.id;
			this.name = this.$route.params.name;
    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
      this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getExaminationPaperItemList(this.listQuery).then(response => {
        	this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      getTestSpecialTopic() {
      	alert('我要get考题');
      	this.getTestSpecialTopic = '';
      },
      getTest() {
      	alert('我要get考点')
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleAdd(formName){
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
      			addExaminationPaperItem(this.fromData).then(response => {
      				if(typeof response == 'undefined') return;
	            this.$message({
			          message: '添加成功',
			          type: 'success'
			        });
			        this.dialogVisible = false;
			        this.getList();
	        	})
          } else {
            console.log('error submit!!');
            return false;
          }
      	})
      },
      handleMod(scope){
      	modExaminationPaperItem(scope.row).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        let bridge = {
	      		index: scope.$index
	      	}

      		this.backList[bridge.index].address = ''
      		scope.row.edit = false
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		address: this.backList[index].address,
      		introduce: this.backList[index].introduce,
      		linkName: this.backList[index].linkName,
      		telephone: this.backList[index].telephone
      	}
      	scope.row.schoolName = bridge.schoolName;
      	scope.row.entryTime = bridge.entryTime;
      	scope.row.email = bridge.email;
      	scope.row.telephone = bridge.telephone;
      	scope.row.edit = false;
      },
      handleDel(id) {
      	delExaminationPaperItem(id).then(response => {
      		if(typeof response != 'undefined'){
      			this.$message({
		          message: '删除成功',
		          type: 'success'
		        });
      		}
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		}
	}
</script>