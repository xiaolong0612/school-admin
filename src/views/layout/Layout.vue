<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div class="sidebar-wrapper">
            <Sidebar class="sidebar-container"/>
        </div>
        <div class="main-container">
            <Navbar/>
            <div style="overflow: auto">
                <App-main/>
            </div>
        </div>
    </div>
</template>

<script>
    import Sticky from '../../components/Sticky';
    import { Navbar, Sidebar, AppMain } from 'views/layout';

    export default {
      name: 'layout',
      data() {
        return{
          screenHeight: window.innerHeight
        }
      },
      components: {
        Navbar,
        Sidebar,
        AppMain,
        Sticky
      },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        }
      },
      methods: {
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container{
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow-x: hidden;
            transition: all .28s ease-out;
            @include scrollBar;
        }
        .sidebar-container {
            transition: all .28s ease-out;
        }
        .main-container {
            height: 100%;
            transition: marginLeft .28s ease-out;
            margin-left: 180px;
            position: relative;
            padding-top: 50px;
            box-sizing: border-box;
            background-color: #fafafa;
        }
    }
</style>
