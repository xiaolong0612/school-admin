<template>
	<el-row :gutter="15">
		<el-col :span="10" class="wrap">
				<el-form class="ui-form" autoComplete="on" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" style="padding:24px 24px 0">
					<el-form-item label="班级名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
					<el-form-item label="考点编号" prop="nameCode">
				    <el-input v-model="ruleForm.nameCode"></el-input>
				  </el-form-item>
					<el-form-item label="考题ID" prop="parentId">
				    <el-input v-model="ruleForm.parentId"></el-input>
				  </el-form-item>
					<el-form-item label="专题名称" prop="parentName">
				    <el-input v-model="ruleForm.parentName"></el-input>
				  </el-form-item>
					<el-form-item label="层级编号" prop="levelCode">
				    <el-input v-model="ruleForm.levelCode"></el-input>
				  </el-form-item>
					<el-form-item label="层级名称" prop="levelName">
				    <el-input v-model="ruleForm.levelName"></el-input>
				  </el-form-item>
					<el-form-item label="科目" prop="subject">
				    <el-select v-model="ruleForm.subject" placeholder="请选择科目">
			      <el-option label="语文" value="语文"></el-option>
			      <el-option label="数学" value="数学"></el-option>
			      <el-option label="英语" value="英语"></el-option>
			      <el-option label="物理" value="物理"></el-option>
			      <el-option label="化学" value="化学"></el-option>
			    </el-select>
				  </el-form-item>
					<el-form-item label="学校ID" prop="schoolId">
				    <el-input v-model="ruleForm.schoolId"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm()">提交</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
		</el-col>
	</el-row>
</template>
<script>
	import { addTestSites } from 'api/test/test';
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					nameCode: '',
					parentId: '',
					parentName: '',
					levelCode: '',
					levelName: '',
					subject: '',
					schoolId: '0'
				},
				rules: {
					name: [
						{ required: true, message: "不能为空" }
					],
					nameCode: [
						{ required: true, message: "不能为空" }
					],
					parentId: [
						{ required: true, message: "不能为空" }
					],
					parentName: [
						{ required: true, message: "不能为空" }
					],
					levelCode: [
						{ required: true, message: "不能为空" }
					],
					levelName: [
						{ required: true, message: "不能为空" }
					],
					subject: [
						{ required: true, message: "不能为空" }
					],
					schoolId: [
						{ required: true, message: "不能为空" }
					]
				}
			}
		},
		methods: {
      submitForm() {
      	this.$refs.ruleForm.validate(valid => {
      		if(valid) {
      			addTestSites(this.ruleForm).then(response => {
		        	this.$message({
			          message: '考点添加成功',
			          type: 'success'
			        });
		        })
      		}
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      	console.log('1')
      }
    }
	}
</script>