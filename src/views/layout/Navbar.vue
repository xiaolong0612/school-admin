<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="avatar-container fr">
            <screenfull></screenfull>
            <div class="avatar-wrapper">
                <img class="user-avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                <el-button type="text" @click="logout">退出</el-button>
            </div>
        </div>
        <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
        <!-- <levelbar></levelbar> -->
        <tabs-view></tabs-view>
        <div class='fl'>
            <img src="../../assets/logo.jpg" style="margin-top: 5px;" height="40">
        </div>
        
        <!-- <ErrLog v-if="log.length>0" class="errLog-container" :logsList="log"></ErrLog> -->
        
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Levelbar from './Levelbar';
    import TabsView from './TabsView';
    import Hamburger from 'components/Hamburger';
    import Screenfull from 'components/Screenfull';
    import ErrorLog from 'components/ErrLog';
    /*import errLogStore from 'store/errLog';*/

    export default {
      components: {
        Levelbar,
        TabsView,
        Hamburger,
        /*ErrorLog,*/
        Screenfull
      },
      data() {
        return {
          /*log: errLogStore.state.errLog*/
        }
      },
      computed: {
        ...mapGetters([
          'sidebar',
          'name',
          'avatar'
        ])
      },
      methods: {
        toggleSideBar() {
          this.$store.dispatch('ToggleSideBar')
        },
        logout() {
          this.$store.dispatch('LogOut').then(() => {
            console.log('退出');
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
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
        width: 100%;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
            margin-right: 10px;
            border-right: 1px solid #fff;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull{
            vertical-align: middle;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            padding-right: 20px;
            .avatar-wrapper {
                cursor: pointer;
                line-height: 46px;
                display: inline-block;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    vertical-align: middle;
                }
                .el-icon-caret-bottom {
                    font-size: 12px;
                }
            }
        }
    }
</style>



