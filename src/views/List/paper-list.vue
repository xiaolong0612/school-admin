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
			      prop="period"
			      label="届"
			      width="100"
			      fixed>
			    </el-table-column>

					<el-table-column
			      prop="subject"
			      label="科目"
			      width="150"
			      fixed>
	      		<template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.subject"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.subject}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="试卷名"
			      width="250">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          		<router-link :to="'/paper/examination-list/'+scope.row.id+'/'+scope.row.name" v-show="!scope.row.edit">{{scope.row.name}}
                    </router-link>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="grade"
			      label="年级"
			      width="100">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.grade"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.grade}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="teacherName"
			      label="教研员"
			      width="150">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.teacherName"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.teacherName}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="totalScore"
			      label="总分"
			      width="90">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.totalScore"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.totalScore}}</span>
						</template>
			    </el-table-column>

			    <el-table-column prop="" label="操作" width="140">
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

        <el-form-item label="试卷名称" prop="name">
          <el-input v-model="fromData.name"></el-input>
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

        <el-form-item label="总分" prop="totalScore">
          <el-input v-model="fromData.totalScore"></el-input>
        </el-form-item>

        <el-form-item label="年级" prop="grade">
          <el-input v-model="fromData.grade"></el-input>
        </el-form-item>

        <el-form-item label="届" prop="period">
          <el-input v-model="fromData.period"></el-input>
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
	import { getExaminationPaperList, addExaminationPaper, modExaminationPaper, delExaminationPaper} from 'api/test/paper';
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
				name: '试卷列表',
				list: [],
				screenHeight: 0,
				total: 0,
        listLoading: true,
        subject: ['语文', '数学', '英语', '物理', '化学', '地理', '历史', '政治'],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          name: '',
          type: ''
        },
        fromData: {
        	name: '',
					subject: '',
					totalScore: '',
					grade: '',
					period: ''
        },
        rules: {
	        name: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					subject: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					totalScore: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
					grade: [
	        	{ required: true, message: '必填项', trigger: 'blur' },
	        ],
	        period: [
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
        getExaminationPaperList(this.listQuery).then(response => {
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
      handleAdd(formName){
      	this.$refs[formName].validate((valid) => {
	        if (valid) {
      			addExaminationPaper(this.fromData).then(response => {
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
      	modExaminationPaper(scope.row).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        console.log(scope.row)
	        let bridge = {
	      		name: scope.row.name,
	      		subject: scope.row.subject,
	      		totalScore: scope.row.totalScore,
	      		grade: scope.row.grade,
	      		period: scope.row.period,
	      		index: scope.$index
	      	}
	      	console.log(this.backList)
      		this.backList[bridge.index].name = bridge.name;
      		this.backList[bridge.index].subject = bridge.subject;
      		this.backList[bridge.index].totalScore = bridge.totalScore;
      		this.backList[bridge.index].grade = bridge.grade;
      		this.backList[bridge.index].period = bridge.period;
      		scope.row.edit = false
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		name: this.backList[index].name,
      		subject: this.backList[index].subject,
      		totalScore: this.backList[index].totalScore,
      		telephone: this.backList[index].telephone,
      		telephone: this.backList[index].telephone
      	}
      	scope.row.name = bridge.name;
      	scope.row.subject = bridge.subject;
      	scope.row.totalScore = bridge.totalScore;
      	scope.row.grade = bridge.grade;
      	scope.row.period = bridge.period;
      	scope.row.edit = false;
      },
      handleDel(id) {
      	delExaminationPaper(id).then(response => {
      		if(typeof response == 'undefined') return
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