<template>
	<div>
		<div class="ui-search-wrap" id="ui-search-wrap">
      <el-form :inline="true" :model="listQuery">
      	<el-form-item class="fr">
      		<el-button type="primary" style="margin-bottom:15px;" @click="$router.back(-1)">返回</el-button>
      	</el-form-item>
      	<el-form-item label="专题">
      		<el-input v-model="name" :disabled="true"></el-input>
      	</el-form-item>
        <el-form-item label="考点">
          <el-select v-model="checkPointsId" clearable placeholder="请选择" @change="testChange">
            <el-option v-for="item in testSitesList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item> -->
      </el-form>
    </div>
		<div class="ui-table-wrap clearfix">
			<h3 class="ui-table-title">
				<wscn-icon-svg icon-class="shuxian"/>
				{{name}}-各考点
			</h3>
			<div class="ui-table-main">
				<div v-if="showTable">
					<el-table :data="list.data" border style="width: 100%" :max-height="screenHeight">
		        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name'>
		          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name' sortable :prop="first.value+'.'+second.value">
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
	    	<div v-else>
					<el-table :data="list.data" border style="width: 100%">
		        <el-table-column v-for='(first,index) in list.head' :label="first.name" :key='first.name' sortable>
		          <el-table-column v-if="first.children != undefined" v-for='(second,index) in first.children' :label="second.name" :key='second.name'>
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
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
		        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		      </el-pagination>
		    </div>
			</div>
		</div>
	</div>
</template>
<script>
  import { getLatestTest, attrGrade, attrPeriod } from 'utils/auth';
	import { mapGetters } from 'vuex';
	import { getSpecialTopic, queryschoolCheckPoints } from 'api/special';
	import { getUseTestSites } from 'api/test/test';
	export default {
		data() {
			return {
				name: '',
				list: {
					data: [],
					head: []
				},
				listTest: {
					data: [],
					head: []
				},
				showTable: true,
				screenHeight: 0,
				total: null,
        listLoading: true,
        testSitesList:[],
        checkPointsId: '',
        listQuery: {
          period: '',
          grade: '',
          pageNo: 1,
          pageSize: 50,
          specialTopicId: ''
        },
			}
		},
		computed: {
      ...mapGetters([
        'gradeNo',
        'subject'
      ])
    },
		created() {
    },
		mounted() {
      this.screenHeight = this.setTableHeight(true);

			this.name = this.$route.query.name;

      this.listQuery.specialTopicId = this.$route.query.specialTopicId;
      this.listQuery.grade = attrGrade();
      this.listQuery.period = attrPeriod();
			
      this.getList('');

      this.getUseTestSites();
		},
		methods: {
			getList(val) {
        this.listLoading = true;
        if(this.checkPointsId == ''){
        	console.log(1)
	        getSpecialTopic(this.listQuery).then(res => {
	        	if(res == undefined){
	        		this.list.data = [];
	        		this.listLoading = false;
	        		this.showTable = true;
	        		return
	        	}
	          this.list.data = res.data.data.data;
	          this.list.head = res.data.data.head;
	          this.total = res.data.data.total;
	          this.listLoading = false;
        		this.showTable = true;
	        })
	      }else{
	      	let query = {
	      		pageNo: this.listQuery.pageNo,
	      		pageSize: this.listQuery.pageSize,
	      		checkPointsId: this.checkPointsId,
	      		grade: this.listQuery.grade,
	      		period: this.listQuery.period
	      	}
	      	queryschoolCheckPoints(query).then(res => {
	      		if(res == undefined){
	      			this.listTest.data = [];
	          	return
	      		}
	      		this.listTest.data = res.data.data.data;
	          this.listTest.head = res.data.data.head;
	          this.total = res.data.data.total;
	          this.listLoading = false;
	      	})
	      }
      },
      getUseTestSites(){
      	let query = {
      		id: this.$route.query.specialTopicId,
      		subject: this.subject
      	}
      	getUseTestSites(query).then(res => {
      		if(res == undefined){
      			this.testSitesList = [];
      			return
      		}
      		this.testSitesList = res.data.list;
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
      formatter(val) {
      	if(val < 60 ) {
      		return 'red'
      	}else if(val == 60 ) {
      		return 'rgb(251,178,23)'
      	}else if(val>90) {
      		return 'rgb(6,128,67)'
      	}
      },
      testChange(val) {
      	this.listQuery.pageNo = 1;
      	this.getList(val);
      },
      selectClear(){
      	this.listQuery.pageNo = 1;
      	this.getList('');
      }
		}
	}
</script>