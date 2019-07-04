<template>
    <div>
        <el-menu class="navbar pr20" mode="horizontal">
            <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
            <img class="fl" src="../../assets/logo-smile.png" height="50">
            <!-- <levelbar></levelbar> -->
            <tabs-view></tabs-view>
            <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
            <el-dropdown class="avatar-container fr" trigger="click">
                <div class="avatar-wrapper">
                    <!-- <img class="user-avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"> -->
                    欢迎，{{name}}
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <!-- <router-link class='inlineBlock' to="/">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link> -->
                    <div v-if="roles.indexOf('5') != -1 || roles.indexOf('6') != -1">
                        <router-link to="/student/list">
                            <el-dropdown-item>
                                学生列表
                            </el-dropdown-item>
                        </router-link>
                        <router-link to="/teacher/list">
                            <el-dropdown-item>
                                老师列表
                            </el-dropdown-item>
                        </router-link>
                        <router-link to="/class/list">
                            <el-dropdown-item>
                                班级列表
                            </el-dropdown-item>
                        </router-link>
                    </div>
                    <div v-if="roles.indexOf('5') != -1 || roles.indexOf('6') != -1 || roles.indexOf('7') != -1">
                        <router-link to="/task/list">
                            <el-dropdown-item>
                                成绩列表
                            </el-dropdown-item>
                        </router-link>
                       <!--  <router-link to="/paper/list">
                            <el-dropdown-item>
                                试卷列表
                            </el-dropdown-item>
                        </router-link> -->
                       <!--  <router-link to="/examination/list">
                            <el-dropdown-item>
                                试题列表
                            </el-dropdown-item>
                        </router-link> -->
                    </div>
                    <div v-if="roles.indexOf('9') != -1">
                        <router-link to="/school/list">
                            <el-dropdown-item>
                                学校列表
                            </el-dropdown-item>
                        </router-link>
                    </div>
                    <el-dropdown-item divided><span @click="dialogLogout = true" style="display:block;">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <screenfull class='screenfull fr mr10'></screenfull>
            <el-button type="primary" class="fr oneUpdata" size="small" @click="oneUpdata" v-if="roles.indexOf('10') == -1"><i class="el-icon-upload el-icon--right"></i>一键升级</el-button>
        </el-menu>

        <el-dialog
          title="退出登录"
          :visible.sync="dialogLogout"
          width="30%">
          <p><span class="c-blue">{{name}}</span><font>确定要退出么？</font></p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLogout = false">取 消</el-button>
            <el-button type="primary" @click="logout">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Levelbar from './Levelbar';
  import TabsView from './TabsView';
  import Hamburger from 'components/Hamburger';
  import Screenfull from 'components/Screenfull';
  import ErrorLog from 'components/ErrLog';
  import errLogStore from 'store/errLog';
  import { oneUpdata } from 'api/index.js';
  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      ErrorLog,
      Screenfull
    },
    data() {
      return {
        log: errLogStore.state.errLog,
        dialogLogout: false
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'roles',
        'uid'
      ])
    },
    mounted() {
      console.log(this.roles)
    },
    methods: {
        
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar');
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
            this.dialogLogout = false;
          location.reload();// 为了重新实例化vue-router对象 避免bug
        });
      },
      oneUpdata() {
        this.$confirm('此功能是升级去年的年级和届，请确认是否执行？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          oneUpdata({id: this.uid}).then((rs) => {
            this.$message({
              type: 'success',
              message: '升级成功!'
            });
          })
          
        }).catch(() => {});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,.12);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .screenfull {
        height: 50px;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        &:focus{
            outline: none;
        }
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
            &:focus{
                outline: none;
            }
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                font-size: 12px;
            }
        }
    }
    .oneUpdata{
      position: relative;top: 8px;
      margin-right: 10px;
    }
  }
</style>