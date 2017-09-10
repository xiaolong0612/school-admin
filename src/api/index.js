import fetch from 'utils/fetch';
/**
 * @author xiaolong
 * @default 首页
 */
export function student(query) {
  return fetch({
    url: '/admin/student/get-top',
    method: 'post',
    params: query
  });
}

export function teacher() {
  return fetch({
    url: '',
    method: 'post',
  });
}

// 年段长／班主任
export function headmaster(query) {
  return fetch({
    url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
    method: 'post',
    params: query
  });
}

// 教育局
// export function headmaster(query) {
//   return fetch({
//     url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
//     method: 'post',
//     params: query
//   });
// }