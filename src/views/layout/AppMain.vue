<template>
    <section class="app-main padding-a">
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'AppMain',
      data() {
        return {
          isOpenConfirm: false,
        }
      },
      computed: {
        key() {
          return this.$route.name !== undefined
            ? this.$route.name + +new Date()
            : this.$route + +new Date()
        }
      },
      methods: {
        handler: function() {
          var _this = this;
          if(window.onResizeTag != undefined){
            clearTimeout(window.onResizeTag);
          }
          window.onResizeTag=setTimeout(function(){
            if(!_this.isOpenConfirm){
              _this.openConfirm();
            }
          },600);
        },
        openConfirm: function() {
          // this.isOpenConfirm = true;
          // this.$confirm('检测到您窗口变化, 是否刷新当前页面, 适应窗口大小?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已刷新'
          //   });  
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消刷新操作'
          //   });  
          //   this.isOpenConfirm = false;
          // });
        },
        reload: function() {
        }
      },
      mounted () {
        window.addEventListener('resize', this.handler)
      }
    }
</script>