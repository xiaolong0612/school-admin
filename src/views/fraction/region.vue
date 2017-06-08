<template>
	<div>
		<el-table :data="tableData" border style="width: 100%" :max-height="maxHeight" :default-sort = "{prop: 'chineseScoringRate', order: 'descending'}">
			<el-table-column prop="school" label="单位" width="150" fixed></el-table-column>
			<el-table-column prop='factor' label="生数" width="90" sortable></el-table-column>
			<el-table-column prop='candidatesNumber' label="考生数" width='100'></el-table-column>
			<el-table-column prop='gradeer' label='年段长' width="120"></el-table-column>
			<el-table-column label='语文' header-align='center'>
				<el-table-column prop="chineseHeadman" label="组长" width="100"></el-table-column>
				<el-table-column prop="chineseAverage" label="均分" width="100"></el-table-column>
				<el-table-column label="得分率" width="100" sortable>
					<template scope="scope">
						<div :formatter="formatter(scope.row)" :class="{cRed: isRed}">{{scope.row.chineseScoringRate}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="chineseExceedAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="chineseAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="chineseCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="chineseProgressNumber" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='数学' header-align='center'>
				<el-table-column prop="mathematicsHeadman" label="组长" width="100"></el-table-column>
				<el-table-column prop="mathematicsAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="mathematicsScoringRate" label="得分率" width="100"></el-table-column>
				<el-table-column prop="mathematicsExceedAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="mathematicsAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="mathematicsProgressNumber" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='英语' header-align='center'>
				<el-table-column prop="EnglishHeadman" label="组长" width="100"></el-table-column>
				<el-table-column prop="EnglishAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="EnglishScoringRate" label="得分率" width="100"></el-table-column>
				<el-table-column prop="EnglishExceedAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="EnglishAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="EnglishCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="EnglishProgressNumber" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='总分' header-align='center'>
				<el-table-column prop="totalScoreAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="totalScoreScoringRate" label="得分率" width="100"></el-table-column>
				<el-table-column prop="totalScoreExceedAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="totalScoreAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="totalScoreCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="totalScoreProgressNumber" label="进步值" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label='折合总分' header-align='center'>
				<el-table-column prop="equivalentTotalScoreAverage" label="均分" width="100"></el-table-column>
				<el-table-column prop="equivalentTotalScoreScoringRate" label="得分率" width="100"></el-table-column>
				<el-table-column prop="equivalentTotalScoreExceedAverage" label="超均率" width="100"></el-table-column>
				<el-table-column prop="equivalentTotalScoreAreaPlace" label="区位置" width="100"></el-table-column>
				<el-table-column prop="equivalentTotalScoreCityPlace" label="市位置" width="100"></el-table-column>
				<el-table-column prop="equivalentTotalScoreProgressNumber" label="进步值" width="100"></el-table-column>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	const tableData = [];
	for(var i = 0; i < 15; i++) {
		tableData.push({
			school: '启悟中学'+i,
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
				isRed: false
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
			}
		}
	}
</script>