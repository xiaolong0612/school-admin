import { loginByAccount, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 登录
    LoginByAccount({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const account = userInfo.account;
        loginByAccount(account, userInfo.password, userInfo.code, userInfo.type).then(response => {
          const data = response.data;
          Cookies.set('Admin-Token', data.teacher);
          commit('SET_TOKEN', data.teacher);
          resolve(data);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // const data = response.data;
          // commit('SET_ROLES', data.role);
          // commit('SET_NAME', data.name);
          // commit('SET_AVATAR', data.avatar);
          // commit('SET_UID', data.uid);
          // commit('SET_INTRODUCTION', data.introduction);
          commit('SET_ROLES', ['7']);
          commit('SET_NAME', 'xiaolong');
          commit('SET_AVATAR', 'xiaolong');
          commit('SET_UID', '7');
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('Admin-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    }
  }
};

export default user;
