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
export function bureau(data) {
  return fetch({
    url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
    method: 'post',
    data
  });
}

// 通用首页
export function teacherTop(id) {
  var data = { id }
  return fetch({
    url: '/admin/schoo-basic/teacherTop',
    method: 'post',
    params: data
  });
}

// 教务处
export function principalIndex(query) {
  console.log(query)
  return fetch({
    url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
    method: 'post',
    params: query
  })
}