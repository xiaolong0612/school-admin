function set(page) {
	let height = 0,
			pageHeight = 62,
			titleHeight = 36, // 含padding
			margin = 45;
	if (document.getElementById('ui-search-wrap')!=undefined) {
		height = document.getElementById('ui-search-wrap').offsetHeight;
		margin += 15;
	}
	// 搜索框height
	height = parseInt(height);
	if(page) {
		pageHeight = 0;
		margin += 15;
	}
	height = window.innerHeight - height - pageHeight - titleHeight - margin - 50;
	return height
}
export function setTableHeight(page){
	let data = set(page);
	return data;
}