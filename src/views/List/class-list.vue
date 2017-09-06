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
				<el-table :data="list" :key="tableKey" stripe v-loading.body="listLoading" border :max-height="screenHeight" :default-sort = "{prop: 'name1', order: 'descending'}">
					<el-table-column prop='schoolName' label="学校" width="150" sortable></el-table-column>
					<el-table-column prop='grade' label="年级" width="90" sortable></el-table-column>
					<el-table-column prop='name' label="班级" width="90" sortable></el-table-column>
					<el-table-column prop='chargeTeacherName' label="班主任" width="120" sortable>
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.chargeTeacherName"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.chargeTeacherName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='gradeTeacherName' label="年段长" width="120" sortable>
						<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.gradeTeacherName"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.gradeTeacherName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="" label="操作" width="140">
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
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        
		  	<el-form-item label="班主任名字" prop="chargeTeacherName">
          <el-input v-model="fromData.chargeTeacherName"></el-input>
        </el-form-item>
        
		  	<el-form-item label="年段长名字" prop="gradeTeacherName">
          <el-input v-model="fromData.gradeTeacherName"></el-input>
        </el-form-item>
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
	import { getListClass, addClss, modClass } from 'api/info-administration/class';
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
          pageSize: 20,
          name: ''
        },
        fromData: {
        	name: '',
					grade: '',
					schoolId: '1',
					chargeTeacherId: '',
					chargeTeacherName: '',
					gradeTeacherId: '',
					gradeTeacherName: '',
					type: '0'
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
	        ],
					chargeTeacherId: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					chargeTeacherName: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					gradeTeacherId: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					gradeTeacherName: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ],
					type: [
	        	{ required: true, message: '必填项', trigger: 'blur' }
	        ]
        },
			}
		},
		mounted() {
			this.screenHeight = this.setTableHeight(false);
			this.getList();
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
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleMod(scope){
      	modClass(scope.row).then(response => {
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        let bridge = {
	      		gradeTeacherName: scope.row.gradeTeacherName,
	      		chargeTeacherName: scope.row.chargeTeacherName,
	      		index: scope.$index
	      	}

      		this.backList[bridge.index].gradeTeacherName = bridge.gradeTeacherName;
      		this.backList[bridge.index].chargeTeacherName = bridge.chargeTeacherName;
      		scope.row.edit = false
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
			        this.getList();
	        	})
          } else {
            console.log('error submit!!');
            return false;
          }
      	})
      }
		}
	}
</script>