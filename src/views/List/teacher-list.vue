<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData">

				<el-form-item label="年级选择">
          <el-select v-model="listQuery.gradeNo" placeholder="请选择" @change="getList('grade')">
				    <el-option-group
				      v-for="group in gradeList"
				      :key="group.label"
				      :label="group.label">
				      <el-option
				        v-for="item in group.options"
				        :key="item.label"
				        :label="item.label"
				        :value="item.label">
				      </el-option>
				    </el-option-group>
				  </el-select>
        </el-form-item>

				<el-form-item>
	        <el-upload
				    class="upload-demo"
				    ref="upload"
				    :action="'http://123.57.45.182:8080/admin/upload?type=2&teacherId='+uid"
				    type=file
				    :on-success='onSuccess'
				    :on-error='onErroe'
				    accept=".xlsx, .xls"
				    :show-file-list="false"
				    :file-list="fileList">
				    <el-button slot="trigger" type="primary">批量导入教师</el-button>
				  </el-upload>
	      </el-form-item>
	      <el-form-item>
	        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
	      </el-form-item>
	      <el-form-item>
	      	<el-button type="primary" @click="file_down">下载模版<i class="el-icon-printer"></i></el-button>
	      </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list" stripe v-loading.body="listLoading" border  :default-sort = "{prop: 'teacherNo'}">

					<el-table-column prop='teacherNo' label="教师编号" width="130" sortable fixed></el-table-column>

					<el-table-column prop='name' label="姓名" width="110" sortable fixed>
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.name}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='age' label="年龄" width="90" sortable>
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.age"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.age}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='sex' label="性别" width="100">
						<template scope="scope">
							<el-select v-show="scope.row.edit" v-model="scope.row.sex" placeholder="请选择">
					    	<el-option label="男" value="0"></el-option>
					    	<el-option label="女" value="1"></el-option>
					    </el-select>

          		<span v-show="!scope.row.edit">{{scope.row.sexStr}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='birthdayStr' label="出身日期" width="150">
						<template scope="scope">
							<el-date-picker
								v-show="scope.row.edit"
					      v-model="scope.row.birthdayStr"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
          		<span v-show="!scope.row.edit">{{scope.row.birthdayStr}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='nativePlace' label="籍贯" width="90">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.nativePlace"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.nativePlace}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='gradeNo' label="年级" width="90">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.gradeNo"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.gradeNo}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='classNo' label="班级" width="90">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.classNo"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.classNo}}</span>
						</template>
					</el-table-column>
					
					<el-table-column label="是否年段长" width="90">
						<template scope="scope">
						</template>
					</el-table-column>
					
					<el-table-column label="是否班主任" width="90">
						<template scope="scope">
						</template>
					</el-table-column>
					
					<el-table-column label="是否备课组长" width="90">
						<template scope="scope">
						</template>
					</el-table-column>

					<el-table-column prop='schoolName' label="所属学校" width="140">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.schoolName"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.schoolName}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='entryTime' label="入职时间" width="150">
						<template scope="scope">
							<el-date-picker
								v-show="scope.row.edit"
					      v-model="scope.row.entryTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
          		<span v-show="!scope.row.edit">{{scope.row.entryTime}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='highestEducation' label="最高学历" width="120">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.highestEducation"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.highestEducation}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='email' label="email" width="190">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.email"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.email}}</span>
						</template>
					</el-table-column>

					<el-table-column prop='telephone' label="联系方式" width="140" fixed="right">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.telephone"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.telephone}}</span>
						</template>
					</el-table-column>

					<el-table-column prop="" label="操作" width="140" fixed="right">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<i class="el-icon-edit mr10" @click="scope.row.edit = true"></i>
								<i class="el-icon-delete" @click="showDiallogDel(scope.row)"></i>
							</div>
							<div v-show="scope.row.edit">
								<el-button type="success" icon="el-icon-success" size="mini" @click="handleMod(scope)"></el-button>
								<el-button type="warning" icon="el-icon-circle-close" size="mini" @click="handleCancel(scope)"></el-button>
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
		  <el-form-item label="老师名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>
        
		  	<el-form-item label="老师编号" prop="teacherNo">
          <el-input v-model="fromData.teacherNo"></el-input>
        </el-form-item>
        
		  	<el-form-item label="年龄" prop="age">
          <el-input v-model="fromData.age"></el-input>
        </el-form-item>
        
        <el-form-item label="性别">
			    <el-radio-group v-model="fromData.sex">
			      <el-radio label="男" value="1"></el-radio>
			      <el-radio label="女" value="2"></el-radio>
			    </el-radio-group>
			  </el-form-item>
				
				<el-form-item label="生日">
			    <el-date-picker type="date" placeholder="选择日期" v-model="fromData.birthday" style="width: 100%;"></el-date-picker>
				</el-form-item>

		  	<el-form-item label="籍贯" prop="nativePlace">
          <el-input v-model="fromData.nativePlace"></el-input>
        </el-form-item>

		  	<el-form-item label="入职时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="fromData.entryTime" style="width: 100%;"></el-date-picker>
        </el-form-item>

		  	<el-form-item label="第一学历" prop="firstEducation">
          <el-input v-model="fromData.firstEducation"></el-input>
        </el-form-item>

		  	<el-form-item label="最高学历" prop="highestEducation">
          <el-input v-model="fromData.highestEducation"></el-input>
        </el-form-item>

		  	<el-form-item label="班级" prop="classNo">
          <el-input v-model="fromData.classNo"></el-input>
        </el-form-item>

		  	<el-form-item label="年级" prop="gradeNo">
          <el-select v-model="fromData.gradeNo" placeholder="请选择">
				    <el-option-group
				      v-for="group in gradeList"
				      :key="group.label"
				      :label="group.label">
				      <el-option
				        v-for="item in group.options"
				        :key="item.label"
				        :label="item.label"
				        :value="item.label">
				      </el-option>
				    </el-option-group>
				  </el-select>
        </el-form-item>

		  	<el-form-item label="身份" prop="type">
          <el-input v-model="fromData.type"></el-input>
        </el-form-item>

		  	<el-form-item label="联系方式" prop="telephone">
          <el-input v-model="fromData.telephone"></el-input>
        </el-form-item>

		  	<el-form-item label="邮箱" prop="email">
          <el-input v-model="fromData.email"></el-input>
        </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleAdd('fromData')" type="primary">确定</el-button>
      	<el-button @click="resetForm('fromData')">重置</el-button>
      	<el-button :plain="true" type='warning' @click="dialogVisible = false">取消</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogDel"
		  size="tiny">
		  <span>确定要删除</span>
		  <span style="color: red">{{del_content.name}}</span>
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
	import { getListTeacher, addTeacher, modTeacher, delTeacher} from 'api/info-administration/teacher';
	import { validataPhone } from 'utils/validate';
	import { gradeList } from 'utils/data';
	import { attrGrade } from 'utils/auth';
	export default {
		data() {
			const isPhone = (rule, value, callback) => {
        if (!validataPhone(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
			return {
				name: '老师列表',
				birthdayStrPickerOptions: {
	      	disabledDate(time){
	          return time.getTime() > Date.now();
	        }
	      },
				screenHeight: 0,
				list: [],
				backList: [],
				gradeList: gradeList('all'),
				fileList:[],
				total: 0,
        listLoading: true,
        dialogVisible: false,
        dialogDel: false,
        del_content: {},
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          name: '',
          gradeNo: '',
          schoolId: ''
        },
        fromData: {
        	name: '',
					teacherNo: '',
					age: '',
					sex: '',
					birthday: '',
					nativePlace: '',
					entryTime: '',
					firstEducation: '',
					highestEducation: '',
					classNo: '',
					gradeNo: '',
					type: '',
					schoolId: '',
					telephone: '',
					email: ''
        },
        rules: {
        	name: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					teacherNo: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					age: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					sex: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					birthday: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					nativePlace: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					firstEducation: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					highestEducation: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					classNo: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					gradeNo: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					type: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					schoolId: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					telephone: [
	        	{ required: true, message: '必填项', trigger: 'blur', validator: isPhone }
	        ],
					email: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ]
        }
			}
		},
		computed: {
      ...mapGetters([
        'uid',
        'school',
        'user'
      ])
    },
		mounted() {
			this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){
				
	    	this.fromData.schoolId = this.school.id;
				this.listQuery.schoolId = this.user.school.id;
	    	if(typeof attrGrade() == 'undefined'){
	    		this.listQuery.gradeNo  = '九年级';
	    	}else this.listQuery.gradeNo  = attrGrade();
			},
			getList(type) {
				switch(type){
					case 'grade':
					  attrGrade(this.listQuery.gradeNo);
					  break;
				}
        this.listLoading = true;
        getListTeacher(this.listQuery).then(response => {
        	if(typeof response == 'undefined'){
          	this.listLoading = false;
        		return;
        	}
          this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
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
      			addTeacher(this.fromData).then(response => {
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
      	modTeacher(scope.row).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        this.getList();
	       //  let bridge = {
	      	// 	gradeTeacherName: scope.row.gradeTeacherName,
	      	// 	chargeTeacherName: scope.row.chargeTeacherName,
	      	// 	index: scope.$index
	      	// }

      		// this.backList[bridge.index].gradeTeacherName = bridge.gradeTeacherName;
      		// this.backList[bridge.index].chargeTeacherName = bridge.chargeTeacherName;
      		// scope.row.edit = false
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		schoolName: this.backList[index].schoolName,
      		entryTime: this.backList[index].entryTime,
      		email: this.backList[index].email,
      		telephone: this.backList[index].telephone
      	}
      	scope.row.schoolName = bridge.schoolName;
      	scope.row.entryTime = bridge.entryTime;
      	scope.row.email = bridge.email;
      	scope.row.telephone = bridge.telephone;
      	scope.row.edit = false;
      },
      showDiallogDel(row){
      	this.del_content = row;
      	this.dialogDel = true;
      },
      handleDel() {
      	delTeacher({id:this.del_content.id}).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
	        this.getList();
		      this.dialogDel = false;
      	})
      },
      onSuccess(response, file, fileList) {
      	console.log(response)
      	this.$message({
          message: '文件上传成功',
          type: 'success'
        });
      },
      onErroe(err, file, fileList) {
      	this.$message({
          message: '文件上传失败',
          type: 'success'
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      file_down(){
      	window.location.href="/static/template_file/教师信息的导入模板.xls";
      }
		}
	}
</script>