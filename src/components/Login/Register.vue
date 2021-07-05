<template>
  <div id="div_reg">
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
 <el-form-item prop="comfirm">
  <el-input type="password" placeholder="确认密码" v-model="ruleForm.comfirm" clearable>
  <i slot="prepend" class="el-icon-lock"/>
  </el-input>
 </el-form-item>
 <el-form-item>
  <div class="login-btn">
  <el-button type="primary" @click="submitForm()">注册</el-button>
  <el-button type="primary" @click="close()">关闭</el-button>
  </div>
 </el-form-item>
 </el-form>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: "Register",
  components: {
  },
  mounted: function () {
  },
  data(){
      return {
          ruleForm: {
              username: '',
              password: '',
              comfirm: ''
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
              comfirm: [{
                    required: true,
                    message: '请确认密码',
                    trigger: 'blur'
                  }
              ]
          }
      }
  },
  methods: {
      submitForm(){        
          let formData = new FormData()
          let url = 'https://www.smartreelearners.com:9000/api/register'
          formData.append('username', this.ruleForm.username)
          formData.append('password', this.ruleForm.password)
          formData.append('repass', this.ruleForm.comfirm)
          axios.post(url, formData).then((res) => {
                //console.log(res)
                if (res.data.code === 200){
                    this.$emit("success", {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    })
                    this.$emit("closeReg")
                    alert("注册成功")
                }  
                else alert("账号密码输入错误")
          })
      },
      close() {
          this.$emit("closeReg")
      }
  }
}
</script>

<style>
    #div_reg {
        position: relative;
        left: 25%;
        top: 25%;
        width: 50%;
        height: 30%;
        padding: 5% 3% 5% 3%;
        border-style: outset;
        border-width: 0px;
        border-radius: 6%;
    }
</style>