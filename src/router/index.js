import Vue from 'vue';
import Router from 'vue-router';

/* layout*/
import Layout from '../views/layout/Layout';

// dashboard
const dashboard = () => import('../views/dashboard/index');

/* error page*/
const Err404 = () => import('../views/error/404');
const Err401 = () => import('../views/error/401');

/* login*/
import Login from '../views/login/';
import authRedirect from '../views/login/authredirect';
import sendPWD from '../views/login/sendpwd';
import reset from '../views/login/reset';

/* error log*/
const ErrorLog = () => import('../views/errlog/index');

/* permission */
const Permission = () => import('../views/permission/index');

/* demo */
const Upload = () => import('../views/demo/Upload');
const Data = () => import('../views/demo/Data');
/* 首页 */
const TeacherIndex = () => import('../views/teacher/index');        //学科教师0 
const DirectorIndex = () => import('../views/director/index');     // 年段长、班主任1、3
const InstructorIndex = () => import('../views/instructor/index'); // 教研员7
const BureauIndex = () => import('../views/bureau/index');         // 教育局8、9
const StudentIndex = () => import('../views/student/index');       // 学生10

// 成绩管理
const TotalScore = () => import('../views/achievement/total-score');
const DisciplineHierarchy = () => import('../views/achievement/discipline-hierarchy');
const AdministrationDisciplineHierarchy = resolve => require(['../views/achievement/administration-discipline-hierarchy'], resolve);
const AllClass = resolve => require(['../views/achievement/all-class'], resolve);
const AllStudent = resolve => require(['../views/achievement/all-student'], resolve);
const TeachingDisciplineHierarchy = resolve => require(['../views/achievement/teaching-discipline-hierarchy'], resolve);
const DisciplineAverage = resolve => require(['../views/achievement/discipline-average'], resolve);
const AdministrationAverage = resolve => require(['../views/achievement/administration-average'], resolve);
const SectionClassDisciplineHierarchy = () => import('../views/achievement/section-class-discipline-hierarchy');
const SubjectScore = () => import('../views/achievement/subject-score');
const AnnualSplit = () => import('../views/achievement/annual-split');
const StudentScore = () => import('../views/achievement/student-score');
const TeachingAverage = () => import('../views/achievement/teaching-average');
const SectionClass = () => import('../views/achievement/section-class');
// 考点管理
const AddTest = resolve => require(['../views/test-site/add-test'], resolve);
// 专题管理
const ScoringMonitoring = resolve => require(['../views/special/scoring-monitoring'], resolve);
const ScoringItem = resolve => require(['../views/special/scoring-item.vue'], resolve);
const ScoringTestItem = resolve => require(['../views/special/test-item'], resolve);
const Quality = resolve => require(['../views/special/quality'], resolve);
const SpecialQualitySchool = resolve => require(['../views/special/quality-school'], resolve);
const Analysis = resolve => require(['../views/special/analysis'], resolve);
// 优良率
const ExcellentRegion = resolve => require(['../views/excellent/region'], resolve);
const ExcellentRegionSchool = resolve => require(['../views/excellent/region-scholl'], resolve);
const ExcellentRegionTable = resolve => require(['../views/excellent/region-table'], resolve);
const ExcellentRegionSchoolTable = resolve => require(['../views/excellent/region-school-table'], resolve);
const ExcellentSubject = resolve => require(['../views/excellent/subject'], resolve);
const ExcellentRegionSubject = resolve => require(['../views/excellent/region-subject'] ,resolve);
const ExcellentClassSubject = resolve => require(['../views/excellent/class-subject'] ,resolve);
const ExcellentSchool = resolve => require(['../views/excellent/school'], resolve);
const ExcellentClass = resolve => require(['../views/excellent/class'], resolve);
const ExcellentRegionAllSubject = resolve => require(['../views/excellent/region-all-subject'], resolve);
// 能力
const AbilityIndex = resolve => require(['../views/ability/index'], resolve);
const AbilitySchool = resolve => require(['../views/ability/school'], resolve);
const AbilitySpecial = resolve => require(['../views/ability/special'], resolve);
const AbilityAnalysis = resolve => require(['../views/ability/analysis'], resolve);
// 总分管理
const FractionRegion = resolve => require(['../views/fraction/region'], resolve);
const FractionAdministration = resolve => require(['../views/fraction/administration'], resolve);
// 学科管理
const SubjectSchool = resolve => require(['../views/subject/school'], resolve);
const SubjectAdministration = resolve => require(['../views/subject/administration'], resolve);
const SubjectTeaching = resolve => require(['../views/subject/teaching'], resolve);
// P值
const PSingleSchool = resolve => require(['../views/P/single-school'], resolve);
const PSingleClass = resolve => require(['../views/P/single-class'], resolve);
const PAllSchool = resolve => require(['../views/P/all-school'], resolve);
const PAllRegion = resolve => require(['../views/P/all-region'], resolve);
const PAllClass = resolve => require(['../views/P/all-class'], resolve);
const PSingleRegion = resolve => require(['../views/P/single-region'], resolve);
const PSingleRegionClass = resolve => require(['../views/P/single-region-class'], resolve);
// 学生页
const StudentSubject = () => import('../views/student/subject/subject');
const StudentSpecial = () => import('../views/student/subject/special');
const StudentTest = () => import('../views/student/subject/test');
const StudentQuestions = () => import('../views/student/subject/questions');
const StudentSummary = () => import('../views/student/subject/summary');
const StudentMark = () => import('../views/student/mark');
// const StudentChinese = () => import('../views/student/subject/Chinese');
// const StudentEnglish = () => import('../views/student/subject/English');
// const StudentMathematics = () => import('../views/student/subject/Mathematics');
// const StudentHistory = () => import('../views/student/subject/History');
// const StudentMoral = () => import('../views/student/subject/Moral'); // 思品
// const StudentGeography = () => import('../views/student/subject/Geography'); // 地理
// const StudentChemistry = () => import('../views/student/subject/Chemistry'); // 化学
// const StudentPhysics = () => import('../views/student/subject/Physics'); // 物理
// const StudentBiology = () => import('../views/student/subject/Biology'); // 生物

