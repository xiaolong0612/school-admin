import { asyncRouterMap, constantRouterMap } from 'src/router';

function hasPermission(roles, route) {
  // if (roles.indexOf('admin') >= 0) return true;
  Array.intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        var str = arguments[i][j];
        if (!obj[str]) {
          obj[str] = 1;
        }
        else {
          obj[str]++;
          if (obj[str] == arguments.length)
          {
            result.push(str);
          }
        }
      }
    }
    if(result == null || result == '') return false;
    return true;
  }
  if (route.meta && route.meta.role) {
    return Array.intersect(['7'],route.meta.role)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },

  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          // if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};


export default permission;
