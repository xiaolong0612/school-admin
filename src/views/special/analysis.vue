<template>
  <div class=" calendar-list-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column fixed align="center" label="考试名称" width="120">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="试题">
        <template scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="分值">
        <template scope="scope">
          <span>{{scope.row.number1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="试题分析">
        <template scope="scope">
          <wscn-icon-svg v-for="n in +scope.row.importance" icon-class="wujiaoxing" class="meta-item__icon" :key="n" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="评分标准" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="全区得分率">
        <template scope="scope">
          <span>{{ scope.row.float1 }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="质量分析">
        <template scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="教学建议">
        <template scope="scope">
          <el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑" width="120">
        <template scope="scope">
          <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
          <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    import { fetchList } from 'api/article_table';
    export default {
      name: 'inline_edit-table_demo',
      data() {
        return {
          list: null,
          listLoading: true,
          listQuery: {
            pageNo: 1,
            pageSize: 30
          }
        }
      },
      created() {
        this.getList();
      },
      filters: {
        statusFilter(status) {
          const statusMap = {
            published: 'success',
            draft: 'gray',
            deleted: 'danger'
          };
          return statusMap[status]
        }
      },
      methods: {
        getList() {
          this.listLoading = true;
          fetchList(this.listQuery).then(response => {
            this.list = response.data.items.map(v => {
              v.edit = false;
              return v
            });
            this.listLoading = false;
          })
        }
      }
    }
</script>