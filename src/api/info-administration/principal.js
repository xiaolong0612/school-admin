import fetch from 'utils/fetch';

export function principalIndex(query) {
	console.log(query)
  return fetch({
    url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
    method: 'post',
    params: query
  })
}