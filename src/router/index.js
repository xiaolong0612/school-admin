import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* dashboard */
const dashboard = _import('dashboard/index');

/* permission */
const Permission = _import('permission/index');

/* 首页 */
const TeacherIndex = _import('teacher/index');        //学科教师0 
const DirectorIndex = _import('director/index');     // 班主任1、年段长3
const PrincipalIndex = _import('principal/index');    // 教务处5、 校领导6
const InstructorIndex = _import('instructor/index'); // 教研员7
const BureauIndex = _import('bureau/index');         // 教育局8、进修学校领导9
const StudentIndex = _import('student/index');       // 学生10

// 考点管理
const IndexTest = _import('test-site/index');
const TestItem = _import('test-site/test-item');

const ClassList = _import('List/class-list');
const StudentList = _import('List/student-list');
const TaskList = _import('List/task-list');
const TeacherList = _import('List/teacher-list');
const SchoolList = _import('List/school-list');
const PaperList = _import('List/paper-list');
const ExaminationList = _import('List/examination-list');

/**
 * 项目重构
 * 避免命名重复
 * 模块命名都以文件夹名称开始
 * 每个模块下都新建.md文件，说明当前文件（目录结构）
 */
// 成绩管理
const gradesSubjectTotalScores = _import('grades/subject-total-scores');
const gradesClassTotalScores = _import('grades/class-total-scores');
const gradesSubjectLayering = _import('grades/subject-layering/index');
const gradesSubjectLayering_admin = _import('grades/subject-layering/admin');
const gradesSubjectLayering_teaching = _import('grades/subject-layering/teaching');
const gradesStudentGradesLayering = _import('grades/student-grades-layering');
const gradesSubjectAverage = _import('grades/subject-average/index');
const gradesSubjectAverage_admin = _import('grades/subject-average/admin');
const gradesSubjectAverage_teaching = _import('grades/subject-average/teaching');
const gradesTotalAcoresTrack = _import('grades/total-scores-track');

const gradesExcellentRote_echart = _import('grades/excellent-rate/echart');
const gradesExcellentRote_table = _import('grades/excellent-rate/table');
const gradesExcellentRote_class = _import('grades/excellent-rate/class');

const gradesLowRote_echart = _import('grades/low-rate/echart');
const gradesLowRote_table = _import('grades/low-rate/table');
const gradesLowRote_class = _import('grades/low-rate/class');

const gradesPassRote_echart = _import('grades/pass-rate/echart');
const gradesPassRote_table = _import('grades/pass-rate/table');
const gradesPassRote_class = _import('grades/pass-rate/class');

// 专题管理
const specialScoreRate = _import('special/score-rate/score-rate');
const specialScoreRate_school = _import('special/score-rate/school');
const specialQualitManage = _import('special/qualit-manage');
const specialQualitAnalysis = _import('special/qualit-analysis');

