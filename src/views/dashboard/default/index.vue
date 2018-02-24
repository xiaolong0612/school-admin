<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="12">
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
              <h3>您的权限是{{role[roles[0]]}}</h3>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10" :offset="2">
        <div class="text-center welcome">
          <div class="middle masked">
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
          emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
          role:{
            0: '学科教师',
            1: '班主任',
            2: '',
            3: '年段长',
            4: '',
            5: '教务处',
            6: '校领导',
            7: '教研员',
            8: '进修学校领导',
            9: '教育局',
            10: '学生',

          }
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
  }
  h3{
    font-weight: 400;
    font-size: 40px;
    text-align: center;
    // background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#007b80), to(#408cff));
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    color:#ddd;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  }
  @media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) { 
      .masked{
          background-image: -webkit-linear-gradient(left, #147B96, #a23974 25%, #147B96 50%, #a23974 75%, #147B96);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-background-size: 200% 100%;
          -webkit-animation: masked-animation 4s infinite linear;
      }
  }
  @-webkit-keyframes masked-animation {
      0%  { background-position: 0 0;}
      100% { background-position: -100% 0;}
  }
}
</style>
