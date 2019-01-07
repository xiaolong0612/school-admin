<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
			<el-form :inline="true">	
				<!-- <el-form-item label="学校选择">
          <el-select v-model="listQuery.schoolId" filterable placeholder="请选择" @change="getList('school')">
            <el-option v-for="item in schoolList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="届">
          <el-select v-model="listQuery.period" filterable clearable placeholder="请选择" @change="getList('period')">
            <el-option v-for="item in periodList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级">
          <el-select v-model="listQuery.grade" filterable clearable placeholder="请选择" @change="getList('grade')">
            <el-option v-for="item in gradeList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目">
          <el-select v-model="listQuery.subject " filterable placeholder="请选择" @change="getList('subject')">
            <el-option v-for="item in subjectList" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="fr">
          <router-link to="/grades/low-rate/echart" >
            <el-button type="primary">切换查看方式</el-button>
          </router-link>
        </el-form-item>
			</el-form>
		</div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}
			</h3>
			<div class="ui-table-main">
				<el-table v-if="!listLoading" v-loading.body="listLoading" :data="list.data" border style="width: 100%" :max-height="screenHeight">
	        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' v-if="first.name != '学校Id'" :header-align="first.children != undefined ? 'center' : 'left'">
	          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name' :sortable="second.name != '组长' ? true:false" :prop="second.value != 'ranking' ? first.value+'.'+second.value : first.value+'.rankingSort'">
	            <template scope="scope">
                <div v-if="second.name == '进步值' && scope.row[first.value] != undefined" :style="{color: scope.row[first.value][second.value] < 0 ? 'red' : '#333'}">{{scope.row[first.value][second.value]}}</div>
                  <div v-if="second.name != '进步值' && scope.row[first.value]!=undefined">
                    <span v-if="second.value == 'averageRate' || second.name.indexOf('率') != -1">
                    {{(scope.row[first.value][second.value]*100).toFixed(2)}}%</span>
                    <span v-else>{{scope.row[first.value][second.value]}}</span>
                  </div>
                  <div v-if="scope.row[first.value]==undefined">-</div>
              </template>
	          </el-table-column>

	          <template scope="scope" v-if="first.children == undefined ">

	            <router-link v-if="first.value == 'school'" :to="{path:'/grades/low-rate/class', query:{schoolId: scope.row.schoolId, name: scope.row.school, grade:listQuery.grade, period:listQuery.period}}">{{scope.row[first.value]}}</router-link>
							<div v-if="first.value != 'school'">
								{{scope.row[first.value]}}
							</div>
              <!-- <div>
                {{scope.row[first.value]}}
              </div> -->
	          </template>

	          <!-- <template scope="scope" v-if="first.value != 'school'">
	            <div>{{scope.row[first.value]}}</div>
	          </template> -->
	        
	        </el-table-column>
	    	</el-table>
				<div v-show="!listLoading" class="page-wrap fr">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
			</div>
		</div>
	</div>
</template>
<script>
  import { getLatestTest, attrPeriod, attrGrade, attrSubject } from 'utils/auth';
  import { getPaperList, getAllPeriod } from 'api/list';
	import { mapGetters } from 'vuex';
	import { getSchoolLowGradeRateByPeriodAndSubjectAndGrade } from 'api/grades';
	export default {
		data() {
			return {
				name: '低分率',
				periodList: [],
        gradeList: [],
        subjectList: [],
				list: {
					data: [],
					head: []
				},
				schoolList: [],
				screenHeight: 0,
				total: null,
        listLoading: true,
        listQuery: {
          period: '',
          subject: '',
          grade: '',
          pageNo: 1,
          pageSize: 50,
        },
        schoolQuery:{
        	pageNo: 1,
          pageSize: 50,
          subject: ''
        }
			}
		},
		computed: {
      ...mapGetters([
        'schoolId',
        'gradeNo',
        'schoolId',
        'subject',
        'user'
      ])
    },
		created() {
    },
		mounted() {
      this.screenHeight = this.setTableHeight(true);
			this.setForm();
			this.getAllPeriod();
		},
		methods: {
			setForm(){
				this.gradeList = this.user.grade.split(',');
        this.subjectList = this.user.userinfo.subject.split(',');
			},
			setDefault(){
				
				this.listQuery.grade = typeof attrGrade() != 'undefined' ? attrGrade() : this.gradeList[0];
        this.listQuery.period = typeof attrPeriod() != 'undefined' ? attrPeriod() : this.periodList[0];
        this.listQuery.subject = typeof attrSubject() != 'undefined' ? attrSubject() : this.subjectList[0];
				this.getList('');

			},
      getAllPeriod(){
        getAllPeriod().then(res => {
        	this.periodList = res.data.list;
          this.setDefault();
        })
      },
			getList(type) {

				switch(type){
          case 'period':
            attrPeriod(this.listQuery.period);
            break;
          case 'grade':
            attrGrade(this.listQuery.grade);
            break;
          case 'subject':
            attrSubject(this.listQuery.subject);
            break;
        }
        this.listLoading = true;
        getSchoolLowGradeRateByPeriodAndSubjectAndGrade(this.listQuery).then(res => {
        	if(typeof res == 'undefined'){
        		this.list['data'] = []
        		this.listLoading = false;
        		return false;
        	}
          this.list.data = res.data.data.data;
          this.list.head = res.data.data.head;
          let sortArr = {};
          for(var i in this.list.data){
            for(var c in this.list.data[i]){
              if(typeof this.list.data[i][c].ranking != 'undefined'){
                if(typeof sortArr[c] != 'object'){
                  sortArr[c] = []
                }
                sortArr[c][sortArr[c].length] = this.list.data[i][c].ranking
              } 
            }
          }
          

          let sortArrIndex = {}
          let sortArrIndexOfItem = {}
          for(let i in sortArr){
            let data = this.sort(sortArr[i])
            sortArrIndex[i] = data.arr;
            sortArrIndexOfItem[i] = data.arrIndex;
          }
          for(let i in sortArrIndex){
            let s = 0;
            for(let c in sortArrIndex[i]){
              let index = sortArrIndexOfItem[i][c]
              if(typeof this.list.data[index][i] != 'undefined') this.$set(this.list.data[index][i], 'rankingSort', Number(sortArrIndex[i].length - c))
            }
          }
          this.total = res.data.data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      sort(arr, ) {
        let arrIndex = []
        for(var i in this.list.data){
          arrIndex[i] = i
        }
        for(var j=0;j<arr.length-1;j++){
          //两两比较，如果前一个比后一个大，则交换位置。
         for(var i=0;i<arr.length-1-j;i++){
            if(arr[i]>arr[i+1]){
              var temp = arr[i];
              var tempIndex = arrIndex[i]
              arr[i] = arr[i+1];
              arrIndex[i] = arrIndex[i+1]
              arr[i+1] = temp;
              arrIndex[i+1] = tempIndex
            }
          } 
        }
        return {
          arr,
          arrIndex
        }
      }
		}
	}
</script>