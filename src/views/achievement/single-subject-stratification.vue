<template>
	<div>
		<!-- <div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true" :model="fromData" class="form-inline">
				<el-form-item label="学校">
					<el-select v-model="fromData.selectedSubject" filterable placeholder="请选择">
					  <el-option v-for="item in list" :value="item.school" :key="item.school">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
			</el-form>
		</div> -->
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table :data="list.data" border style="width: 100%">
        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' sortable>
          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name' sortable>
            <template scope="scope">
              <div>{{scope.row[first.value][second.value]}}</div>
            </template>
          </el-table-column>

          <template scope="scope" v-if="first.children == undefined">
            <div>{{scope.row[first.value]}}</div>
          </template>
        
        </el-table-column>
    </el-table>
			</div>
			<div v-show="!listLoading" class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
	import { getPaperScore } from 'api/score';
	export default {
		data() {
			return {
				name: '全区各校单次考试成绩总表',
				screenHeight: 0,
				list: {},
				total: null,
        listLoading: true,
        listQuery: {
          id: 13,
        }
			}
		},
		created() {
    },
		mounted() {
			this.getList();
			this.screenHeight = this.setTableHeight(false);
		},
		methods: {
			getList() {
        this.listLoading = true;
        getPaperScore(this.listQuery).then(res => {
        	var data = res.data.data;
          this.list.data = data.data;
          this.list.head = data.head;
          this.total = data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getList();
      }
		}
	}
</script>