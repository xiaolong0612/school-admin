import Vue from 'vue';
import Router from 'vue-router';

/* layout*/
import Layout from '../views/layout/Layout';

// dashboard
const dashboard = resolve => require(['../views/dashboard/index'], resolve);

/* error page*/
const Err404 = resolve => require(['../views/error/404'], resolve);
const Err401 = resolve => require(['../views/error/401'], resolve);

/* login*/
import Login from '../views/login/';
import authRedirect from '../views/login/authredirect';
import sendPWD from '../views/login/sendpwd';
import reset from '../views/login/reset';

/* error log*/
const ErrorLog = resolve => require(['../views/errlog/index'], resolve);

/* permission */
const Permission = resolve => require(['../views/permission/index'], resolve);

/* demo */
const Upload = resolve => require(['../views/demo/Upload'], resolve);
/* 首页 */
const InstructorIndex = resolve => require(['../views/instructor/index'], resolve); // 教研员7
const BureauIndex = resolve => require(['../views/bureau/index'], resolve);         // 教育局9

// 成绩管理
const TotalScore = resolve => require(['../views/achievement/total-score'], resolve);
const DisciplineHierarchy = resolve => require(['../views/achievement/discipline-hierarchy'], resolve);
const AdministrationDisciplineHierarchy = resolve => require(['../views/achievement/administration-discipline-hierarchy'], resolve);
const AllClass = resolve => require(['../views/achievement/all-class'], resolve);
const AllStudent = resolve => require(['../views/achievement/all-student'], resolve);
const TeachingDisciplineHierarchy = resolve => require(['../views/achievement/teaching-discipline-hierarchy'], resolve);
const DisciplineAverage = resolve => require(['../views/achievement/discipline-average'], resolve);
const AdministrationAverage = resolve => require(['../views/achievement/administration-average'], resolve);
const TeachingAverage = resolve => require(['../views/achievement/teaching-average'], resolve);
// 考点管理
const AddTest = resolve => require(['../views/test-site/add-test'], resolve);
// 专题管理
const ScoringMonitoring = resolve => require(['../views/special/scoring-monitoring'], resolve);
const ScoringItem = resolve => require(['../views/special/scoring-item.vue'], resolve);
const Quality = resolve => require(['../views/special/quality'], resolve);
const Analysis = resolve => require(['../views/special/analysis'], resolve);
// 优良率
const ExcellentRegion = resolve => require(['../views/excellent/region'], resolve);
const ExcellentSubject = resolve => require(['../views/excellent/subject'], resolve);
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
const PAllClass = resolve => require(['../views/P/all-class'], resolve);

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
  { // 教研员
    path: '/instructor',
    component: Layout,
    redirect: '/instructor/index',
    name: '首页',
    icon: 'shouye-shouye',
    meta: { role: ['7'] },
    noDropdown: true,
    children: [{ path: 'index', component: InstructorIndex, name: '首页' }]
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
      {path: 'index', component: BureauIndex, name: '首页', meta: { role: ['9'] } }
    ]
  },
  {
    path: '/info',
    component: Layout,
    name: '增删改查',
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
    meta: { role: ['7', '9'] },
    children: [
      {
        path: 'total-score',
        component: TotalScore,
        name: '总分',
        meta: { role: ['7', '9'] }
      }, {
        path: 'discipline-hierarchy',
        component: DisciplineHierarchy,
        name: '学科分层',
        meta: { role: ['7'] }
      }, {
        path: 'all-class',
        name: '班级单次考试',
        component: AllClass,
        meta: { role: ['9'] }
      }, {
        path: 'all-student',
        name: '学生单次考试',
        component: AllStudent,
        meta: { role: ['9'] }
      }, {
        path: 'administration-discipline-hierarchy',
        name: '行政班学科分层',
        component: AdministrationDisciplineHierarchy,
        meta: { role: ['7'] }
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
        path: 'quality',
        component: Quality,
        name: '质量管理',
        meta: { role: ['7'] }
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
    meta: { role: ['7'] },
    children: [
      {
        path: 'region',
        component: ExcellentRegion,
        name: ' 区优良率',
        meta: { role: ['7'] }
      }, {
        path: 'subject',
        component: ExcellentSubject,
        name: '学科优良率',
        meta: { role: ['7'] }
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
    icon: '',
    meta: { role: ['9'] },
    children: [
      { path: 'regoin', name: '全区总分', component: FractionRegion, meta: { role: ['9'] } },
      { path: 'administration', name: '全区行政班', component: FractionAdministration, meta: { role: ['9'] } }
    ]
  },
  {
    path: '/subject',
    name: '学科管理',
    component: Layout,
    icon: '',
    meta: { role: ['9'] },
    children: [
      {
        path: 'shcool',
        name: '学校',
        component: SubjectSchool,
        meta: { role: ['9'] }
      },
      {
        path: 'administration',
        name: '行政班',
        component: SubjectAdministration,
        meta: { role: ['9'] }
      },
      {
        path: 'teaching',
        name: '教学班',
        component: SubjectTeaching,
        meta: { role: ['9'] }
      }
    ]
  },
  {
    path: '/p',
    name: 'P值管理',
    component: Layout,
    icon: '',
    meta: { role: ['9'] },
    children: [
      {
        path: 'single-school',
        name: '单次全区',
        component: PSingleSchool,
        meta: { role: ['9'] }
      },
      {
        path: 'single-class',
        name: '单次全区班级',
        component: PSingleClass,
        meta: { role: ['9'] }
      },
      {
        path: 'all-school',
        name: '所有全区',
        component: PAllSchool,
        meta: { role: ['9'] }
      },
      {
        path: 'all-class',
        name: '所有全区班级',
        component: PAllClass,
        meta: { role: ['9'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
