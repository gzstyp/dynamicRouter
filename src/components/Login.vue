<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">动态路由</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {requestLogin} from '@/api/api';
  import NProgress from 'nprogress'
  import MenuUtils from '@/utils/MenuUtils'; //此js主要用于处理成component组件,即把字符串转为component组件
  var routers = [];
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: 'admin'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      login(data){
        window.sessionStorage.setItem('user',JSON.stringify(data));//这里是存入本地菜单信息
        console.info(routers);//空值
        MenuUtils(routers,data);//组装路由导航菜单,处理成component组件,即把字符串转为component组件
        console.info(routers);
        this.$router.addRoutes(routers);//添加到动态路由
        this.$router.push({ path: '/main' });//跳转页面
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(result => {
              this.logining = false;
              NProgress.done();
              let { code, data } = result;//执行登录后会返回json数据格式;第一个参数类似于状态码,code,第二个是数据或错误信息!!!详情移入到模拟登录方法
              if (code !== 200) {
                this.$notify({
                  title: '错误',
                  message: data,
                  type: 'error'
                });
              } else {
                this.login(data);//传入菜单数据
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background-color: #F9FAFC;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 15px 35px 15px 35px;
    /*垂直居中*/
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .title {
      margin: 0px auto 15px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin-bottom:20px;
    }
  }
</style>
