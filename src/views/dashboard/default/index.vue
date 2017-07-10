<template>
    <div class="dashboard-editor-container">
        <div class=" clearfix">
            <LongThumb style="float: left"> 你的权限:
                <span class="pan-info-roles" v-for="item in roles">{{item}}</span>
            </LongThumb>
            <div class="info-container">
                <span class="display_name">{{name}}</span>
            </div>
        </div>
        <div>
            <img class='emptyGif' :src="emptyGif" >
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import LongThumb from 'components/LongThumb';
    export default {
      name: 'dashboard-default',
      components: { LongThumb },
      data() {
        return {
          emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
        }
      },
      computed: {
        ...mapGetters([
          'name',
          'avatar',
          'email',
          'uid',
          'introduction',
          'roles'
        ])
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
   display: block;
   width: 45%;
   margin: 0 auto;
}
.dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    margin-top: -50px;
    padding: 100px 60px 0px;
    .pan-info-roles {
        font-size: 12px;
        font-weight: 700;
        color: #333;
        display: block;
    }
    .info-container {
        position: relative;
        margin-left: 190px;
        height: 150px;
        line-height: 200px;
        .display_name {
            font-size: 48px;
            line-height: 100px;
            color: #212121;
            position: absolute;
            top: 25px;
        }
    }
}
</style>
