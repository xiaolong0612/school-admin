/**
 * 通用的data 
 */

/**
 * @Author    xiaolongjun
 * @DateTime  2017-08-31
 * @namespace
 * @param     {[type]}    type [年级类型]
 * @return    {[type]}         [年级列表]
 */
export function gradeList(type){
	let grade_list = [
		{
			label:'小学',
			options: [
				{ label: '一年级' },
				{ label: '二年级' },
				{ label: '三年级' },
				{ label: '四年级' },
				{ label: '五年级' },
				{ label: '六年级' }
			]
		},
		{
			label:'初中',
			options: [
				{ label: '七年级' },
				{ label: '八年级' },
				{ label: '九年级' },
			]
		},
		{
			label:'高中',
			options: [
				{ label: '高一年' },
				{ label: '高二年' },
				{ label: '高三年' }
			]
		}
	];
	switch (type) {
		case '小学':
			return grade_list.slice(0);
			break;
		case '初中':
			return grade_list.slice(1);
			break;
		case '高中':
			return grade_list.slice(2);
			break;
		case 'all':
			return grade_list;
			break;
	}
}