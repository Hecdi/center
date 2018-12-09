<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="input-block">
        <div class="login-logo"></div>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="80px"
        class="demo-ruleForm"
        size="middle"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.number="ruleForm2.name" prefix-icon="el-icon-service" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" >
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" prefix-icon="el-icon-view" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->
        <span :loginErr = "loginErr"  v-if="loginErr" class="login-error">
            用户名或密码错误
        </span>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ajaxx from 'ajax';

export default {
  data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: '',
        },
        loginErr: false,
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
          let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let ajax = ajaxx();
            let name = this.$refs[formName].model.name;
            let pass = this.$refs[formName].model.pass;
            console.log(name);
            console.log(pass);
            let param = {"name":name,"password":pass};
            console.log(param);
            ajax.post('login',param).then(data => {
            let response = data.responseCode;
            console.log(data);
            let storage=window.localStorage;
            storage.setItem("token","sdadadsd1111111111");
            sessionStorage.setItem("token","session111111");
            if(response == 10000) {
                that.$router.push('/home')
            } else {
                console.log('error submit!!');
                that.loginErr = true;
                console.log(that.loginErr);
            }
			// this.getTaskModelList(result);
		    })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>