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
   @keyup.enter.native="submitForm(1)" clearable></el-input>
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
  <el-button type="primary" @click="submitForm(1)">登录</el-button>
  <el-button type="primary" @click="registerForm()">注册</el-button>
  <el-button type="primary" @click="submitForm(2)">登录level2</el-button>
  <el-button type="primary" @click="submitForm(3)">登录level3</el-button>
    <!-- <el-button type="primary" @click="test()">测试</el-button> -->
  </div>
 </el-form-item>
 <p style="font-size:12px;line-height:30px;color:black;">Tips : 请输入账号密码登陆  admin  123456，可以重新注册新的账号</p>
 </el-form>
 <el-dialog
  title="注册账号"
  :visible.sync="reg_visible"
  width="50%"
  >
  <Register v-if="reg_visible" @closeReg="closeReg" @success="success"></Register>
</el-dialog>
 <!-- <div v-if="reg_visible" title="注册账号" class="done">
    <Register v-if="reg_visible" @closeReg="closeReg" @success="success"></Register>
</div> -->
  </div>
</template>

<script>
import SIdentify from './SIdentify'
import axios from 'axios'
import Register from './Register'
// import UpShow from '../UpShow'
axios.defaults.withCredentials = true
export default {
  name: "loginInput",
  components: {
      SIdentify,
      Register,
    //   UpShow
  },
  mounted: function () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
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
          identifyCodes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          reg_visible: false
      }
  },
  methods: {
      submitForm(level){
        //   console.log(level)
          if (this.identifyCode != this.ruleForm.code){
              alert('验证码错误')
              return
          }
            
          let formData = new FormData()
          //let url = 'http://192.168.137.1:8000/api/login'
          let url = 'https://www.smartreelearners.com:9000/api/login'
          formData.append('username', this.ruleForm.username)
          formData.append('password', this.ruleForm.password)
          axios.post(url, formData).then((res) => {
                //console.log(res)
                if (res.data.code === 200){
                    this.$store.commit('loginMain', {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    })
                    this.$store.commit('Level', {
                        level: level
                    })
                    // this.$router.replace('/main/evaluate')
                    this.$router.replace('course')
                    // this.$router.replace('main/result')
                }  
                else alert("账号密码输入错误")
          })
      },
      registerForm() {
          this.reg_visible = true
      },
      test(level){
          if (this.identifyCode != this.ruleForm.code){
              alert('验证码错误')
              return
          }
          let formData = new FormData()
          //let url = 'http://192.168.137.1:8000/api/login'
          let url = 'https://www.smartreelearners.com:9000/api/login'
          formData.append('username', this.ruleForm.username)
          formData.append('password', this.ruleForm.password)
          axios.post(url, formData).then((res) => {
                //console.log(res)
                if (res.data.code === 200){
                    this.$store.commit('loginMain', {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    })
                    this.$store.commit('Level', {
                        level: level
                    })
                    // this.$router.replace('course')
                    this.$router.replace('main/sentest')
                    // this.$router.replace('main/result')
                }  
                else alert("账号密码输入错误")
          })
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
      },
      closeReg() {
          this.reg_visible = false
      },
      success(val) {
          this.ruleForm.username = val.username
          this.ruleForm.password = val.password
      }
  }
}
</script>

<style scoped>
    #div_form {
        position: absolute;
        background-color: white;
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