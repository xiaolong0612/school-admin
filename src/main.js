import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/custom-theme/index.css'; // 换肤版本element-ui css https://github.com/PanJiaChen/custom-element-theme
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式
import 'components/Icon-svg/index'; // 封装的svg组件
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
// import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
// import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
// import Sticky from 'components/Sticky'; // 粘性header组件
import vueWaves from './directive/waves';// 水波纹指令
import errLog from 'store/errLog';// error log组件
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import RegionPicker from 'region-picker' // 省市区三级联动
import Cookies from 'js-cookie';
import { getToken } from 'utils/auth';

import { gpath } from 'utils/index'; // 全局的path
Vue.prototype.gpath = gpath;

import { setTableHeight } from 'utils/tableHeight'; // 全局设置table高度的函数
Vue.prototype.setTableHeight = setTableHeight;

// register globally
// Vue.component('multiselect', Multiselect);
// Vue.component('Sticky', Sticky);
Vue.use(ElementUI);
Vue.use(vueWaves);
Vue.use(RegionPicker);
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (typeof getToken() != 'undefined') { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.name === '') { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(user => { // 拉取user_info
          // console.log(user)
          let query = {
            pageNo: 1,
            pageSize: 30,
            subject: '',
            name: '',
            grade: ''
          };
          // store.dispatch('SetPaper', query).then(paperRes => { // 拉取考试信息

          // })
          const roles = store.getters.roles;
            // let roles = ['admin'];
          store.dispatch('GenerateRoutes', { roles } ).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to }); // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next();//
        } else {
          next({ path: '/401', query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// 生产环境错误日志
// if (process.env === 'production') {
//   Vue.config.errorHandler = function(err, vm) {
//     errLog.pushLog({
//       err,
//       url: window.location.href,
//       vm
//     })
//   };
// }

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})