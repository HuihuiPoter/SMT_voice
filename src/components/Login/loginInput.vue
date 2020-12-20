<template>
  <div id="div_form">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
 <el-form-item prop="username">
  <el-input v-model="ruleForm.username" placeholder="账号" clearable>
  <i slot="prepend" class="el-icon-s-custom"/>
  </el-input>
 </el-form-item>
 <el-form-item prop="password">
  <el-input type="password" placeholder="密码" v-model="ruleForm.password" clearable>
  <i slot="prepend" class="el-icon-lock"/>
  </el-input>
 </el-form-item>
 <el-form-item prop="code">
  <el-row :span="24">
  <el-col :span="12">
  <el-input v-model="ruleForm.code" auto-complete="off" placeholder="请输入验证码" size=""
   @keyup.enter.native="submitForm('ruleForm')" clearable></el-input>
  </el-col>
  <el-col :span="12">
  <div class="login-code" @click="refreshCode">
  <!--验证码组件-->
  <s-identify :identifyCode="identifyCode"></s-identify>
  </div>
  </el-col>
  </el-row>
 </el-form-item>
 <el-form-item>
  <div class="login-btn">
  <el-button type="primary" @click="submitForm()">登录</el-button>
  </div>
 </el-form-item>
 <p style="font-size:12px;line-height:30px;color:black;">Tips : 请输入账号密码登陆  admin  123456</p>
 </el-form>
  </div>
</template>

<script>
import SIdentify from './SIdentify'

export default {
  name: "loginInput",
  components: {
      SIdentify
  },
  data(){
      return {
          ruleForm: {
              username: 'admin',
              password: '123456',
              code: ''
          },
          rules: {
              username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                  },
                  {
                    min: 3,
                    max: 10,
                    message: '长度在3到10个字符',
                    trigger: 'blur'
                  }
              ],
              password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                  }
              ],
              code: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                  }
              ]
          },
          identifyCode: '1234',
          identifyCodes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
  },
  methods: {
      submitForm(){
          if (this.ruleForm.username == 'admin' && this.ruleForm.password == '123456'){
              this.$store.commit('loginMain')
              this.$router.replace('/rule')
          }
            
          else alert("账号密码输入错误")       
      },
      randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode () {
          this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
      },
      makeCode (codes, len){
          for (let i = 0;i < len;i++){
              this.identifyCode += codes[this.randomNum(0, codes.length)]
          }
      }
      
  }
}
</script>

<style scoped>
    #div_form {
        position: absolute;
        left: 33%;
        top: 25%;
        width: 30%;
        height: 30%;
        padding: 5% 3% 5% 3%;
        border-style: outset;
        border-width: 2px;
        border-radius: 6%;
    }
</style>