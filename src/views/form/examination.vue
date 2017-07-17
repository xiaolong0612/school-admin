<template>
	<el-row :gutter="15">
		<el-col :span="10" class="wrap">
				<el-form autoComplete="on" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="140px" style="padding:24px 24px 0">
					<el-form-item label="试卷名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
					<el-form-item label="科目" prop="subject">
				    <el-input v-model="ruleForm.subject"></el-input>
				  </el-form-item>
					<el-form-item label="题号" prop="questionNumber">
				    <el-input v-model="ruleForm.questionNumber"></el-input>
				  </el-form-item>
					<el-form-item label="考点ID" prop="testSitesId">
				    <el-input v-model="ruleForm.testSitesId"></el-input>
				  </el-form-item>
					<el-form-item label="考点编号" prop="testCode">
				    <el-input v-model="ruleForm.testCode"></el-input>
				  </el-form-item>
					<el-form-item label="考点题型" prop="testName">
				    <el-input v-model="ruleForm.testName"></el-input>
				  </el-form-item>
					<el-form-item label="考点专题名称" prop="testSpecialTopic">
				    <el-input v-model="ruleForm.testSpecialTopic"></el-input>
				  </el-form-item>
					<el-form-item label="考点所属层级编号" prop="testLevelCode">
				    <el-input v-model="ruleForm.testLevelCode"></el-input>
				  </el-form-item>
					<el-form-item label="题干" prop="title">
				    <el-input v-model="ruleForm.title"></el-input>
				  </el-form-item>
					<el-form-item label="内容" prop="content">
				    <el-input type="textarea" v-model="ruleForm.content"></el-input>
				  </el-form-item>
					<el-form-item label="分数" prop="score">
				    <el-input v-model="ruleForm.score"></el-input>
				  </el-form-item>
					<el-form-item label="参考答案" prop="answer">
				    <el-input v-model="ruleForm.answer"></el-input>
				  </el-form-item>
					<el-form-item label="试卷ID" prop="examinationPaperId">
				    <el-input v-model="ruleForm.examinationPaperId"></el-input>
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
	import { saveExaminationPaperItem } from 'api/test/examination';
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					subject: '',
					questionNumber: '',
					testSitesId: '',
					testCode: '',
					testName: '',
					testSpecialTopic: '',
					testLevelCode: '',
					title: '',
					content: '',
					score: '',
					answer: '',
					examinationPaperId: ''
				},
				rules: {
					name: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					subject: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					questionNumber: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testSitesId: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testCod: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testCode: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testName: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testSpecialTopic: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					testLevelCode: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					title: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					content: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					score: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					answer: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					],
					examinationPaperId: [
						{ required: true, trigger: 'blur', message: "不能为空" }
					]
				}
			}
		},
		methods: {
      submitForm() {
      	this.$refs.ruleForm.validate(valid => {
      		if(valid) {
      			saveExaminationPaperItem(this.ruleForm).then(response => {
		        	this.$message({
			          message: '试题添加成功',
			          type: 'success'
			        });
		        })
      		}
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
	}
</script>