<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">	
				<el-form-item>
	        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
	      </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'name1'}">
					<el-table-column prop="id" label="序号" width="65" fixed></el-table-column>
					<el-table-column prop="parentName" label="专题名称" width="160"></el-table-column>
					<el-table-column prop="name" label="考点名称" width="100"></el-table-column>
					<el-table-column prop="levelCode" label="能力等级" width="100"></el-table-column>
					<el-table-column prop="" label="考点分析" width="160">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.fenxi"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.fenxi}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="" label="教学建议" width="160">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.jianyi"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.jianyi}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="" label="典型例题" width="160">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.liti"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.liti}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="" label="操作" width="140">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button type="info" icon="edit" size="small" @click="scope.row.edit = true"></el-button>
								<el-button type="danger" icon="delete" size="small" @click="handleDel(scope.row.id)"></el-button>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="circle-check" size="small" @click="scope.row.edit = false"></el-button>
								<el-button type="warning" icon="circle-cross" size="small" @click="scope.row.edit = false"></el-button>
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
		  <el-form class="small-space" :model="fromData" label-position="right" :rules="rules" ref="fromData" label-width="80px" style="padding:0 30px;">

        <el-form-item label="班级名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <el-form-item label="考点编号" prop="nameCode">
          <el-input v-model="fromData.nameCode" placeholder="考点可以不填写"></el-input>
        </el-form-item>

        <el-form-item label="考题" prop="parentId">
          <el-input v-model="fromData.parentId" placeholder="考点的父节点"></el-input>
        </el-form-item>

        <el-form-item label="专题名称" prop="parentName">
          <el-input v-model="fromData.parentName" placeholder="专题不填"></el-input>
        </el-form-item>

        <el-form-item label="层级编号" prop="levelCode">
          <el-input v-model="fromData.levelCode" placeholder="专题不填">
          </el-input>
        </el-form-item>

        <el-form-item label="层级名称" prop="levelName">
          <el-input v-model="fromData.levelName" placeholder="专题不填">
          </el-input>
        </el-form-item>

        <el-form-item label="科目" prop="subject">
          <el-input v-model="fromData.subject"></el-input>
        </el-form-item>

        <el-form-item label="学校ID" prop="schoolId">
          <el-input v-model="fromData.schoolId"></el-input>
        </el-form-item>

        <el-form-item label="试题分析" prop="analysis">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.analysis">
          </el-input>
        </el-form-item>

        <el-form-item label="评分标准" prop="scoreCriterion">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.scoreCriterion">
          </el-input>
        </el-form-item>

        <el-form-item label="典型例题" prop="cases">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.cases">
          </el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleMod('fromData')" type="primary">确定</el-button>
      	<el-button @click="resetForm('fromData')">重置</el-button>
      	<el-button @click="dialogVisible = false">取消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { getTestSitesList, modTestSites, addTestSites, delTestSites} from 'api/test/test';
	export default {
		data() {
			return {
				name: '考点管理',
				list: [],
				backList: [],
				screenHeight: 0,
				total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          name: []
        },
        fromData: {
        	name: '',
					nameCode: '',
					parentId: 0,
					parentName: '',
					levelCode: '',
					levelName: '',
					subject: '',
					schoolId: 0,
					analysis: '',
					scoreCriterion: '',
					cases: ''
        },
        rules: {
	        name: [
	        	{ required: true, message: '必填项', message: '必填项', trigger: 'blur' },
	        ],
					nameCode: [
	        	{},
	        ],
					parentId: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					parentName: [
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
					schoolId: [
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
    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
      this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getTestSitesList(this.listQuery).then(response => {
        	this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false)
        		this.$set(this.list[i], 'fenxi', '考点分析')
        		this.$set(this.list[i], 'jianyi', '教学建议')
        		this.$set(this.list[i], 'liti', '典型例题')
        	}
          this.backList = JSON.parse(JSON.stringify(this.list));
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
      handleMod(formName) {
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
      			addTestSites(this.fromData).then(response => {
      				if(typeof response == 'undefined') return;
	            this.$message({
			          message: '添加成功',
			          type: 'success'
			        })
	        	})
          } else {
            console.log('error submit!!');
            return false;
          }
      	})
      },
      handleDel(id) {
      	delTestSites(id).then(response => {
      		if(typeof response == 'undefined') return;
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		}
	}
</script>