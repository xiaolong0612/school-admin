<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <div class="welcome">
          <el-row :gutter="20" class="middle">
            <el-form :inline="true" label-width="100px">
              <el-col :span="12">
                <el-form-item label="用户名"><span>{{name}}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄"><span>{{age}}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱"><span>{{email}}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话"><span>{{telephone}}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学历"><span>{{highestEducation}}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="简介"><span>{{introduction}}</span></el-form-item>
              </el-col>

            </el-form>
            <el-col :span="24">
              <h3>您的权限是{{roles}}</h3>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" :offset="3">
        <div class="text-center welcome">
          <div class="middle">
            <h2 class="">欢迎使用<br>学情快递系统</h2>
            <!-- <img class='emptyGif' :src="emptyGif" > -->
          </div>
        </div>
      </el-col>
    </el-row>
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
          'roles',
          'age',
          'email',
          'birthday',
          'telephone',
          'highestEducation',
          'nativePlace',
          'introduction'
        ])
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
   display: block;
   width: 100%;
   margin: 0 auto;
}
.dashboard-editor-container {
    min-height: calc(100vh - 80px);
    margin-top: -10px;
}
.welcome{
  height: calc(100vh - 80px);
  position: relative;
  .middle{
    position: absolute;
    top: 30%;
    transform: translate(0,-50%);
  }
  h2{
    font-size: 100px;
    
    color: #fafafa;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  }
  h3{
    font-weight: 400;
    font-size: 40px;
    text-align: center;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#007b80), to(#408cff));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