// 总分管理
const total_scoreTotalScoresTrack = _import('total-score/total-scores-track');
// 学科管理
const subjectSubjectAverage = _import('subject/subject-average');
const subjectSchoolSubject = _import('subject/school-subject');
const subjectClassSubject = _import('subject/class-subject');
Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  */

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('error/401'), hidden: true },
    { path: '/401', component: _import('error/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    hidden: true,
    meta: { role: ['7'] },
    noDropdown: true,
    children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['7'] } }]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    hidden: true,
    children: [
      { path: '401', component: _import('error/401'), name: '401' },
      { path: '404', component: _import('error/404'), name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    hidden: true,
    noDropdown: true,
    children: [{ path: 'log', component: _import('errlog/index'), name: '错误日志' }]
  },
  { // 学科教师
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    name: '首页',
    icon: 'shouye-shouye',
    meta: { role: ['0'] },
    noDropdown: true,
    children: [{ path: 'index', name: '学科教师', component: TeacherIndex, meta: { role: ['0'] } }]
  },
  { // 班主任
    path: '/headmaster',
    name: '',
    component: Layout,
    redirect: '/headmaster/index',
    icon: 'shouye-shouye',
    meta: { role: ['1'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '班主任', component: DirectorIndex, meta: { role: ['1'] } }
    ]
  },
  { // 年段长
    path: '/director',
    name: '',
    component: Layout,
    redirect: '/director/index',
    icon: 'shouye-shouye',
    meta: { role: ['3'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '年段长', component: DirectorIndex, meta: { role: ['3'] } }
    ]
  },
  { // 教务处
    path: '/principal',
    component: Layout,
    redirect: '/principal/index',
    name: '首页',
    icon: 'shouye-shouye',
    meta: { role: ['5'] },
    noDropdown: true,
    children: [{ path: 'index', name: '教务处', component: PrincipalIndex, meta: { role: ['5'] } }]
  }, 
  { // 校领导
    path: '/principal',
    component: Layout,
    redirect: '/principal/index',
    name: '首页',
    icon: 'shouye-shouye',
    meta: { role: ['6'] },
    noDropdown: true,
    children: [{ path: 'index', name: '校领导', component: PrincipalIndex, meta: { role: ['6'] } }]
  }, 
  { // 教研员
    path: '/instructor',
    component: Layout,
    redirect: '/instructor/index',
    name: '首页',
    icon: 'shouye-shouye',
    meta: { role: ['7'] },
    noDropdown: true,
    children: [{ path: 'index', name: '教研员', component: InstructorIndex, meta: { role: ['7'] } }]
  }, 
  { // 进修校领导
    path: '/training-college',
    name: '首页',
    component: Layout,
    redirect: '/training-college/index',
    icon: 'shouye-shouye',
    noDropdown: true,
    meta: { role: ['8']},
    children: [
      {path: 'index', name: '进修学校领导', component: BureauIndex, meta: { role: ['8'] } }
    ]
  },
  { // 教育局领导
    path: '/bureau',
    name: '首页',
    component: Layout,
    redirect: '/bureau/index',
    icon: 'shouye-shouye',
    noDropdown: true,
    meta: { role: ['9']},
    children: [
      {path: 'index', name: '教育局', component: BureauIndex, meta: { role: ['9'] } }
    ]
  },
  { // 学生
    path: '/student',
    name: '首页',
    component: Layout,
    redirect: '/student/index',
    icon: 'shouye-shouye',
    meta: { role: ['10'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '学生', component: StudentIndex, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: '专题列表',
    redirect: '/test/index',
    icon: 'zhuanti1',
    meta: { role: ['7'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '专题列表', component: IndexTest, meta: { role: ['7'] } },
      {path: 'item/:name/:id/:subject', name: '考点列表', component: TestItem, meta: { role: ['7'] } },
    ]
  },
  {
    path: '/paper',
    redirect: '/paper/list',
    component: Layout,
    name: '试卷管理',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    noDropdown: true,
    meta: { role: ['7'] },
    children: [
      {path: 'list', component: PaperList, name: '试卷管理', meta: { role: ['7'] } },
      {path: 'examination-list/:id/:name/:subject', component: ExaminationList, name: '试题列表', meta: { role: ['7'] } }
    ]
  },
  {
    path: '/grades',
    component: Layout,
    name: '成绩管理',
    icon: 'chengjiguanli',
    meta: { role: ['0', '1', '3', '5', '6', '7', '8', '9'] },
    children: [
      {
        path: 'subject-total-scores',
        component: gradesSubjectTotalScores,
        name: '各科总分监控',
        meta: { role: ['0', '1', '3', '5', '6', '7', '8', '9'] }
      },
      {
        path: 'class-total-scores',
        component: gradesClassTotalScores,
        name: '班级总分监控',
        meta: { role: ['0', '1', '3', '5', '6', '8', '9'] }
      },
      {
        path: 'subject-layering',
        component: gradesSubjectLayering,
        name: '学科分层监控',
        meta: { role: [ '7', '0'] }
      },
      {
        path: 'subject-layering/admin',
        component: gradesSubjectLayering_admin,
        name: '行政班',
        hidden: true,
        meta: { role: ['9','0'] }
      },
      {
        path: 'subject-layering/teaching',
        component: gradesSubjectLayering_teaching,
        name: '教学班',
        hidden: true,
        meta: { role: ['9','0'] }
      },
      {
        path: 'student-grades-layering',
        component: gradesStudentGradesLayering,
        name: '学生成绩监控',
        meta: { role: ['0', '1', '3','6', '5', '8', '9'] }
      },
      {
        path: 'subject-average',
        component: gradesSubjectAverage,
        name: ' 学科均分监控',
        meta: { role: ['7','0'] }
      },
      {
        path: 'subject-average/admin',
        component: gradesSubjectAverage_admin,
        name: '行政班',
        hidden: true,
        meta: { role: ['9','0'] }
      },
      {
        path: 'subject-average/teaching',
        component: gradesSubjectAverage_teaching,
        name: '教学班',
        hidden: true,
        meta: { role: ['9','0'] }
      },
      {
        path: 'total-scores-track',
        component: gradesTotalAcoresTrack,
        name: '总分跟踪管理',
        meta: { role: ['7'] }
      },
      {
        path: 'excellent-rate/echart',
        component: gradesExcellentRote_echart,
        hidden: true,
        name: '优良率',
        meta: { role: ['7'] }
      },
      {
        path: 'excellent-rate/table',
        component: gradesExcellentRote_table,
        name: '优良率',
        meta: { role: ['7'] }
      },
      {
        path: 'excellent-rate/class',
        component: gradesExcellentRote_class,
        hidden: true,
        name: '优良率-班级',
        meta: { role: [ '7'] }
      },
      {
        path: 'pass-rate/echart',
        component: gradesPassRote_echart,
        hidden: true,
        name: '及格率',
        meta: { role: [ '7'] }
      },
      {
        path: 'pass-rate/table',
        component: gradesPassRote_table,
        name: '及格率',
        meta: { role: [ '7'] }
      },
      {
        path: 'pass-rate/class',
        component: gradesPassRote_class,
        hidden: true,
        name: '及格率-班级',
        meta: { role: [ '7'] }
      },
      {
        path: 'low-rate/echart',
        component: gradesLowRote_echart,
        hidden: true,
        name: '低分率',
        meta: { role: [ '7'] }
      },
      {
        path: 'low-rate/table',
        component: gradesLowRote_table,
        name: '低分率',
        meta: { role: [ '7'] }
      },
      {
        path: 'low-rate/class',
        component: gradesLowRote_class,
        hidden: true,
        name: '低分率-班级',
        meta: { role: [ '7'] }
      },
      // 学科教师使用
      {
        path: '/teacher/excellent-rate',
        component: _import('grades/teacher/index'),
        name: '优良率',
        meta: { role: [ '0'] },
        children: [
          { path: 'echart', component: _import('grades/teacher/excellent-rate/echart'), name: '区优良率监控图' },
          { path: 'class-echart', component: _import('grades/teacher/excellent-rate/class-echart'), name: '区行政班／教学班优良率监控图',hidden: true },
          { path: 'table', component: _import('grades/teacher/excellent-rate/table'), name: '区优良率监控表',hidden: true },
          { path: 'class-table', component: _import('grades/teacher/excellent-rate/class-echart'), name: '班优良率监控表',hidden: true },
          { path: 'subject', component: _import('grades/teacher/excellent-rate/subject'), name: '学科质量跟踪' },
          { path: 'student-special', component: _import('grades/teacher/excellent-rate/student'), name: '学生考点监控图',hidden: true },
          { path: 'student-special-test', component: _import('grades/teacher/excellent-rate/student-test'), name: '学生考点监控图',hidden: true },
        ]
      },
      {
        path: '/teacher/low-rate',
        component: _import('grades/teacher/index'),
        name: '低分率',
        meta: { role: [ '0'] },
        children: [
          { path: 'echart', component: _import('grades/teacher/low-rate/echart'), name: '区低分率监控图' },
          { path: 'class-echart', component: _import('grades/teacher/low-rate/class-echart'), name: '区行政班／教学班低分率监控图',hidden: true },
          { path: 'table', component: _import('grades/teacher/low-rate/table'), name: '区低分率监控表',hidden: true },
          { path: 'class-table', component: _import('grades/teacher/low-rate/class-echart'), name: '班低分率监控表',hidden: true },
          { path: 'subject', component: _import('grades/teacher/low-rate/subject'), name: '学科质量跟踪' },
          { path: 'student-special', component: _import('grades/teacher/low-rate/student'), name: '学生考点监控图',hidden: true },
          { path: 'student-special-test', component: _import('grades/teacher/low-rate/student-test'), name: '学生考点监控图',hidden: true },
        ]
      },
      {
        path: '/teacher/pass-rate',
        component: _import('grades/teacher/index'),
        name: '得分率',
        meta: { role: [ '0'] },
        children: [
          { path: 'echart', component: _import('grades/teacher/pass-rate/echart'), name: '区得分率监控图' },
          { path: 'class-echart', component: _import('grades/teacher/pass-rate/class-echart'), name: '区行政班／教学班得分率监控图',hidden: true },
          { path: 'table', component: _import('grades/teacher/pass-rate/table'), name: '区得分率监控表',hidden: true },
          { path: 'class-table', component: _import('grades/teacher/pass-rate/class-echart'), name: '班得分率监控表',hidden: true },
          { path: 'subject', component: _import('grades/teacher/pass-rate/subject'), name: '学科质量跟踪' },
          { path: 'student-special', component: _import('grades/teacher/pass-rate/student'), name: '学生考点监控图',hidden: true },
          { path: 'student-special-test', component: _import('grades/teacher/pass-rate/student-test'), name: '学生考点监控图',hidden: true },
        ]
      },
    ]
  },
  {
    path: '/special',
    component: Layout,
    name: '专题管理',
    icon: 'guanli',
    meta: { role: ['7', '0'] },
    children: [
      {
        path: 'score-rate',
        component: specialScoreRate,
        name: '得分率'
      },
      {
        path: 'score-rate/school',
        component: specialScoreRate_school,
        hidden: true,
        name: '得分率-某专题各学校得分率'
      },
      {
        path: 'qualit-manage',
        component: specialQualitManage,
        name: '质量管理',
        hidden: true,
      },
      {
        path: 'qualit-analysis',
        component: specialQualitAnalysis,
        name: '质量分析'
      }
    ]
  },
  {
    path: '/excellent',
    component: Layout,
    name: '优良率',
    icon: 'guanli',
    meta: { role: ['1', '3', '5', '6', '8', '9'] },
    children: [
      {
        path: 'subject',
        component: _import('excellent/subject'),
        name: '各学科优良率' 
      },
      {
        path: 'class-subject',
        component: _import('excellent/class-subject'),
        name: '班级各学科' 
      },
      {
        path: 'aera-subject-compare',
        component: _import('excellent/aera-subject-compare'),
        name: '全区各科优良率比较' 
      },
      {
        path: 'school-subject-compare',
        component: _import('excellent/school-subject-compare'),
        name: '学校各科优良率比较' 
      },
      {
        path: 'class-subiect-compare',
        component: _import('excellent/class-subiect-compare'),
        name: '班级各科优良率比较' 
      },
    ]
  },
  {
    path: '/pass-rate',
    component: Layout,
    name: '及格率',
    icon: 'guanli',
    meta: { role: ['1', '3', '5', '6', '8', '9'] },
    children: [
      {
        path: 'subject',
        component: _import('pass-rate/subject'),
        name: '各学科及格率' 
      },
      {
        path: 'class-subject',
        component: _import('pass-rate/class-subject'),
        name: '班级各学科' 
      },
      {
        path: 'aera-subject-compare',
        component: _import('pass-rate/aera-subject-compare'),
        name: '全区各科及格率比较' 
      },
      {
        path: 'school-subject-compare',
        component: _import('pass-rate/school-subject-compare'),
        name: '学校各科及格率比较' 
      },
      {
        path: 'class-subiect-compare',
        component: _import('pass-rate/class-subiect-compare'),
        name: '班级各科及格率比较' 
      },
    ]
  },
  {
    path: '/low-rate',
    component: Layout,
    name: '低分率',
    icon: 'guanli',
    meta: { role: ['1', '3', '5', '6', '8', '9'] },
    children: [
      {
        path: 'subject',
        component: _import('low-rate/subject'),
        name: '各学科低分率' 
      },
      {
        path: 'class-subject',
        component: _import('low-rate/class-subject'),
        name: '班级各学科' 
      },
      {
        path: 'aera-subject-compare',
        component: _import('low-rate/aera-subject-compare'),
        name: '全区各科低分率比较' 
      },
      {
        path: 'school-subject-compare',
        component: _import('low-rate/school-subject-compare'),
        name: '学校各科低分率比较' 
      },
      {
        path: 'class-subiect-compare',
        component: _import('low-rate/class-subiect-compare'),
        name: '班级各科低分率比较' 
      },
    ]
  },
  {
    path: '/total-score',
    redirect: '/total-score/index',
    component: Layout,
    name: '总分管理',
    icon: 'guanli',
    meta: { role: [ '1', '3', '5', '6', '8', '9'] },
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: total_scoreTotalScoresTrack,
        name: '总分跟踪管理',
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    name: '学科管理',
    icon: 'guanli',
    meta: { role: ['1', '3', '5', '6', '8', '9' ] },
    children: [
      {
        path: 'subject-average',
        component: subjectSubjectAverage,
        name: '学科均分监控表',
      },
      // {
      //   path: 'school-subject',
      //   component: subjectSchoolSubject,
      //   name: '学校各科均分',
      // },
      {
        path: 'class-subject',
        component: subjectClassSubject,
        name: '班级各科均分',
      },
    ]
  },
  {
    path: '/ability',
    redirect: '/ability/index',
    component: Layout,
    name: '能力发展',
    icon: 'nenglizhi',
    noDropdown: true,
    meta: { role: ['0'] },
    children: [
      {
        path: 'index',
        component: _import('ability/index'),
        name: '年级学科能力监控图',
      },
      {
        path: 'class',
        component: _import('ability/class'),
        name: '班级学科能力监控图',
      },
      {
        path: 'special',
        component: _import('ability/track'),
        name: '班级学科能力跟踪表',
      }    
    ]
  },
  {
    path: '/student',
    redirect: '/student/score',
    component: Layout,
    name: '质检成绩总表',
    icon: 'nenglizhi',
    noDropdown: true,
    meta: { role: ['10'] },
    children: [
      {path: 'score', component: _import('student/score'), name: '质检成绩总表'}
    ]
  },
  {
    path: '/student',
    redirect: '/student/sbuject',
    component: Layout,
    name: '质量监控图',
    icon: 'nenglizhi',
    noDropdown: true,
    meta: { role: ['10'] },
    children: [
      {path: 'sbuject', component: _import('student/subject'), name: '质量监控图'}
    ]
  },
  {
    path: '/class',
    component: Layout,
    name: '班级列表',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    meta: { role: ['3','5','6'] },
    hidden: true,
    children: [
      {path: 'list', component: ClassList, name: '班级列表', meta: { role: ['3','5','6'] } }
    ]
  },
  {
    path: '/student',
    component: Layout,
    name: '学生列表',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    meta: { role: ['5','6'] },
    hidden: true,
    children: [
      {path: 'list', component: StudentList, name: '学生列表', meta: { role: ['5','6'] } }
    ]
  },
  {
    path: '/task',
    component: Layout,
    name: '任务列表',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    meta: { role: ['5', '6', '7'] },
    hidden: true,
    children: [
      {path: 'list', component: TaskList, name: '任务列表', meta: { role: ['5', '6', '7'] } }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    name: '老师列表',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    meta: { role: ['5', '6'] },
    hidden: true,
    children: [
      {path: 'list', component: TeacherList, name: '学生列表', meta: { role: ['5', '6'] } }
    ]
  },
  {
    path: '/school',
    component: Layout,
    name: '学校列表',
    icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
    meta: { role: ['9'] },
    hidden: true,
    children: [
      {path: 'list', component: SchoolList, name: '学校列表', meta: { role: ['9'] } }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];






















