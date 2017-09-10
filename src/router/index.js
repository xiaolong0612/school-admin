import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* error log */
const ErrorLog = _import('errlog/index');

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* permission */
const Permission = _import('permission/index');

/* demo */
const Upload = _import('demo/Upload');
const Data = _import('demo/data');
/* 首页 */
const TeacherIndex = _import('teacher/index');        //学科教师0 
const DirectorIndex = _import('director/index');     // 班主任1、年段长3
const PrincipalIndex = _import('principal/index');    // 教务处5、 校领导6
const InstructorIndex = _import('instructor/index'); // 教研员7
const BureauIndex = _import('bureau/index');         // 教育局8、进修学校领导9
const StudentIndex = _import('student/index');       // 学生10

// 成绩管理
const TotalScore = _import('achievement/total-score');
const DisciplineHierarchy = _import('achievement/discipline-hierarchy');
const AdministrationDisciplineHierarchy = _import('achievement/administration-discipline-hierarchy');
const AllClass = _import('achievement/all-class');
const AllStudent = _import('achievement/all-student');
const TeachingDisciplineHierarchy = _import('achievement/teaching-discipline-hierarchy');
const DisciplineAverage = _import('achievement/discipline-average');
const AdministrationAverage = _import('achievement/administration-average');
const SectionClassDisciplineHierarchy = _import('achievement/section-class-discipline-hierarchy');
const SubjectScore = _import('achievement/subject-score');
const AnnualSplit = _import('achievement/annual-split');
const StudentScore = _import('achievement/student-score');
const TeachingAverage = _import('achievement/teaching-average');
const SectionClass = _import('achievement/section-class');
const AdministrationCom = _import('achievement/administration-com')
// 考点管理
const AddTest = _import('test-site/add-test');
const IndexTest = _import('test-site/index');
// 专题管理
const ScoringMonitoring = _import('special/scoring-monitoring');
const ScoringItem = _import('special/scoring-item');
const ScoringTestItem = _import('special/test-item');
const Quality = _import('special/quality');
const SpecialQualitySchool = _import('special/quality-school');
const Analysis = _import('special/analysis');
// 优良率
const ExcellentRegion = _import('excellent/region');
const ExcellentRegionSchool = _import('excellent/region-scholl');
const ExcellentRegionTable = _import('excellent/region-table');
const ExcellentRegionSchoolTable = _import('excellent/region-school-table');
const ExcellentSubject = _import('excellent/subject');
const ExcellentRegionSubject = _import('excellent/region-subject');
const ExcellentClassSubject = _import('excellent/class-subject');
const ExcellentSchool = _import('excellent/school');
const ExcellentClass = _import('excellent/class');
const ExcellentRegionAllSubject = _import('excellent/region-all-subject');

const LowScoreRegion = _import('low-score/region');
const LowScoreRegionSchool = _import('low-score/region-scholl');
const LowScoreRegionTable = _import('low-score/region-table');
const LowScoreRegionSchoolTable = _import('low-score/region-school-table');
const LowScoreSubject = _import('low-score/subject');
const LowScoreRegionSubject = _import('low-score/region-subject');
const LowScoreClassSubject = _import('low-score/class-subject');
const LowScoreSchool = _import('low-score/school');
const LowScoreClass = _import('low-score/class');
const LowScoreRegionAllSubject = _import('low-score/region-all-subject');

const PassScoreRegion = _import('pass-score/region');
const PassScoreRegionSchool = _import('pass-score/region-scholl');
const PassScoreRegionTable = _import('pass-score/region-table');
const PassScoreRegionSchoolTable = _import('pass-score/region-school-table');
const PassScoreSubject = _import('pass-score/subject');
const PassScoreRegionSubject = _import('pass-score/region-subject');
const PassScoreClassSubject = _import('pass-score/class-subject');
const PassScoreSchool = _import('pass-score/school');
const PassScoreClass = _import('pass-score/class');
const PassScoreRegionAllSubject = _import('pass-score/region-all-subject');

