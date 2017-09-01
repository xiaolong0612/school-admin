const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  uid: state => state.user.uid,
  name: state => state.user.name,
  age: state => state.user.age,
  email: state => state.user.email,
  birthday: state => state.user.birthday,
  telephone: state => state.user.telephone,
  highestEducation: state => state.user.highestEducation,
  nativePlace: state => state.user.nativePlace,
  introduction: state => state.user.introduction,
  introduction: state => state.user.introduction,
  schoolId: state => state.user.schoolId,
  gradeNo: state => state.user.gradeNo,
  classNo: state => state.user.classNo,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
