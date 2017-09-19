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
			<div class="ui-table-title-wrap">
				<router-link class="fr" to="/achievement/teaching-discipline-hierarchy">
					<el-button type="warning" size="small">查看教学班</el-button>
				</router-link>
				<h3 class="ui-table-title">
					<wscn-icon-svg icon-class="shuxian"/>
					{{name}}
				</h3>
			</div>
			<div class="ui-table-main">
				<el-table :data="list" stripe border style="width: 100%" :max-height="screenHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
					<el-table-column prop="schoolName" label="学校" width="120" fixed></el-table-column>
					<el-table-column prop="className" label="班级" width="70" fixed></el-table-column>
					<el-table-column label="生数" width="90" sortable>
						<template scope="scope">
							<div>{{scope.row.examineeCount}}</div>
						</template>
					</el-table-column>
					<el-table-column prop='teacher' label='教师' width="120"></el-table-column>

					<el-table-column label='得分率' header-align='center'>
						<el-table-column prop="tmpClassScoreRate.averageValue" label="平均分" width="100"></el-table-column>

						<el-table-column prop="tmpClassScoreRate.scoreRate" label="得分率" width="100" sortable></el-table-column>

						<el-table-column prop="tmpClassScoreRate.averageRate" label="超均率" width="100"></el-table-column>

						<el-table-column prop="tmpClassScoreRate.ranking" label="名次" width="100"></el-table-column>

						<el-table-column prop="tmpClassScoreRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='优良率' header-align='center'>
						<el-table-column prop="tmpClassExcellentRate.excellentCount" label="优良数" width="100"></el-table-column>

						<el-table-column prop="tmpClassExcellentRate.excellentRate" label="优良率" width="100"></el-table-column>

						<el-table-column prop="tmpClassExcellentRate.ranking" label="名次" width="100"></el-table-column>

						<el-table-column prop="tmpClassExcellentRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='及格率' header-align='center'>
						<el-table-column prop="tmpClassPassRate.passCount" label="及格数" width="100"></el-table-column>

						<el-table-column prop="tmpClassPassRate.passRate" label="及格率" width="100"></el-table-column>

						<el-table-column prop="tmpClassPassRate.ranking" label="名次" width="100"></el-table-column>

						<el-table-column prop="tmpClassPassRate.progressValue" label="进步值" width="100"></el-table-column>
					</el-table-column>

					<el-table-column label='低分率' header-align='center'>
						<el-table-column prop="tmpClassLowGradeRate.lowGradeCount" label="低分数" width="100"></el-table-column>

						<el-table-column prop="tmpClassLowGradeRate.lowGradeRate" label="低分率" width="100"></el-table-column>

						<el-table-column prop="tmpClassLowGradeRate.progressValue" label="进步值" width="100"></el-table-column>
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
	import { getClassScore } from 'api/score';
	export default {
		data() {
			return {
				name: '单次考试全区所有行政班学科分层监控表',
				screenHeight: 0,
				list: [],
				total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          id: 5,
          state: 0,
        },
        fromData: {
					selectedSubject: '启悟中学'
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
        getClassScore(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
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