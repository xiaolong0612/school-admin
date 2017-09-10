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
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight">
					<el-table-column
			      prop="nameCode"
			      label="编号"
			      width="150"
			      fixed>
	      		<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.address"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.nameCode}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="name"
			      label="考点名称"
			      width="100">
			    </el-table-column>

			    <el-table-column
			      prop="parentName"
			      label="专题名称"
			      width="100">
			    </el-table-column>

			    <el-table-column
			      prop="subject"
			      label="科目"
			      width="120">
			    </el-table-column>

			    <el-table-column
			      prop="teacherName"
			      label="录入人"
			      width="120">
			    </el-table-column>

			    <el-table-column
			      prop="analysis"
			      label="题目分析"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="scoreCriterion"
			      label="评分标准"
			      width="120">
			    </el-table-column>

			    <el-table-column
			      prop="cases"
			      label="典型案例"
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

        <el-form-item label="班级名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <el-form-item label="专题名称" prop="parentName">
          <el-input v-model="fromData.parentName"></el-input>
        </el-form-item>

        <el-form-item label="层级名称" prop="levelName">
          <el-input v-model="fromData.levelName"></el-input>
        </el-form-item>

        <el-form-item label="科目" prop="subject">
          <el-select v-model="fromData.subject" filterable placeholder="请选择">
				    <el-option
				      v-for="item in subject"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
        </el-form-item>

				<!-- <el-form-item label="班级名称" prop="name">
					<region-picker :data="data"></region-picker>
				</el-form-item> -->

        <el-form-item label="试卷分析" prop="analysis">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.analysis">
          </el-input>
        </el-form-item>

        <el-form-item label="评分标准" prop="scoreCriterion">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.scoreCriterion">
          </el-input>
        </el-form-item>

        <el-form-item label="典型案例" prop="cases">
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
	import { getTestSitesList, addTestSites, modTestSites, delTestSites} from 'api/test/test';
	import { validataPhone } from 'utils/validate';
	const valiPhone = (rule, value, callback) => {
		if (!validataPhone(value)) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
	};
	export default {
		data() {
			return {
				name: '考点管理',
				list: [],
				screenHeight: 0,
				total: 0,
				subject: ['语文', '数学', '英语', '物理', '化学', '地理', '历史', '政治'],
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          name: '',
          type: ''
        },
        fromData: {
        	name: '',
					nameCode: '',
					parentId: '',
					parentName: '',
					levelCode: '',
					levelName: '',
					subject: '',
					schoolId: '',
					analysis: '',
					scoreCriterion: '',
					cases: ''
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
        getTestSitesList(this.listQuery).then(res => {
        	this.list = res.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = res.data.total;
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
			        this.getList();
	        	})
          } else {
            console.log('error submit!!');
            return false;
          }
      	})
      },
      handleMod(scope){
      	modTestSites(scope.row).then(res => {
      		if(typeof res == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        let bridge = {
	      		address: scope.row.address,
	      		introduce: scope.row.introduce,
	      		linkName: scope.row.linkName,
	      		telephone: scope.row.telephone,
	      		index: scope.$index
	      	}

      		this.backList[bridge.index].address = bridge.address;
      		this.backList[bridge.index].introduce = bridge.introduce;
      		this.backList[bridge.index].linkName = bridge.linkName;
      		this.backList[bridge.index].telephone = bridge.telephone;
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
      	delTestSites(id).then(res => {
      		if(typeof res != 'undefined'){
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