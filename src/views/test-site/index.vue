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
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight"
				:default-sort = "{prop: 'nameCode'}">
					<el-table-column
			      prop="nameCode"
			      label="专题编号"
			      width="120"
			      fixed
			      sortable>
	      		<template scope="scope">
	      			<el-input v-show="scope.row.edit" size="small" v-model="scope.row.nameCode"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.nameCode}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="name"
			      label="专题名称"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
							<router-link :to='"item/"+scope.row.name+"/"+scope.row.id+"/"+scope.row.subject'>
          			<span v-show="!scope.row.edit">{{scope.row.name}}</span>
          		</router-link>
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

					<el-table-column prop="" label="操作" width="150">
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
				<div v-show="!listLoading" class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
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

        <!-- <el-form-item label="班级名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item> -->

        <el-form-item label="专题名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
        </el-form-item>

        <el-form-item label="专题编号" prop="nameCode">
          <el-input v-model="fromData.nameCode"></el-input>
        </el-form-item>

<!--         <el-form-item label="科目" prop="subject">
          <el-select v-model="fromData.subject" filterable placeholder="请选择">
				    <el-option
				      v-for="item in subjectList"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
        </el-form-item> -->

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
	import { getTestSitesList, addTestsites, modTestSites, delTestSites} from 'api/test/test';
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
				name: '专题列表',
				list: [],
				screenHeight: 0,
				total: 0,
				subjectList: ['语文', '数学', '英语', '物理', '化学', '地理', '历史', '政治'],
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          name: '',
          subject: '',
          parentId: '0'
        },
        fromData: {
        	name: '',
					nameCode: '',
					teacherId: '',
        },
        rules: {
	        name: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					nameCode: [
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
	        ]
	      },
        dialogVisible: false
			}
		},
		computed: {
      ...mapGetters([
        'subject',
        'uid'
      ])
    },
		created() {
			this.fromData.teacherId = this.uid;
    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
      this.getList();
		},
		methods: {
			getList() {
        this.listLoading = true;
        this.listQuery.subject = this.subject;
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
	        	console.log(this.fromData)
      			addTestsites(this.fromData).then(res => {
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
    			name: scope.row.name,
    			nameCode: scope.row.nameCode
    		};
      	modTestSites(data).then(res => {
      		if(typeof res == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        this.getList();
	       //  let bridge = {
	      	// 	name: scope.row.name,
	      	// 	nameCode: scope.row.nameCode,
	      	// 	index: scope.$index
	      	// }

      		// this.backList[bridge.index].name = bridge.name;
      		// this.backList[bridge.index].nameCode = bridge.nameCode;
      		// scope.row.edit = false
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		name: this.backList[index].name,
      		nameCode: this.backList[index].nameCode,
      	}
      	scope.row.name = bridge.name;
      	scope.row.nameCode = bridge.nameCode;
      	scope.row.edit = false;
      },
      handleDel(id) {
      	delTestSites(id).then(res => {
      		if(typeof res == 'undefined') return;
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
		      this.getList();
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		}
	}
</script>