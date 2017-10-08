<template>
  <div style="height: 100vh;width:100%;display: table">
    <div class="login-container">
      <el-row type="flex" class="" justify="center" :gutter="20">
        <el-col :span="4" v-for="(item, index) in cardList" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.img" width="100%">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <el-tooltip class="item" effect="dark" placement="top-start" :disabled="item.disabled">
                  <div slot="content">{{item.tooltip}}</div>
                  <span>{{item.label}}</span>
                </el-tooltip>
                <el-button type="text" class="button fr" @click='loginDialog(index)'>选择该身份</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="登陆" :visible.sync="showDialog" size="tiny">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="70px" class="login-form" >
          <el-form-item label="帐号">
              <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
              <el-input name="password" type="password" v-model="loginForm.password"
                        autoComplete="on" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="角色">
            <el-radio-group v-show="cardList[0].type" v-model="loginForm.type" style="vertical-align: top;padding-top: 7px;line-height: 20px;">
              <el-radio label="9">教育局</el-radio>
              <el-radio label="8">进修校领导</el-radio>
              <el-radio label="6">校领导</el-radio>
              <br/>
              <el-radio label="7">教研员</el-radio>
              <el-radio label="5">教务处</el-radio>
            </el-radio-group>
            <el-radio-group v-show="cardList[1].type" v-model="loginForm.type" style="vertical-align: top;padding-top: 7px;line-height: 20px;">
              <el-radio label="3">年段长</el-radio>
              <el-radio label="1">班主任</el-radio>
              <br/>
              <el-radio label="0">学科教师</el-radio>
            </el-radio-group>
            <el-radio-group v-show="cardList[2].type" v-model="loginForm.type" style="vertical-align: top;padding-top: 7px;line-height: 20px;">
              <el-radio label="10">学生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                  登录
              </el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { validataPhone } from 'utils/validate';
    // import { getQueryObject } from 'utils';
    import socialSign from './socialsignin';

    export default {
      components: { socialSign },
      name: 'login',
      data() {
        const validatePass = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'));
          } else {
            callback();
          }
        };
        const validataCode = (rule, value, callback) => {
          if (value.length == 0) {
            callback(new Error('验证码长度错误'));
          } else {
            callback();
          }
        };
        return {
          cardList: [
            {
              name: '',
              img: require('static/img/login-leader.png'),
              label: '教育局、进修学校...',
              tooltip: '教育局、进修校领导、教研员、学校领导、教务处',
              disabled: false,
              type: false
            },{
              name: '',
              img: require('static/img/login-teacher.png'),
              label: '年段长、班主任...',
              tooltip: '年段长、班主任、学科教师',
              disabled: false,
              type: false
            },{
              name: '',
              img: require('static/img/login-student.png'),
              label: '学生、家长',
              tooltip: '',
              disabled: true,
              type: false
            }
          ],
          loginForm: {
            // account: '18805070151',
            // password: '123456',
            // code: '215217',
            // type: 'admin'
            account: '',
            password: '',
            code: '',
            type: ''
          },
          loginRules: {
            password: [
                { required: true, trigger: 'blur', validator: validatePass }
            ],
            type: [
                { required: true, trigger: 'change', message: '请至少选择一个' }
            ],
          },
          codeImg: '',
          loading: false,
          showDialog: false,
          disabled: false,
          pathList: {
            admin: '/',
            0: '/teacher/index',
            1: '/headmaster/index',
            2: '',
            3: '/director/index',
            4: '',
            5: '/principal/index',
            6: '/principal/index',
            7: '/instructor/index',
            8: '/training-college/index',
            9: '/bureau/index',
            10: '/student/index'
          }
        }
      },
      computed: {
        ...mapGetters([
          'auth_type'
        ])
      },
      mounted() {
        this.setCodeImg();
      },
      methods: {
        setCodeImg() {
          this.codeImg = this.gpath.code +'?'+ +new Date;
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              this.$store.dispatch('LoginByAccount', this.loginForm).then((res) => {
                this.loading = false;
                if( typeof res.userinfo.typeStr == 'undefined' ) this.$router.push({ path: this.pathList[10]});
                this.$router.push({ path: this.pathList[res.userinfo.typeStr]});
              }).catch(err => {
                this.loading = false;
                this.$message.error(err);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        loginDialog(index) {
          this.resetType();
          if(index == 2) {
            this.loginForm.type='10'
          }
          this.cardList[index].type=true;
          this.showDialog = true;
        },
        resetType() {
          for(let i = 0; i < this.cardList.length; i++) {
            this.cardList[i].type=false
          }
        }
      }  
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    body{
      overflow-x: hidden;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .bottom{
      line-height: 32px;
      >span{
        font-size: 13px;
        color: #999;
      }
    }
    .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 5px;
    }
    .login-container {
        @include relative;
        width: 100%;
        display: table-cell;
        vertical-align: middle;
        background-color: #2d3a4b;
        background: url('/static/img/Sky.gif') center no-repeat;
        background-size: cover;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
    }
    .login-form {
        padding: 20px 20px 0 20px;
        margin: 0 auto;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: #454545;
    }
</style>
