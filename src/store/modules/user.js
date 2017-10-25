import { loginByAccount, logout, getInfo } from 'api/login';
import { setLatestTest, setLatestTestName } from 'utils/auth';
import { getExaminationPaperList} from 'api/test/paper';
import Cookies from 'js-cookie';

const user = {
  state: {
    // 登陆状态
    token: Cookies.get('xxkd-Token'),
    uid: Cookies.get('xxkd-uid'),
    api_get_type: Cookies.get('xxkd-type'),
    // 用户基本信息
    name: '',
    age: '',
    email: '',
    birthday: '',
    telephone: '',
    highestEducation: '',
    nativePlace: '',
    introduction: '',
    // 权限and接口使用
    roles: typeof Cookies.get('xxkd-roles') != 'undefined' ? Cookies.get('xxkd-roles').split(',') : [],
    schoolId: '',
    gradeNo: '',
    classNo: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_APIGETTYPE: (state, type) => {
      state.api_get_type = type;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AGE: (state, age) => {
      state.age = age;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_BIRTHDAY: (state, birthday) => {
      state.birthday = birthday;
    },
    SET_TELEPHONE: (state, telephone) => {
      state.telephone = telephone;
    },
    SET_HIGHESTEDUCATION: (state, highestEducation) => {
      state.highestEducation = highestEducation;
    },
    SET_NATIVEPLACE: (state, nativePlace) => {
      state.nativePlace = nativePlace;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_SCHOOLID: (state, schoolId) => {
      state.schoolId = schoolId;
    },
    SET_GRADENO: (state, gradeNo) => {
      state.gradeNo = gradeNo;
    },
    SET_SUBJECT: (state, subject) => {
      state.subject = subject;
    },
    SET_CLASSNO: (state, classNo) => {
      state.classNo = classNo;
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
        loginByAccount(userInfo.account, userInfo.password, userInfo.code, userInfo.type).then(response => {
 
          const data = response.data;

          let setType = 0;  // 默认老师
          if(userInfo.type == 10) setType = 1; // 学生
          Cookies.set('xxkd-Token', data);
          Cookies.set('xxkd-uid', data.userinfo.id);
          Cookies.set('xxkd-type', setType);
          Cookies.set('xxkd-roles', userInfo.type);

          commit('SET_ROLES', Cookies.get('xxkd-roles').split(','));
          commit('SET_APIGETTYPE', setType); // Get user information usage
          commit('SET_TOKEN', data);
          commit('SET_UID', data.userinfo.id);
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
        let query = {
          id: state.uid,
          type: state.api_get_type 
        };
        getInfo(query).then(response => {
          const user = response.data.userinfo;
          // let roles = user.type.split(',');

          // roles = 'admin';

          // commit('SET_ROLES', roles);

          commit('SET_NAME', user.name);
          commit('SET_AGE', user.age);
          commit('SET_EMAIL', user.email);
          commit('SET_BIRTHDAY', user.birthday);
          commit('SET_TELEPHONE', user.telephone);
          commit('SET_HIGHESTEDUCATION', user.highestEducation);
          commit('SET_NATIVEPLACE', user.nativePlace);

          commit('SET_SCHOOLID', user.schoolId);
          commit('SET_GRADENO', user.gradeNo);
          commit('SET_CLASSNO', user.classNo);
          if(typeof user.subject != 'undefined'){
            commit('SET_SUBJECT', user.subject);

            
          }
          let query = {
              pageNo: 1,
              pageSize: 30,
              subject: user.subject = user.subject == 'undefined' ? '语文' : user.subject,
              name: '',
              period: '',
              grade: '七年级'
            };

          getExaminationPaperList(query).then(res => {
            if(res.data.list.length == 0){
              setLatestTest('');
            }
            else{
              setLatestTest(JSON.stringify(res.data.list[0]));
            }
          })

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
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      let query = {
        id: state.uid,
        type: state.api_get_type 
      };
      return new Promise((resolve, reject) => {
        logout(query).then((res) => {
          commit('SET_UID', '');
          commit('SET_APIGETTYPE');
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);

          Cookies.remove('xxkd-roles');
          Cookies.remove('xxkd-Token');
          Cookies.remove('xxkd-uid');
          Cookies.remove('xxkd-type');
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
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
