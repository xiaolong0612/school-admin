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
			      prop="name"
			      label="学校"
			      width="150"
			      fixed>
	      		<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.name}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="area"
			      label="地址"
			      width="100">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.area"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.name}}</span>
						</template>
			    </el-table-column>
			    <!-- <el-table-column
			      prop="city"
			      label="城市"
			      width="100">
			    </el-table-column> -->
			    <el-table-column
			      prop="createTime"
			      label="创办时间"
			      width="200">
			    </el-table-column>
			    <!-- <el-table-column
			      prop="introduce"
			      label="简介"
			      width="420">
			      <template scope="scope">
			      	<el-input v-show="scope.row.edit" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scope.row.introduce"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.introduce}}</span>
						</template>
			    </el-table-column> -->
			    <el-table-column
			      prop="linkName"
			      label="联系人"
			      width="140">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.linkName"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.linkName}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="telephone"
			      label="联系方式"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.telephone"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.telephone}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="typeStr"
			      label="类型"
			      width="120">
			    </el-table-column>
					<el-table-column prop="" label="操作" width="140">
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
				<div v-show="!listLoading" class="pagination-container fr">
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

        <el-form-item label="学校名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <!-- <el-form-item label="省" prop="province">
          <el-input v-model="fromData.province"></el-input>
        </el-form-item>

        <el-form-item label="市" prop="city">
          <el-input v-model="fromData.city"></el-input>
        </el-form-item> -->

        <el-form-item label="地址" prop="area">
          <el-input v-model="fromData.area"></el-input>
          <!-- <distpicker v-model="fromData.area" :data="area"></distpicker> -->
          <!-- <region-picker
          	v-model="fromData.area"
          	:data="addressList">
          </region-picker> -->
        </el-form-item>

				<!-- <el-form-item label="班级名称" prop="name">
					<region-picker :data="data"></region-picker>
				</el-form-item> -->

        <!-- <el-form-item label="详细地址" prop="address">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fromData.address">
          </el-input>
        </el-form-item> -->

        <el-form-item label="类型" prop="type">
          <el-select v-model="fromData.type" placeholder="请选择">
				    <el-option
				      label="小学"
				      value="0">
				    </el-option><el-option
				      label="九年一贯制学校"
				      value="1">
				    </el-option><el-option
				      label="初中校"
				      value="2">
				    </el-option><el-option
				      label="完中校"
				      value="3">
				    </el-option>
				  </el-select>

        </el-form-item>

        <el-form-item label="联系人" prop="linkName">
          <el-input v-model="fromData.linkName"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="fromData.telephone"></el-input>
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
	import { getSchoolList, modSchool, delSchool, addSchool} from 'api/info-administration/school';
	import { getPlace } from 'utils/index';
	import addressList from 'region-picker/dist/data.json';
	export default {
		data() {
			return {
				name: '学校管理',
				list: [],
				addressList: addressList,
				screenHeight: 0,
				total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          name: '',
          type: ''
        },
        fromData: {
        	name: null,
					area: null,
					type: '',
					linkName: null,
					telephone: '',
        },
        rules: {
					name: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
	        area: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					type: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					linkName: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					telephone: [
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
        getSchoolList(this.listQuery).then(res => {
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
      			addSchool(this.fromData).then(response => {
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
      	let query = {
      		name: scope.row.name,
      		city: scope.row.city,
      		area: scope.row.area,
      		address: scope.row.address,
      		linkName: scope.row.linkName,
      		telephone: scope.row.telephone,
      		introduce: scope.row.introduce,
      		province: scope.row.province,
      		id: scope.row.id,
      	}
      	modSchool(query).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        this.getList();
	       //  let bridge = {
	      	// 	area: scope.row.area,
	      	// 	linkName: scope.row.linkName,
	      	// 	telephone: scope.row.telephone,
	      	// 	index: scope.$index
	      	// }

      		// this.backList[bridge.index].area = bridge.area;
      		// this.backList[bridge.index].linkName = bridge.linkName;
      		// this.backList[bridge.index].telephone = bridge.telephone;
      		// scope.row.edit = false
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		area: this.backList[index].area,
      		linkName: this.backList[index].linkName,
      		telephone: this.backList[index].telephone
      	}
      	scope.row.area = bridge.area;
      	scope.row.linkName = bridge.linkName;
      	scope.row.telephone = bridge.telephone;
      	scope.row.edit = false;
      },
      handleDel(id) {
      	delSchool(id).then(response => {
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
      }
		}
	}
</script>