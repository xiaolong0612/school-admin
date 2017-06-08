<template>
	<div style="min-height:100%;">
		<el-form :inline="true" :model="formData" class="demo-form-inline">
			<el-form-item>
				<el-select v-model="formData.selectedSpecial" filterable placeholder="请选择" :change="specialChange(formData.selectedSpecial)">
				  <el-option v-for="item in specialList" :label="item.label" :value="item.value" :key="item.value">
				  </el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="formData.selectedTest" clearable placeholder="请选择" :change="testChange(formData.selectedTest)">
				  <el-option v-for="item in testList" filterable :label="item.label" :value="item.value" :key="item.value">
				  </el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div>
			<template>
		    <el-table :data="tableData" border style="width: 100%" :max-height="maxHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
      <el-table-column prop="school" label="学校" width="120" fixed></el-table-column>
      <el-table-column label='七上质检' header-align='center'>
        <el-table-column prop="mathematicsAverage" label="得分率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAverage" label="超均率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsExceedAverage" label="进步值" width="100"></el-table-column>
      </el-table-column>
      <el-table-column label='七下质检' header-align='center'>
        <el-table-column prop="mathematicsAverage" label="得分率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAverage" label="超均率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsExceedAverage" label="进步值" width="100"></el-table-column>
      </el-table-column>
      <el-table-column label='八上质检' header-align='center'>
        <el-table-column prop="mathematicsAverage" label="得分率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAverage" label="超均率" width="100"></el-table-column>
        <el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
        <el-table-column prop="mathematicsExceedAverage" label="进步值" width="100"></el-table-column>
      </el-table-column>
    </el-table>
		  </template>
		</div>
	</div>
</template>
<script>
    const specialList = [
    	{value: '语言积累'},
    	{value: '语言运用'},
    	{value: '非连文本阅读'},
    	{value: '名著阅读'},
    	{value: '诗歌阅读'},
    	{value: '文言文阅读'},
    	{value: '议论文阅读'},
    	{value: '文学作品阅读'},
    	{value: '作文'},
    	{value: '全卷'}
    ];
    const testList = {
		语言积累: [
			{value: '0', label: '词语使用'},
	    	{value: '1', label: '修改病句'},
	    	{value: '2', label: '仿写'},
	    	{value: '3', label: '修辞运用'},
	    	{value: '4', label: '续写补写'},
	    	{value: '5', label: '对联'},
	    	{value: '6', label: '情景描述'},
	    	{value: '7', label: '标点符号'},
	    	{value: '8', label: '语序'},
	    	{value: '9', label: '对话'}
		],
		语言运用: [
			{value: '0', label:'语言运用'}
		],
		非连文本阅读: [
			{value: '0', label:'非连文本阅读'}
		]
    	
    };
    const tableData = [];
  const subjectList = [
    {value: '0', label: '语文'},
      {value: '1', label: '数学'},
      {value: '2', label: '英语'},
      {value: '3', label: '物理'},
      {value: '4', label: '化学'},
      {value: '5', label: '地理'},
      {value: '6', label: '思品'},
      {value: '7', label: '历史'}
  ];
  for(var i = 0; i < 15; i++) {
    tableData.push({
      school: '启悟中学'+i,
      class: i + '班',
      factor: i,
      candidatesNumber: '120',
      gradeer: '小龙君',
      chineseHeadman: '小龙君',
      chineseAverage: 98,
      chineseScoringRate: i+i,
      chineseExceedAverage: '70%',
      chineseAreaPlace: 40,
      chineseCityPlace: 100,
      chineseProgressNumber: 20,
      mathematicsHeadman: '小龙君',
      mathematicsAverage: 98,
      mathematicsScoringRate: '80%',
      mathematicsExceedAverage: '70%',
      mathematicsAreaPlace: 40,
      mathematicsCityPlace: 100,
      mathematicsProgressNumber: 20,
      EnglishHeadman: '小龙君',
      EnglishAverage: 98,
      EnglishScoringRate: '80%',
      EnglishExceedAverage: '70%',
      EnglishAreaPlace: 40,
      EnglishCityPlace: 100,
      EnglishProgressNumber: 20,
      totalScoreAverage: 98,
      totalScoreScoringRate: '80%',
      totalScoreExceedAverage: '70%',
      totalScoreAreaPlace: 40,
      totalScoreCityPlace: 100,
      totalScoreProgressNumber: 20,
      equivalentTotalScoreAverage: 98,
      equivalentTotalScoreScoringRate: '80%',
      equivalentTotalScoreExceedAverage: '70%',
      equivalentTotalScoreAreaPlace: 40,
      equivalentTotalScoreCityPlace: 100,
      equivalentTotalScoreProgressNumber: 20,
    })
  };
  for(var i = 15; i < 30; i++) {
    tableData.push({
      school: '育才中学'+i,
      class: i + '班',
      factor: i,
      candidatesNumber: '120',
      gradeer: '小龙君',
      chineseHeadman: '小龙君',
      chineseAverage: 98,
      chineseScoringRate: i*0.5,
      chineseExceedAverage: '70%',
      chineseAreaPlace: 40,
      chineseCityPlace: 100,
      chineseProgressNumber: 20,
      mathematicsHeadman: '小龙君',
      mathematicsAverage: 98,
      mathematicsScoringRate: '80%',
      mathematicsExceedAverage: '70%',
      mathematicsAreaPlace: 40,
      mathematicsCityPlace: 100,
      mathematicsProgressNumber: 20,
      EnglishHeadman: '小龙君',
      EnglishAverage: 98,
      EnglishScoringRate: '80%',
      EnglishExceedAverage: '70%',
      EnglishAreaPlace: 40,
      EnglishCityPlace: 100,
      EnglishProgressNumber: 20,
      totalScoreAverage: 98,
      totalScoreScoringRate: '80%',
      totalScoreExceedAverage: '70%',
      totalScoreAreaPlace: 40,
      totalScoreCityPlace: 100,
      totalScoreProgressNumber: 20,
      equivalentTotalScoreAverage: 98,
      equivalentTotalScoreScoringRate: '80%',
      equivalentTotalScoreExceedAverage: '70%',
      equivalentTotalScoreAreaPlace: 40,
      equivalentTotalScoreCityPlace: 100,
      equivalentTotalScoreProgressNumber: 20,
    })
  }
    // 考点
    export default {
      data() {
        return {
          name: '总分监控表',
          tableData,
          maxHeight: '',
          isRed: false,
          selectedSubject: '',
          subjectList,
          formData: {
          	selectedSpecial: '语言积累',
            selectedTest: '',
      	  },
          specialList: specialList,
          testList: testList['语言积累']
        }
      },
      mounted() {
        this.maxHeight = window.innerHeight-80;
        window.onresize = () => {
            return (() => {
              this.maxHeight = window.innerHeight-120;
            })()
          }
      },
      methods: {
        formatter(row) {
          if(row.chineseScoringRate < 6){
            this.isRed = true
          }
        },
        specialChange(value) {
        	this.testList = testList[value];
          // this.formData.selectedTest = '';
          // this.formData.selectedTest = this.testList[0].label
        },
        testChange(value) {
          if(this.testList[value] == undefined) {
            this.formData.selectedTest = '';
          }

        }
      }
    }
</script>