const getSchoolList = resolve =>require(['../views/info-administration/school/get-school-list'], resolve);
const addSchool = resolve => require(['../views/info-administration/school/add-school'], resolve);

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  */

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
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
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
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
    children: [{ path: 'log', component: ErrorLog, name: '错误日志' }]
  },
  {
    path: '/demo',
    component: Layout,
    name: 'demo',
    icon: 'zonghe',
    hidden: true,
    children: [
      {path: 'upload', component: Upload, name: '图片上传'}
    ]
  },
  {
    path: '/data',
    component: Layout,
    name: 'data',
    icon: 'zonghe',
    hidden: true,
    children: [
      {path: 'data', component: Data, name: 'data'}
    ]
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
  { // 教育局领导
    path: '/bureau',
    name: '首页',
    component: Layout,
    redirect: '/bureau/index',
    icon: 'shouye-shouye',
    noDropdown: true,
    meta: { role: ['8', '9']},
    children: [
      {path: 'index', name: '教育局', component: BureauIndex, meta: { role: ['8', '9'] } }
    ]
  },
  { // 年段长
    path: '/director',
    name: '',
    component: Layout,
    redirect: '/director/index',
    icon: 'shouye-shouye',
    meta: { role: ['1', '3'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '年段长', component: DirectorIndex, meta: { role: ['1' ,'3'] } }
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
    path: '/info',
    component: Layout,
    name: '增删改查',
    hidden: true,
    meta: { role: ['7'] },
    children: [
      {
        path: 'get-school-list',
        component: getSchoolList,
        name: '学校列表',
        meta: { role: ['7'] }
      },{
        path: 'add-school',
        component: addSchool,
        name: '添加学校',
        meta: { role: ['7'] }
      }
    ]
  },
  {
    path: '/achievement',
    component: Layout,
    name: '成绩管理',
    icon: 'chengjiguanli',
    meta: { role: ['0', '1', '3', '7', '9'] },
    children: [
      {
        path: 'total-score',
        component: TotalScore,
        name: '总分',
        meta: { role: ['0', '1', '3', '7', '9'] }
      }, {
        path: 'section-class',
        component: SectionClass,
        name: '年段各班总分',
        meta: { role: ['0'] }
      }, {
        path: 'discipline-hierarchy',
        component: DisciplineHierarchy,
        name: '学科分层',
        meta: { role: ['7'] }
      }, {
        path: 'section-class-discipline-hierarchy',
        component: SectionClassDisciplineHierarchy,
        name: '年段学科分层',
        meta: { role: ['0'] }
      }, {
        path: 'subject-score',
        component: SubjectScore,
        name: '年段学科分层',
        meta: { role: ['0'] }
      }, {
        path: 'all-class',
        name: '班级单次考试',
        component: AllClass,
        meta: { role: ['9'] }
      }, {
        path: 'all-student',
        name: '学生单次考试',
        component: AllStudent,
        meta: { role: [ '1', '3', '9'] }
      }, {
        path: 'administration-discipline-hierarchy',
        name: '行政班学科分层',
        component: AdministrationDisciplineHierarchy,
        meta: { role: [ '1', '3', '7'] }
      }, {
        path: 'teaching-discipline-hierarchy',
        component: TeachingDisciplineHierarchy,
        name: "教学班学科分层",
        meta: { role: ['7'] }
      }, {
        path: 'discipline-average',
        component: DisciplineAverage,
        name: '学科均分',
        meta: { role: ['7'] }
      }, {
        path: 'annual-split',
        component: AnnualSplit,
        name: '年段学科均分',
        meta: { role: ['0'] }
      }, {
        path: 'student-score',
        component: StudentScore,
        name: '学生得分',
        meta: { role: ['0'] }
      }, {
        path: 'administration-average',
        component: AdministrationAverage,
        name: '行政班均分',
        meta: { role: ['7'] }
      }, {
        path: 'teaching-average',
        component: TeachingAverage,
        name: '教学班均分',
        meta: { role: ['7'] }
      }
    ]
  }, {
    path: '/test-site',
    redirect: '/test-site/add-test',
    component: Layout,
    name: '考点管理',
    icon: 'zhuantiguanli',
    noDropdown: true,
    meta: { role: ['7'] },
    children: [
      {
        path: 'add-test',
        component: AddTest,
        name: '设置考点',
        meta: { role: ['7'] }
      }
    ]
  }, {
    path: '/special',
    component: Layout,
    name: '专题管理',
    icon: 'kaoshi',
    meta: { role: ['7'] },
    children: [
      {
        path: 'scoring-monitoring',
        component: ScoringMonitoring,
        name: '得分率',
        meta: { role: ['7'] },
      }, {
        path: 'scoring-item',
        component: ScoringItem,
        name: '专题得分率',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'scoring-test-item',
        component: ScoringTestItem,
        name: '考点管理',
        hidden: true,
        meta: { role: ['7'] }
      }, {
        path: 'quality',
        component: Quality,
        name: '质量管理',
        meta: { role: ['7'] }
      }, {
        path: 'quality-school',
        component: SpecialQualitySchool,
        name: '质量管理',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'analysis',
        component: Analysis,
        name: '质量分析',
        meta: { role: ['7'] }
      }
    ]
  }, 
  {
    path: '/excellent',
    component: Layout,
    name: '优良率',
    icon: 'kaoshi',
    meta: { role: [ '1', '3', '7', '9'] },
    children: [
      {
        path: 'region',
        component: ExcellentRegion,
        name: ' 区优良率图',
        meta: { role: ['7'] }
      }, {
        path: 'region-school',
        component: ExcellentRegionSchool,
        name: ' 区优良率表',
        meta: { role: ['1', '3', '7'] },
        hidden: true
      }, {
        path: 'region-table',
        component: ExcellentRegionTable,
        name: ' 区优良率表',
        meta: { role: ['7'] },
      }, {
        path: 'region-school-table',
        component: ExcellentRegionSchoolTable,
        name: ' 学校优良率表',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'subject',
        component: ExcellentSubject,
        name: '学科优良率',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'region-subject',
        component: ExcellentRegionSubject,
        name: '全区单科',
        meta: { role: ['9'] }
      }, {
        path: 'class-subject',
        component: ExcellentClassSubject,
        name: '所有班级单科',
        meta: { role: ['1', '3', '9'] }
      }, {
        path: 'region-all-subject',
        name: '全区各科',
        component: ExcellentRegionAllSubject,
        meta: { role: ['9'] }
      }, {
        path: 'school',
        component: ExcellentSchool,
        name: '学校历次各科优良率',
        meta: { role: ['1', '3', '9'] }
      }, {
        path: 'class',
        component: ExcellentClass,
        name: '班级历次各科优良率',
        meta: {role: [ '1', '3', '9' ] }
      }
    ]
  }, 
  {
    path: '/ability',
    component: Layout,
    name: '能力发展',
    icon: 'kaoshi',
    noDropdown: true,
    meta: { role: ['7'] },
    children: [
      {
        path: 'index',
        component: AbilityIndex,
        name: '能力发展',
        meta: { role: ['7'] }
      },
      {
        path: 'school',
        component: AbilitySchool,
        name: '能力发展',
        meta: { role: ['7'] }
      },
      {
        path: 'special',
        component: AbilitySpecial,
        name: '能力发展',
        meta: { role: ['7'] }
      },
      {
        path: 'analysis',
        component: AbilityAnalysis,
        name: '分析',
        meta: { role: ['7'] }
      }
    ]
  },
  {
    path: '/fraction',
    name: '总分',
    component: Layout,
    icon: 'zongfen',
    meta: { role: [ '1', '3', '9'] },
    children: [
      { path: 'regoin', name: '全区总分', component: FractionRegion, meta: { role: [ '1', '3', '9'] } },
      { path: 'administration', name: '全区行政班', component: FractionAdministration, meta: { role: [ '1', '3', '9'] } }
    ]
  },
  {
    path: '/subject',
    name: '学科管理',
    component: Layout,
    icon: 'xueke',
    meta: { role: [ '1', '3', '9'] },
    children: [
      {
        path: 'shcool',
        name: '学校',
        component: SubjectSchool,
        meta: { role: [ '1', '3', '9'] }
      },
      {
        path: 'administration',
        name: '行政班',
        component: SubjectAdministration,
        meta: { role: [ '1', '3', '9'] }
      },
      {
        path: 'teaching',
        name: '教学班',
        component: SubjectTeaching,
        meta: { role: [ '1', '3', '9'] }
      }
    ]
  },
  {
    path: '/p',
    name: 'P值管理',
    component: Layout,
    icon: 'p',
    meta: { role: ['1', '3', '9'] },
    children: [
      {
        path: 'single-region',
        name: '单次全区',
        component: PSingleRegion,
        meta: { role: ['1', '3', '9'] }
      },
      {
        path: 'single-class',
        name: '单次班级',
        component: PSingleClass,
        meta: { role: ['1', '3', '9'] }
      },
      {
        path: 'all-region',
        name: '所有全区',
        component: PAllRegion,
        meta: { role: ['1', '3', '9'] }
      },
      {
        path: 'all-class',
        name: '所有班级',
        component: PAllClass,
        meta: { role: ['1', '3', '9'] }
      }
    ]
  },
  {
    path: '/student-mark',
    name: '历次质检表',
    component: Layout,
    icon: 'kaoshi',
    meta: { role: ['10'] },
    noDropdown: true,
    children: [
      { path: 'index', name: '成绩总表', component: StudentMark, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/student-subject',
    name: '学科管理',
    component: Layout,
    icon: 'kaoshi',
    meta: { role: ['10'] },
    noDropdown: true,
    children: [
      { path: 'index', name: '学科管理', component: StudentSubject, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/student-special',
    name: '专题',
    component: Layout,
    meta: { role: ['10'] },
    hidden: true,
    children: [
      { path: 'index', name: '专题', component: StudentSpecial, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/student-test',
    name: '考点',
    component:  Layout,
    meta: { role: ['10'] },
    hidden: true,
    children: [
      { path: 'index', name: '考点', component: StudentTest, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/student-questions',
    name: '考题',
    component:  Layout,
    meta: { role: ['10'] },
    noDropdown: true,
    children: [
      { path: 'index', name: '考题管理', component: StudentQuestions, meta: { role: ['10'] } }
    ]
  },
  {
    path: '/student-summary',
    name: '总结',
    component:  Layout,
    meta: { role: ['10'] },
    noDropdown: true,
    children: [
      { path: 'index', name: '考后总结', component: StudentSummary, meta: { role: ['10'] } }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];






















