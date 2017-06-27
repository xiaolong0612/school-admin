<template>
  <div>
    <h3 class="title-name" style="line-height: 35px">
      <wscn-icon-svg style="color: rgb(107,194,85);font-size: 20px" icon-class="shuxian"/>
      {{name}}
    </h3>
    <el-table
      :data="list"
      style="width: 100%" :max-height="screenHeight">
      <el-table-column
        prop="number1"
        label="考试名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="试题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number2"
        label="分值">
      </el-table-column>
      <el-table-column
        prop="title"
        label="试题解析">
      </el-table-column>
      <el-table-column
        prop="title"
        label="评分标准">
      </el-table-column>
      <el-table-column
        prop="float1"
        label="市、区得分率">
      </el-table-column>
      <el-table-column
        prop="title"
        label="质量分析">
      </el-table-column>
      <el-table-column
        prop="title"
        label="教学建议">
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container fr">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchList, fetchPv } from 'api/data';
  export default {
    data() {
      return {
        name: '能力分析',
        screenHeight: window.innerHeight-200,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        fromData: {
          selectedSubject: '启悟中学',
          selectedClass: '1'
        }
      }
    },
    created() {
      this.getList();
    },
    mounted() {
      const that = this;
      that.screenHeight = window.innerHeight-200;
      window.onresize = () => {
        return (() => {
          that.screenHeight = window.innerHeight-200;
        })()
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list;
          console.log(response.data);
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
      formatter(val) {
        if(val < 60 ) {
          return 'red'
        }else if(val == 60 ) {
          return 'rgb(251,178,23)'
        }else if(val>90) {
          return 'rgb(6,128,67)'
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .form-inline .el-form-item{
    margin-bottom: 15px
  }
</style>