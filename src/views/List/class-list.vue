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
				<el-table :data="list" :key="tableKey" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'schoolName'}">
					<el-table-column prop='schoolName' label="学校" width="150"></el-table-column>
					
					<el-table-column prop='grade' label="年级" width="90">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.grade"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.grade}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='name' label="班级" width="90">
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column prop='chargeTeacherName' label="班主任" width="120" sortable>
						<template scope="scope">
							<el-select v-show="scope.row.edit" v-model.number="scope.row.chargeTeacherName" placeholder="请选择班主任">
					      <el-option 
					      	v-for="item in headmaster"
					      	:key='item.id'
					      	:label="item.name"
					      	:value="item.id">
					      </el-option>
					    </el-select>
          		<span v-show="!scope.row.edit">{{scope.row.chargeTeacherName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='gradeTeacherName' label="年段长" width="120" sortable>
						<template scope="scope">
							<el-select v-show="scope.row.edit" v-model.number="scope.row.gradeTeacherName" placeholder="请选择年段长">
					      <el-option 
					      	v-for="item in grades"
					      	:key='item.id'
					      	:label="item.name"
					      	:value="item.id">
					      </el-option>
					    </el-select>
          		<span v-show="!scope.row.edit">{{scope.row.gradeTeacherName}}</span>
						</template>
					</el-table-column> -->
					<el-table-column prop="" label="操作" width="140">
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
			<div v-show="!listLoading" class="page-wrap">
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
		  	<el-form-item label="班级名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

		  	<el-form-item label="年级" prop="grade">
          <el-select v-model="fromData.grade" filterable placeholder="请选择">
				    <el-option-group
				      v-for="group in grade_list"
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
        
		  	<!-- <el-form-item label="班主任" prop="chargeTeacherName">
          <el-select v-model.number="fromData.chargeTeacherName" placeholder="请选择班主任">
			      <el-option 
			      	v-for="item in headmaster"
			      	:key='item.id'
			      	:label="item.name"
			      	:value="item.id">
			      </el-option>
			    </el-select>
        </el-form-item>
        
		  	<el-form-item label="年段长名字" prop="gradeTeacherName">
          <el-select v-model.number="fromData.gradeTeacherName" placeholder="请选择年段长">
			      <el-option 
			      	v-for="item in grades"
			      	:key='item.id'
			      	:label="item.name"
			      	:value="item.id">
			      </el-option>
			    </el-select>
        </el-form-item> -->
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		  	<el-button @click="handleAdd('fromData')" type="primary">确定</el-button>
      	<el-button @click="resetForm('fromData')">重置</el-button>
      	<el-button :plain="true" type='warning' @click="dialogVisible = false">取消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { getListClass, addClss, modClass } from 'api/info-administration/class';
	import { getAllTeacher } from 'api/info-administration/teacher';
	import { gradeList } from 'utils/data';
	export default {
		data() {
			return {
				name: '班级列表',
				screenHeight: 0,
        grade_list: gradeList('all'),
				list: [],
				backList: [],
				total: 0,
        listLoading: true,
        dialogVisible: false,
        tableKey: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          name: ''
        },
        headmaster: [],
        grades: [],
        fromData: {
        	name: '',
					grade: '',
					schoolId: '1',
					// chargeTeacherId: '',
					// chargeTeacherName: '',
					// gradeTeacherId: '',
					// gradeTeacherName: '',
					teacherId: '',
					type: '0'
        },
        teacherFrom: {
        	type: '',
        	schoolId: ''
        },
        rules: {
        	name: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					grade: [
	        	{ required: true, message: '请选择班级', trigger: 'change'}
	        ],
					schoolId: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ]
        },
			}
		},
		computed: {
      ...mapGetters([
        'schoolId',
        'uid'
      ])
    },
    created() {
    	this.fromData.teacherId = this.uid;
    	this.teacherFrom.schoolId = this.schoolId;
    },
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
			// this.getTeacherList(this.headmaster, 1);
			// this.getTeacherList(this.grades, 3);
		},
		methods: {
			getList() {
        this.listLoading = true;
        getListClass(this.listQuery).then(response => {
          this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      getTeacherList(people, type) {
      	this.teacherFrom.type = type;
      	getAllTeacher(this.teacherFrom).then(res => {
      		people = res;
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
      handleMod(scope){
      	modClass(scope.row).then(response => {
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
      		gradeTeacherName: this.backList[index].gradeTeacherName,
      		chargeTeacherName: this.backList[index].chargeTeacherName
      	}
      	scope.row.gradeTeacherName = bridge.gradeTeacherName;
      	scope.row.chargeTeacherName = bridge.chargeTeacherName;
      	scope.row.edit = false;
      },
      handleAdd(formName){
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
	        	console.log(this.fromData)
      			addClss(this.fromData).then(response => {
      				if(typeof response == 'undefined') return;
	            this.$message({
			          message: '添加成功',
			          type: 'success'
			        })
			        // this.list.unshift(this.fromData);
			        // this.$set(this.list[0], 'edit', false);
			        // this.list[0].id = this.list[1].id++;
			        // this.tableKey++;
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
		}
	}
</script>