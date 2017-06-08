<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="考试名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="test"
      label="试题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="score"
      label="分值">
    </el-table-column>
    <el-table-column
      prop="analysis"
      label="试题解析">
    </el-table-column>
    <el-table-column
      prop="standard"
      label="评分标准">
    </el-table-column>
    <el-table-column
      prop="rate"
      label="市、区得分率">
    </el-table-column>
    <el-table-column
      prop="Analysis"
      label="质量分析">
    </el-table-column>
    <el-table-column
      prop="proposal"
      label="教学建议">
    </el-table-column>
  </el-table>
</template>

<script>
  const tableData = [];
  for(var i = 0; i < 15; i++) {
    tableData.push({
      name: '质检',
      test: '',
      score: '',
      analysis: '',
      standard: '',
      rate: '',
      Analysis: '',
      proposal: ''
    })
  }
  export default {
    data() {
      return {
        tableData
      }
    }
  }
</script>