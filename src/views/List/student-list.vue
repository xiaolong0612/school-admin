<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">
				<el-form-item>
	        <el-upload
				    class="upload-demo"
				    ref="upload"
				    :action="'http://118.178.93.124/admin/upload?type=1&teacherId='+uid"
				    :on-success='onSuccess'
				    :on-error='onErroe'
				    type="file"
				    accept=".xlsx, .xls"
				    :file-list="fileList">
				    <el-button slot="trigger" type="primary">导入学生列表</el-button>
				  </el-upload>
	      </el-form-item>
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
				<el-table :data="list" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name'}">

					<el-table-column prop='name' label="姓名" width="90" sortable>
						<template scope="scope">
          		<span>{{scope.row.name}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='sexStr' label="性别" width="90" sortable>
						<template scope="scope">
			      	<el-select  v-show="scope.row.edit" v-model="scope.row.sex" placeholder="请选择">
		          	<el-option
						      label="男"
						      value="0">
						    </el-option>
		          	<el-option
						      label="女"
						      value="1">
				   		  </el-option>
						  </el-select>
          		<span v-show="!scope.row.edit">{{scope.row.sexStr}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='studentNo' label="学号" width="160" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.studentNo"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.studentNo}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='studentSecondNo' label="学籍辅号" width="160" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.studentSecondNo"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.studentSecondNo}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='grade' label="年级" width="90" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.grade"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.grade}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='classNo' label="班级" width="90" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.classNo"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.classNo}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='birthdayStr' label="出生年月" width="120" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.birthdayStr"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.birthdayStr}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='startSchoolTime' label="入学时间" width="130" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.startSchoolTime"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.startSchoolTime}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='telephone' label="联系方式" width="130" sortable>
						<template scope="scope">
			      	<el-input v-show="scope.row.edit" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.telephone"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.telephone}}</span>
						</template>
					</el-table-column>

					<el-table-column prop="" label="操作" width="140" fixed="right">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button type="info" icon="el-icon-edit" size="small" @click="scope.row.edit = true"></el-button>
								<el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.row.id)"></el-button>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="el-icon-success" size="small" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="el-icon-circle-close" size="small" @click="handleCancel(scope)"></el-button>
							</div>
						</template>
					</el-table-column>

				</el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	  <el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <el-form class="small-space ui-form" :model="fromData" label-position="right" :rules="rules" ref="fromData" label-width="100px" style="padding:0 30px;">

				<el-form-item label="学号" prop="studentNo">
          <el-input v-model="fromData.studentNo"></el-input>
        </el-form-item>

        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="fromData.sexStr" multiple placeholder="请选择">
          	<el-option
				      label="男"
				      value="0">
				    </el-option>
          	<el-option
				      label="女"
				      value="1">
				    </el-option>
				  </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="fromData.age"></el-input>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
			      v-model="fromData.birthday"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
        </el-form-item>

        <el-form-item label="入学时间(年)" prop="startSchoolTime">
          <el-input v-model="fromData.startSchoolTime"></el-input>
        </el-form-item>

        <el-form-item label="年级" prop="grade">
          <el-input v-model="fromData.grade"></el-input>
        </el-form-item>

        <el-form-item label="座号" prop="seatNum">
          <el-input v-model="fromData.seatNum"></el-input>
        </el-form-item>

        <el-form-item label="班级" prop="classNo">
          <el-input v-model="fromData.classNo"></el-input>
        </el-form-item>

        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="fromData.address"></el-input>
        </el-form-item>

       <!--  <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="fromData.telephone"></el-input>
        </el-form-item> -->

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="fromData.email"></el-input>
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
	import { mapGetters } from 'vuex';
	import { getListStudent, addStudent, delStudent,  modStudent, } from 'api/info-administration/student';
	export default {
		data() {
			return {
				name: '学生列表',
				screenHeight: 0,
				list: [],
				backList: [],
				fileList:[],
				total: 0,
        listLoading: true,
        dialogVisible: false,
        sexOptions: [
	        {
	          value: '0',
	          label: '男'
	        }, {
	          value: '1',
	          label: '女'
	        }
	      ],
	      sex_val_to_str: {
	      	0: '男',
	      	1: '女'
	      },
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          name: '',
          studentNo: ''
        },
        fromData: {
        	studentNo: '',
        	name: '',
        	sex: '',
        	age: '',
        	birthday: '',
        	startSchoolTime: '',
        	grade: '',
        	seatNum: '',
        	classNo: '',
        	address: '',
        	// telephone: '',
        	email: ''
        },
        rules: {
	        studentNo: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	name: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	sex: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	age: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	birthday: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	startSchoolTime: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	grade: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	seatNum: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	classNo: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	address: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
        	// telephone: [
	        // 	{ required: true, message: '必填项', trigger: 'blur' },
	        // ],
        	email: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ]
	      }
			}
		},
		computed: {
      ...mapGetters([
        'uid'
      ])
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        getListStudent(this.listQuery).then(response => {
          this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      handleSuccess(response, file, fileList) {

      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getList();
      },
      onUpInfo() {
      },
      onSuccess(response, file, fileList) {
      	console.log(response)
      	this.$message({
          message: '文件上传成功',
          type: 'success'
        });
        this.$router.push('/task/list');
      },
      onErroe(err, file, fileList) {
      	this.$message({
          message: '文件上传失败',
          type: 'success'
        });
      },
      handleAdd(formName){
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
      			addStudent(this.fromData).then(response => {
      				if(typeof response == 'undefined') return;
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
      	scope.row.sexStr = this.sex_val_to_str[scope.row.sex];
      	console.log(scope.row.sex)
      	modStudent(scope.row).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
      		this.getList();
	       //  let bridge = {
	      	// 	name: scope.row.name,
	      	// 	sexStr: scope.row.sexStr,
	      	// 	studentNo: scope.row.studentNo,
	      	// 	studentSecondNo: scope.row.studentSecondNo,
	      	// 	grade: scope.row.grade,
	      	// 	classNo: scope.row.classNo,
	      	// 	birthdayStr: scope.row.birthdayStr,
	      	// 	startSchoolTime: scope.row.startSchoolTime,
	      	// 	// telephone: scope.row.telephone,
	      	// 	email: scope.row.email,
	      	// 	index: scope.$index
	      	// }

      		// this.backList[bridge.index].name = bridge.name;
      		// this.backList[bridge.index].sexStr = bridge.sexStr;
      		// this.backList[bridge.index].studentNo = bridge.studentNo;
      		// this.backList[bridge.index].studentSecondNo = bridge.studentSecondNo;
      		// this.backList[bridge.index].grade = bridge.grade;
      		// this.backList[bridge.index].classNo = bridge.classNo;
      		// this.backList[bridge.index].birthdayStr = bridge.birthdayStr;
      		// this.backList[bridge.index].startSchoolTime = bridge.startSchoolTime;
      		// // this.backList[bridge.index].telephone = bridge.telephone;
      		// this.backList[bridge.index].email = bridge.email;
      		// scope.row.edit = false;
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		name: this.backList[index].name,
      		sexStr: this.backList[index].sexStr,
      		studentNo: this.backList[index].studentNo,
      		studentSecondNo: this.backList[index].studentSecondNo,
      		grade: this.backList[index].grade,
      		classNo: this.backList[index].classNo,
      		birthdayStr: this.backList[index].birthdayStr,
      		startSchoolTime: this.backList[index].startSchoolTime,
      		// telephone: this.backList[index].telephone,
      		email: this.backList[index].email
      	}
      	scope.row.name = bridge.name;
      	scope.row.sexStr = bridge.sexStr;
      	scope.row.studentNo = bridge.studentNo;
      	scope.row.studentSecondNo = bridge.schoolName;
      	scope.row.grade = bridge.grade;
      	scope.row.classNo = bridge.classNo;
      	scope.row.birthdayStr = bridge.birthdayStr;
      	scope.row.startSchoolTime = bridge.startSchoolTime;
      	// scope.row.telephone = bridge.telephone;
      	scope.row.email = bridge.email;
      	scope.row.edit = false;
      },
      handleDel(id) {
      	delStudent(id).then(response => {
      		if(typeof response != 'undefined'){
      			this.$message({
		          message: '删除成功',
		          type: 'success'
		        });
		        this.getList();
      		}
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      sexChange(val) {

      }
		}
	}
</script>