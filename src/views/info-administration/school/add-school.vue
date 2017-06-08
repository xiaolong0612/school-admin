<template>
	<el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm padding-a" style="width:500px">
	  <el-form-item label="学校名称" prop="name">
	    <el-input v-model="dataForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="省" prop="province">
	    <el-input v-model="dataForm.province"></el-input>
	  </el-form-item>
	  <el-form-item label="市" prop="city">
	    <el-input v-model="dataForm.city"></el-input>
	  </el-form-item>
	  <el-form-item label="区" prop="area">
	    <el-input v-model="dataForm.area"></el-input>
	  </el-form-item>
	  <el-form-item label="详细地址" prop="address">
	    <el-input v-model="dataForm.address"></el-input>
	  </el-form-item>
	  </el-form-item>
	  <el-form-item label="类型" prop="type">
	    <el-input v-model="dataForm.type"></el-input>
	  </el-form-item>
	  <el-form-item label="联系人" prop="linkName">
	    <el-input v-model="dataForm.linkName"></el-input>
	  </el-form-item>
	  <el-form-item label="联系方式" prop="telephone">
	    <el-input v-model="dataForm.telephone"></el-input>
	  </el-form-item>
	  <el-form-item label="简介" prop="introduce">
	    <el-input type="textarea" v-model="dataForm.introduce"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('dataForm')">立即创建</el-button>
	    <el-button @click="resetForm('dataForm')">重置</el-button>
	  </el-form-item>
	  <el-button @click="delSchool()"></el-button>
	</el-form>
</template>
<script>
	import { validataPhone } from 'utils/validate';
	import { addSchool, delSchool } from 'api/info-administration/school'
  export default {
    data() {
    	const valiPhone = (rule, value, callback) => {
    		if (!validataPhone(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
    	};
      return {
        dataForm: {
          name: '1',
          province: '1',
          city: '1',
          area: '1',
          address: '1',
          type: '1',
          linkName: '1',
          telephone: '18636787915',
          introduce: '1'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入学校地址', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择学校类型', trigger: 'blur' }
          ],
          linkName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          telephone: [
            { required: true, trigger: 'blur', validator: valiPhone }
          ],
          introduce: [
            { required: true, message: '请填写简介', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	addSchool(this.dataForm).then(response => {
          		console.log(response);
          	})
          	this.$message({
		          message: 'submit',
		          type: 'warning'
		        });
          } else {
          	this.$message({
		          message: '提交失败',
		          type: 'warning'
		        });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      delSchool() {
      	delSchool('2').then(response => {
      		console.log(response);
      	})
      }
    }
  }
</script>