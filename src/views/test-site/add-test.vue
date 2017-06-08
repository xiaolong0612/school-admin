<template>
	<div>
		<el-form class="small-space" :model="dataFrom" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="专题名称">
          <el-input v-model="dataFrom.special"></el-input>
        </el-form-item>

        <el-form-item label="考点名称">
          <el-input v-model="dataFrom.test"></el-input>
        </el-form-item>

        <el-form-item label="序号">
          <el-input v-model="dataFrom.number"></el-input>
        </el-form-item>

        <el-form-item label="能力等级">
          <el-input v-model="dataFrom.ability"></el-input>
        </el-form-item>

        <el-form-item label="考点分析">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dataFrom.analysis">
          </el-input>
        </el-form-item>

        <el-form-item label="教学建议">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dataFrom.proposal">
          </el-input>
        </el-form-item>

        <el-form-item label="难度">
          <el-rate style="margin-top:8px;" v-model="dataFrom.difficulty" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>

        <el-form-item label="典型例题">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dataFrom.example">
          </el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="resetFrom">重置</el-button>
		  <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
	</div>
</template>
<script>
	const defaultData = {
					special: '',
					test: '',
					number: '',
					ability: '',
					analysis: '',
					proposal: '',
					difficulty: 0,
					example: ''
				}
	export default {
		data() {
			return {
				name: '质量管理',
				defaultData,
				dataFrom: defaultData
			}
		},
	    created() {
	        this.defaultData = JSON.parse(JSON.stringify(this.dataFrom));
	    },
	    methods: {
	    	resetFrom(){
	    		this.dataFrom = Object.assign(this.dataFrom, this.defaultData);
	    	}
	    }
	}
</script>