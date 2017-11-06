<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">

				<el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="queryChange('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.value">
            </el-option>
          </el-select>
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
				<el-table :data="list" stripe v-loading.body="listLoading" border style="width: 100%" :max-height="screenHeight">
					
			    <el-table-column
			      prop="period"
			      label="届"
			      fixed>
			    </el-table-column>

					<el-table-column
			      prop="subject"
			      label="科目"
			      fixed>
	      		<template scope="scope">
          		<span >{{scope.row.subject}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="试卷名">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
          		<router-link :to="'/paper/examination-list/'+scope.row.id+'/'+scope.row.name+'/'+scope.row.subject" v-show="!scope.row.edit">{{scope.row.name}}
                    </router-link>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="grade"
			      label="年级">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.grade"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.grade}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="teacherName"
			      label="教研员">
			      <template scope="scope">
          		<span>{{scope.row.teacherName}}</span>
						</template>
			    </el-table-column>
			    <el-table-column
			      prop="totalScore"
			      label="总分">
			      <template scope="scope">
							<el-input v-show="scope.row.edit" size="small" v-model="scope.row.totalScore"></el-input>
          		<span v-show="!scope.row.edit">{{scope.row.totalScore}}</span>
						</template>
			    </el-table-column>

			    <el-table-column
			      prop="file"
			      label="试卷文件">
			      <template scope="scope">
			      	<el-upload
			      		v-show="scope.row.edit"
							  class="upload-demo"
							  :action="gpath.action"
							  :on-success="fileUpSuccess"
							  :on-remove="handleImgRemove"
							  multiple
							  :data="{id: scope.row.id}"
							  :limit="1"
							  :file-list="scope.row.file">
							  <el-button size="small" type="primary">点击上传</el-button>
							</el-upload>

							<div class='file-list' v-show="!scope.row.edit">
								<a target="_blank" :href="item.url" v-for="item in scope.row.file">
									<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
										<div class="file_item">
											<img class="file_icon" :src='"/static/img/suffix/"+ item.suffix+".png"' />
											<p class="file_name">{{item.name}}</p>
										</div>
									</el-tooltip>
								</a>
          		</div>
						</template>
			    </el-table-column>

			    <el-table-column prop="" label="操作" width="140">
						<template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button type="info" icon="el-icon-edit" size="small" @click="scope.row.edit = true"></el-button>
								<el-button type="danger" icon="el-icon-delete" size="small" @click="showDiallogDel(scope.row)"></el-button>
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
		        :page-size="listQuery.pageSzie" layout="total, sizes, prev, pager, next, jumper" :total="total">
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

        <!-- <el-form-item label="科目" prop="subject">
        	<el-select v-model="fromData.subject" filterable placeholder="请选择">
				    <el-option
				      v-for="item in subject"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
        </el-form-item> -->

        <el-form-item label="总分" prop="totalScore">
          <el-input v-model="fromData.totalScore"></el-input>
        </el-form-item>

        <el-form-item label="年级" prop="grade">
          <el-select v-model="fromData.grade" placeholder="请选择">
				    <el-option-group
				      v-for="group in classList"
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
	import { getExaminationPaperList, addExaminationPaper, modExaminationPaper, delExaminationPaper} from 'api/test/paper';
	import { validataPhone } from 'utils/validate';
	import { gradeList, periodList } from 'utils/data';
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
				paperFileList: [],
				list: [],
				screenHeight: 0,
				total: 0,
        listLoading: true,
        periodList: periodList(),
        classList: gradeList('all'),
        listQuery: {
          pageNo: 1,
          pageSize: 50,
          subject: '',
          name: '',
          grade: '',
          period: ''
        },
        fromData: {
        	name: '',
					subject: '',
					totalScore: '',
					grade: '',
					period: '',
					teacherId: ''
        },
        rules: {
	        name: [
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
        dialogVisible: false,
        dialogDel: false,
        del_content: {}
			}
		},
		computed: {
      ...mapGetters([
        'uid',
        'subject',
        'gradeNo'
      ])
    },
		created() {

    },
		mounted() {
			this.screenHeight = this.setTableHeight(true);
			this.setDefault();
      this.getList();
		},
		methods: {
			setDefault(){
				this.listQuery.period = this.periodList[this.periodList.length-1].value;
				this.listQuery.subject = this.subject;
				this.listQuery.grade = this.gradeNo;

				this.fromData.teacherId = this.uid;
			},
			getList() {
        this.listLoading = true;
        getExaminationPaperList(this.listQuery).then(response => {
        	this.list = response.data.list;
        	for(let i=0; i<this.list.length; i++){
        		this.$set(this.list[i], 'edit', false);
        		if(this.list[i].file == ''){
        			this.list[i].file = [];
        		}else{
        			this.list[i].file = JSON.parse(this.list[i].file);
        		}
        	}
        	this.backList = JSON.parse(JSON.stringify(this.list));
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      queryChange(val){
      	console.log(val)
      	this.getList();
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
      			addExaminationPaper(this.fromData).then(response => {
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
      	let data = {};
      	for(let i in scope.row){
      		if(i == 'file') data[i] = JSON.stringify(scope.row[i]);
      		else data[i] = scope.row[i];
      	}
      	modExaminationPaper(data).then(response => {
      		if(typeof response == 'undefined') return;
      		this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
	        this.getList();
      	})
      },
      handleCancel(scope){
      	let index = scope.$index;
      	let bridge = {
      		name: this.backList[index].name,
      		subject: this.backList[index].subject,
      		totalScore: this.backList[index].totalScore,
      		grade: this.backList[index].grade,
      		period: this.backList[index].period
      	}
      	scope.row.name = bridge.name;
      	scope.row.subject = bridge.subject;
      	scope.row.totalScore = bridge.totalScore;
      	scope.row.grade = bridge.grade;
      	scope.row.period = bridge.period;
      	scope.row.edit = false;
      },
      handleDel() {
      	delExaminationPaper(this.del_content.id).then(response => {
      		if(typeof response == 'undefined') return
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
    			this.getList();
      	})
      },
      showDiallogDel(row){
      	this.del_content = row;
      	this.dialogDel = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      fileUpSuccess(res, file, fileList){
      	for(let i in this.list){
      		if(this.list[i].id = res.id ){
      			this.list[i].file.push({
    					name: res.originalName,
    					originalName: res.name,
    					size: res.size,
    					suffix: res.suffix,
    					url: res.url
    				});
      		}
      	}
      },
      handleImgRemove(file, fileList) {
      	for(let i=0; i<this.list.length; i++){
      		for(let c=0; c<this.list[i].file.length; c++){
      			if(this.list[i].file[c].url == file.url){
      				this.list[i].file = [];
      				for(let f=0; f<fileList.length; f++){
      					this.list[i].file.push({
      						name: fileList[f].name,
	      					originalName: fileList[f].originalName,
	      					size: fileList[f].size,
	      					suffix: fileList[f].suffix,
	      					url: fileList[f].url
      					})
      				}
      			}
      		}
      	}
      },
		}
	}
</script>