// 能力
const AbilityIndex = _import('ability/index');
const AbilitySchool = _import('ability/school');
const AbilitySpecial = _import('ability/special');
const AbilityAnalysis = _import('ability/analysis');
// 总分管理
const FractionRegion = _import('fraction/region');
const FractionAdministration = _import('fraction/administration');
// 学科管理
const SubjectSchool = _import('subject/school');
const SubjectAdministration = _import('subject/administration');
const SubjectTeaching = _import('subject/teaching');
// P值
const PSingleSchool = _import('P/single-school');
const PSingleClass = _import('P/single-class');
const PAllSchool = _import('P/all-school');
const PAllRegion = _import('P/all-region');
const PAllClass = _import('P/all-class');
const PSingleRegion = _import('P/single-region');
const PSingleRegionClass = _import('P/single-region-class');
// 学生页
const StudentSubject = _import('student/subject/subject');
const StudentSpecial = _import('student/subject/special');
const StudentTest = _import('student/subject/test');
const StudentQuestions = _import('student/subject/questions');
const StudentSummary = _import('student/subject/summary');
const StudentMark = _import('student/mark');
// const StudentChinese = () => import('../views/student/subject/Chinese');
// const StudentEnglish = () => import('../views/student/subject/English');
// const StudentMathematics = () => import('../views/student/subject/Mathematics');
// const StudentHistory = () => import('../views/student/subject/History');
// const StudentMoral = () => import('../views/student/subject/Moral'); // 思品
// const StudentGeography = () => import('../views/student/subject/Geography'); // 地理
// const StudentChemistry = () => import('../views/student/subject/Chemistry'); // 化学
// const StudentPhysics = () => import('../views/student/subject/Physics'); // 物理
// const StudentBiology = () => import('../views/student/subject/Biology'); // 生物

const ClassList = _import('List/class-list');
const StudentList = _import('List/student-list');
const TaskList = _import('List/task-list');
const TeacherList = _import('List/teacher-list');
const SchoolList = _import('List/school-list');
const PaperList = _import('List/paper-list');
const ExaminationList = _import('List/examination-list');

const getSchoolList = _import('info-administration/school/get-school-list');
const addSchool = _import('info-administration/school/add-school');

