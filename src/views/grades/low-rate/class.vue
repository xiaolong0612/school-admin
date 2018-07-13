<template>
	<div>
		<!-- <div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">

				<el-form-item label="届">
          <el-select v-model="listQuery.period" placeholder="请选择" @change="getPaperList('period')">
            <el-option v-for="item in periodList" :label="item.label" :value="item.label" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" placeholder="请选择" @change="getPaperList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

				<el-form-item label="班级类型">
          <el-select v-model="classTyoeQuery.state" filterable placeholder="请选择" @change="queryChange('state')">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="行政班" :value="0"></el-option>
            <el-option label="教学班" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="→"></el-form-item>

        <el-form-item label="考试列表">
          <el-select v-model="listQuery.id" filterable clearable placeholder="请选择" @change="getList">
            <el-option v-for="item in examinationList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>

			</el-form>
		</div> -->
		<div class="ui-table-wrap clearfix">
			<div class="ui-table-title-wrap">
				<h3 class="ui-table-title">
					<wscn-icon-svg icon-class="shuxian"/>
					{{$route.query.name}}
				</h3>
			</div>
			<div class="ui-table-main">
        <el-table v-if="!listLoading" v-loading.body="listLoading" :data="list.data" border style="width: 100%"  :max-height="screenHeight" :default-sort = "{prop: 'index', order: 'ascending'}">
          <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' v-if="first.name != '学校Id'" :header-align="first.children != undefined ? 'center' : 'left'" :sortable="first.name == '班级'" prop="index">
            <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name' sortable :prop="first.value+'.'+second.value">
              <template scope="scope">
                <div v-if="second.name == '进步值' && scope.row[first.value] != undefined" :style="{color: scope.row[first.value][second.value] < 0 ? 'red' : '#333'}">{{scope.row[first.value][second.value]}}</div>
                  <div v-if="second.name != '进步值' && scope.row[first.value]!=undefined">
                    <span v-if="second.value == 'averageRate'">
                    {{(scope.row[first.value][second.value]*100).toFixed(2)}}%</span>
                    <span v-else>{{scope.row[first.value][second.value]}}</span>
                  </div>
                  <div v-if="scope.row[first.value]==undefined">-</div>
              </template>
            </el-table-column>

            <template scope="scope" v-if="first.children == undefined ">
              <div>
                {{scope.row[first.value]}}
              </div>
            </template>
          
          </el-table-column>
        </el-table>
      </div>
			<div v-show='!listLoading' class="page-wrap fr">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
	  </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex';
	import { getClassLowGradeRateByPeriodAndGradeAndSchoolIdTable} from 'api/grades';
	export default {
		data() {
			return {
				name: '',
				screenHeight: 0,
				list: {
          data: [],
          head: []
        },
				total: null,
        listLoading: false,
        paperQuery: {
        	period: '',
        	grade: '',
        	subject: ''
        },
        listQuery: {
          id: '',
          pageNo: 1,
          pageSize: 50,
          grade: '',
          period: '',
          schoolId: '',
          subject: ''
        },
        classTyoeQuery: {
        	id: '',
          pageNo: 1,
          pageSize: 50,
          state: -1
        },
        classType: ''
			}
		},
		computed: {
      ...mapGetters([
        'subject',
        'user'
      ])
    },
		mounted() {
      this.screenHeight = this.setTableHeight(true);
      this.setDefault();
		},
		methods: {
			setDefault(){
        var query = this.$route.query;
        this.listQuery.id = this.user.userinfo.id;
        this.listQuery.grade = query.grade;
        this.listQuery.period = query.period;
        this.listQuery.schoolId = query.schoolId;
        this.listQuery.subject = this.subject;
        this.getList();
			},
			getList() {
        this.listLoading = true;
        getClassLowGradeRateByPeriodAndGradeAndSchoolIdTable(this.listQuery).then(res => {
        	if(typeof res == 'undefined'){
          	this.listLoading = false;
          	return;
        	}
          var data = res.data.data.data;
          for(var i in data){
            var index  = Number(data[i].className.split('班')[0])
            if(isNaN(index)){
              this.$set(data[i], 'index', 1000);
            }else{
              this.$set(data[i], 'index', index);
            }
          }
          this.list.data = data;
          this.list.head = res.data.data.head;
          this.total = res.data.total;
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
<style rel="stylesheet/scss" lang="scss">
	.form-inline .el-form-item{
		margin-bottom: 15px
	}
</style>