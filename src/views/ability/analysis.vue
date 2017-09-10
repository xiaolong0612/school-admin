<template>
  <div>
    <div class="ui-table-wrap clearfix">
      <div class="ui-table-title-wrap">
        <h3 class="ui-table-title">
          <wscn-icon-svg icon-class="shuxian"/>
          {{name}}
        </h3>
      </div>
      <div class="ui-table-main">
        <el-table
          :data="list"
          stripe
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
        <div v-show="!listLoading" class="page-wrap fr">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { listAreaSummary } from 'api/ability';
  export default {
    data() {
      return {
        name: '能力分析',
        screenHeight: 0,
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          paperId: 2,
          testSitesId: 34
        },
        fromData: {
          selectedSubject: '启悟中学',
          selectedClass: '1'
        }
      }
    },
    created() {
    },
    mounted() {
      this.screenHeight = this.setTableHeight(false);
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        listAreaSummary(this.listQuery).then(res => {
          var data = res.data;
          console.log(data)
          this.list = res.data.list;
          this.total = res.data.total;
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