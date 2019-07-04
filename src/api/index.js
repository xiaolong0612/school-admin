import fetch from 'utils/fetch';
/**
 * @author xiaolong
 * @default 首页
 */
export function indexSide(data){
  return fetch({
    url: '/admin/schoo-basic/teacherTop-left',
    method: 'post',
    data
  })
}
export function student(data) {
  return fetch({
    url: '/admin/student/get-top',
    method: 'post',
    data
  });
}
// 学科教师
export function teacher(data) {
  return fetch({
    url: '/admin/class-basic/get-top',
    method: 'post',
    data
  });
}
// 学科老师获取班级列表
export function teacgetTeacherClassher(data) {
  return fetch({
    url: '/admin/teacher/getTeacherClass',
    method: 'post',
    data
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
export function teacherTop(data) {
  return fetch({
    url: '/admin/schoo-basic/teacherTop',
    method: 'post',
    data
  });
}

// 教务处
export function principalIndex(data) {
  return fetch({
    url: '/admin/schoo-basic/getExaminationPaperByPeriodAndGrade',
    method: 'post',
    data
  })
}
// 一键升级
export function oneUpdata(data) {
  return fetch({
    url: '/refresh',
    method: 'post',
    data
  })
}
