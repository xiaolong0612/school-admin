<template>
	<div>
		<el-table :data="tableData" border style="width: 100%" :max-height="maxHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
			<el-table-column prop="school" label="学校" width="120" fixed></el-table-column>
			<el-table-column prop="class" label="班级" width="120" fixed></el-table-column>
			<el-table-column label='入学考试' header-align='center'>
				<el-table-column prop="chineseAverage" label="平均分" width="100"></el-table-column>
				<el-table-column label="均分" width="100" sortable>
					<template scope="scope">
						<div :formatter="formatter(scope.row)" :class="{cRed: isRed}">{{scope.row.chineseScoringRate}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="chineseAreaPlace" label="位置" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='七上质检' header-align='center'>
				<el-table-column prop="gradeer" label="备课组长" width="100"></el-table-column>
				<el-table-column prop="chineseAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="mathematicsAverage" label="得分率" width="100"></el-table-column>
				<el-table-column prop="mathematicsAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsExceedAverage" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='七下质检' header-align='center'>
				<el-table-column prop="gradeer" label="备课组长" width="100"></el-table-column>
				<el-table-column prop="chineseAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="mathematicsAverage" label="得分率" width="100"></el-table-column>
				<el-table-column prop="mathematicsAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsExceedAverage" label="进步值" width="100"></el-table-column>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
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
	]
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
	}
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
	export default {
		data() {
			return {
				name: '总分监控表',
				tableData,
				maxHeight: '',
				isRed: false,
				selectedSubject: '',
				subjectList
			}
		},
		mounted() {
			this.maxHeight = window.innerHeight-80;
			window.onresize = () => {
	          return (() => {
	            this.maxHeight = window.innerHeight-80;
	          })()
	        }
		},
		methods: {
			formatter(row) {
				if(row.chineseScoringRate < 6){
					this.isRed = true
				}
			},
			subjectChange(val) {
				console.log(val);
			}
		}
	}
</script>