// form
const formExamination = _import('form/examination');
const formTest = _import('form/test');

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
    hidden: true,
    children: [
      {path: 'upload', component: Upload, name: '图片上传'},
      {path: 'data', component: Data, name: 'data'}
    ]
  },
  {
    path: '/form',
    component: Layout,
    name: 'form',
    hidden: true,
    children: [
      {path: 'examination', component: formExamination, name: '新增试题', meta: { role: ['7'] } },
      {path: 'test', component: formTest, name: '新增考点', meta: { role: ['7'] } }
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
    path: '/test',
    component: Layout,
    name: '考点',
    redirect: '/test/index',
    icon: 'shouye-shouye',
    meta: { role: ['7'] },
    noDropdown: true,
    children: [
      {path: 'index', name: '考点', component: IndexTest, meta: { role: ['7'] } }
    ]
  },
  {
    path: '/achievement',
    component: Layout,
    name: '成绩管理',
    icon: 'chengjiguanli',
    meta: { role: ['0', '1', '3', '5', '6', '7', '8', '9'] },
    children: [
      {
        path: 'total-score',
        component: TotalScore,
        name: '全区各校单考总分',
        meta: { role: ['0', '1', '3', '5', '6', '7', '8', '9'] }
      }, {
        path: 'administration-com',
        component: AdministrationCom,
        name: '行政班单考总表',
        meta: { role: ['1', '5', '6'] }
      },{
        path: 'area-all-student-com',
        name: '区单考学生成绩总表',
        meta: { role: ['5', '6'] }
      },{
        path: 'section-class',
        component: SectionClass,
        name: '年段各班总分',
        meta: { role: ['0']}
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
        name: '单试学科学生总分',
        meta: { role: ['0'] }
      }, {
        path: 'all-class',
        name: '班级单次考试',
        component: AllClass,
        meta: { role: [ '8', '9'] }
      }, {
        path: 'administration-discipline-hierarchy',
        name: '行政班学科分层',
        component: AdministrationDisciplineHierarchy,
        meta: { role: [ '3', '7'] }
      }, {
        path: 'teaching-discipline-hierarchy',
        component: TeachingDisciplineHierarchy,
        name: "教学班学科分层",
        meta: { role: ['7'] }
      }, {
        path: 'all-student',
        name: '学生单考',
        component: AllStudent,
        meta: { role: [ '1', '3', '8', '9'] }
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
    meta: { role: ['admin'] },
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
    meta: { role: ['0', '7'] },
    children: [
      {
        path: 'scoring-monitoring',
        component: ScoringMonitoring,
        name: '得分率',
        meta: { role: ['0', '7'] },
      }, {
        path: 'scoring-item',
        component: ScoringItem,
        name: '专题得分率',
        meta: { role: ['0', '7'] },
        hidden: true
      }, {
        path: 'scoring-test-item',
        component: ScoringTestItem,
        name: '考点管理',
        hidden: true,
        meta: { role: ['0', '7'] }
      }, {
        path: 'quality',
        component: Quality,
        name: '质量管理',
        meta: { role: ['0', '7'] }
      }, {
        path: 'quality-school',
        component: SpecialQualitySchool,
        name: '质量管理',
        meta: { role: ['0', '7'] },
        hidden: true
      }, {
        path: 'analysis',
        component: Analysis,
        name: '质量分析',
        meta: { role: ['0', '7'] }
      }
    ]
  }, 
  {
    path: '/excellent',
    component: Layout,
    name: '优良率',
    icon: 'kaoshi',
    meta: { role: [ '1', '3','5','6', '7', '8', '9'] },
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
        meta: { role: [ '8', '9'] }
      }, {
        path: 'area-class-subjest',
        name: '区各班级单科',
        meta: { role: ['5','6'] }
      },{
        path: 'class-subject',
        component: ExcellentClassSubject,
        name: '所有班级单科',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'region-all-subject',
        name: '全区各科',
        component: ExcellentRegionAllSubject,
        meta: { role: [ '8', '9'] }
      }, {
        path: 'school',
        component: ExcellentSchool,
        name: '历考学校各科优良率',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'class',
        component: ExcellentClass,
        name: '班级历次各科优良率',
        meta: {role: [ '1', '3','5','6', '8', '9' ] }
      }
    ]
  },
  {
    path: '/low-score',
    component: Layout,
    name: '低分率',
    icon: 'kaoshi',
    meta: { role: [ '1', '3', '7', '8', '9'] },
    children: [
      {
        path: 'region',
        component: LowScoreRegion,
        name: ' 区优良率图',
        meta: { role: ['7'] }
      }, {
        path: 'region-school',
        component: LowScoreRegionSchool,
        name: ' 区优良率表',
        meta: { role: ['1', '3', '7'] },
        hidden: true
      }, {
        path: 'region-table',
        component: LowScoreRegionTable,
        name: ' 区优良率表',
        meta: { role: ['7'] },
      }, {
        path: 'region-school-table',
        component: LowScoreRegionSchoolTable,
        name: ' 学校优良率表',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'subject',
        component: LowScoreSubject,
        name: '学科优良率',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'region-subject',
        component: LowScoreRegionSubject,
        name: '全区单科',
        meta: { role: [ '8', '9'] }
      }, {
        path: 'area-class-subjest',
        name: '区各班级单科',
        meta: { role: ['5','6'] }
      },{
        path: 'class-subject',
        component: LowScoreClassSubject,
        name: '所有班级单科',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'region-all-subject',
        name: '全区各科',
        component: LowScoreRegionAllSubject,
        meta: { role: [ '8', '9'] }
      }, {
        path: 'school',
        component: LowScoreSchool,
        name: '历考学校各科优良率',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'class',
        component: LowScoreClass,
        name: '班级历次各科优良率',
        meta: {role: [ '1', '3','5','6', '8', '9' ] }
      }
    ]
  },
  {
    path: '/pass-score',
    component: Layout,
    name: '及格率',
    icon: 'kaoshi',
    meta: { role: [ '1', '3', '7', '8', '9'] },
    children: [
      {
        path: 'region',
        component: PassScoreRegion,
        name: ' 区优良率图',
        meta: { role: ['7'] }
      }, {
        path: 'region-school',
        component: PassScoreRegionSchool,
        name: ' 区优良率表',
        meta: { role: ['1', '3', '7'] },
        hidden: true
      }, {
        path: 'region-table',
        component: PassScoreRegionTable,
        name: ' 区优良率表',
        meta: { role: ['7'] },
      }, {
        path: 'region-school-table',
        component: PassScoreRegionSchoolTable,
        name: ' 学校优良率表',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'subject',
        component: PassScoreSubject,
        name: '学科优良率',
        meta: { role: ['7'] },
        hidden: true
      }, {
        path: 'region-subject',
        component: PassScoreRegionSubject,
        name: '全区单科',
        meta: { role: [ '8', '9'] }
      }, {
        path: 'area-class-subjest',
        name: '区各班级单科',
        meta: { role: ['5','6'] }
      },{
        path: 'class-subject',
        component: PassScoreClassSubject,
        name: '所有班级单科',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'region-all-subject',
        name: '全区各科',
        component: PassScoreRegionAllSubject,
        meta: { role: [ '8', '9'] }
      }, {
        path: 'school',
        component: PassScoreSchool,
        name: '历考学校各科优良率',
        meta: { role: ['1', '3','5','6', '8', '9'] }
      }, {
        path: 'class',
        component: PassScoreClass,
        name: '班级历次各科优良率',
        meta: {role: [ '1', '3','5','6', '8', '9' ] }
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
    name: '总分管理',
    component: Layout,
    icon: 'zongfen',
    meta: { role: [ '1', '3','5','6','7', '8', '9'] },
    children: [
      { path: 'regoin', name: '历检全区总分', component: FractionRegion, meta: { role: [ '1', '3','5','6','7', '8', '9'] } },
      { path: 'administration', name: '历检全区行政班', component: FractionAdministration, meta: { role: [ '1', '3','5','6','7', '8', '9'] } }
    ]
  },
  {
    path: '/subject',
    name: '学科管理',
    component: Layout,
    icon: 'xueke',
    meta: { role: [ '1', '3','5','6', '8', '9'] },
    children: [
      {
        path: 'shcool',
        name: '历检全区学校',
        component: SubjectSchool,
        meta: { role: [ '1', '3','5','6', '8', '9'] }
      },
      {
        path: 'administration',
        name: '历检区行政班',
        component: SubjectAdministration,
        meta: { role: [ '1', '3', '5','6','8', '9'] }
      },
      {
        path: 'teaching',
        name: '历检全区教学班',
        component: SubjectTeaching,
        meta: { role: [ '1', '3','5','6', '8', '9'] }
      }
    ]
  },
  {
    path: '/p',
    name: 'P值管理',
    component: Layout,
    icon: 'p',
    meta: { role: ['100'] },
    // meta: { role: ['admin'] },
    children: [
      {
        path: 'single-region',
        name: '单次全区',
        component: PSingleRegion,
        meta: { role: ['1', '3', '8', '9'] }
      },
      {
        path: 'single-class',
        name: '单次班级',
        component: PSingleClass,
        meta: { role: ['1', '3', '8', '9'] }
      },
      {
        path: 'all-region',
        name: '所有全区',
        component: PAllRegion,
        meta: { role: ['1', '3', '8', '9'] }
      },
      {
        path: 'all-class',
        name: '所有班级',
        component: PAllClass,
        meta: { role: ['1', '3', '8', '9'] }
      }
    ]
  },
  // {
  //   path: 'personnel-man',
  //   name: '人员管理',
  //   component: PAllClass,
  //   meta: { role: ['5', '6'] },
  //   children: [

  //   ]
  // },
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
      {path: 'examination-list/:id/:name', component: ExaminationList, name: '试题列表', meta: { role: ['7'] } }
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
    meta: { role: ['7'] },
    hidden: true,
    children: [
      {path: 'list', component: TaskList, name: '任务列表', meta: { role: ['7'] } }
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
  // {
  //   path: '/paper',
  //   component: Layout,
  //   name: '试卷',
  //   icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
  //   meta: { role: ['7'] },
  //   hidden: true,
  //   children: [
  //     {path: 'list', component: PaperList, name: '试卷列表', meta: { role: ['7'] } }
  //   ]
  // },
  // {
  //   path: '/examination',
  //   component: Layout,
  //   name: '试题列表',
  //   icon: 'caigoutonggerenbangaobaozhengerenzhongxin265',
  //   meta: { role: ['7'] },
  //   hidden: true,
  //   children: [
      
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
];






















