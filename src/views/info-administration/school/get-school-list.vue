<template>
	<div class="padding-a">
	  <el-table :data="list" fixed style="width: auto">
	    <el-table-column
	      prop="address"
	      label="学校"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="area"
	      label="区"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="city"
	      label="城市"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创办时间"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      prop="introduce"
	      label="简介"
	      width="420">
	    </el-table-column>
	    <el-table-column
	      prop="linkName"
	      label="联系人"
	      width="140">
	    </el-table-column>
	    <el-table-column
	      prop="telephone"
	      label="联系方式"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="typeStr"
	      label="类型"
	      width="120">
	    </el-table-column>
	  </el-table>
	</div>
</template>

<script>
	import { getSchoolList } from 'api/info-administration/school';
  export default {
    data() {
      return {
        list: [],
        page: {
        	pageNo: '1',
        	pageSize: '1',
        	name: '',
        	type: ''
        }
      }
    },
    created() {
    	this.getList();
    },
    methods: {
    	getList() {
    		getSchoolList(this.page).then(response => {
    			this.list = response.data.list;
    		})
    	}
    }
  }
</script>