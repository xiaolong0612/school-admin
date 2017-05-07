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
import loginType from '../views/login/loginType'
import Login from '../views/login/';
import authRedirect from '../views/login/authredirect';
import sendPWD from '../views/login/sendpwd';
import reset from '../views/login/reset';

/* 教员页 */

/* Introduction*/
const Introduction = resolve => require(['../views/introduction/index'], resolve);

/* components*/
const componentsIndex = resolve => require(['../views/components/index'], resolve);

/* error log*/
const ErrorLog = resolve => require(['../views/errlog/index'], resolve);

/* excel*/
const ExcelDownload = resolve => require(['../views/excel/index'], resolve);

/* theme*/
const Theme = resolve => require(['../views/theme/index'], resolve);

/* example*/
const DynamicTable = resolve => require(['../views/example/dynamictable'], resolve);

/* permission */
const Permission = resolve => require(['../views/permission/index'], resolve);





Vue.use(Router);

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
        { path: '/login-type', component: loginType, hidden: true },
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
    }, {
      path: '/introduction',
      component: Layout,
      redirect: '/introduction/index',
      icon: 'xinrenzhinan',
      noDropdown: true,
      children: [
            { path: 'index', component: Introduction, name: '简述' }
      ]
    }, {
      path: '/permission',
      component: Layout,
      redirect: '/permission/index',
      name: '权限测试',
      icon: 'quanxian',
      meta: { role: ['teacher'] },
      noDropdown: true,
      children: [
            { path: 'index', component: Permission, name: '权限测试页', meta: { role: ['teacher'] } }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
});
