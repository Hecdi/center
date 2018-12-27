<template>
  <div class="login" >
    <div class="login-bg"></div>
    <div class="input-block">
      <div class="login-logo"></div>
      <el-form
        :model="login"
        status-icon
        :rules="checkLogin"
        ref="login"
        label-width="80px"
        class="demo-ruleForm"
        size="middle"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.number="login.name" prefix-icon="el-icon-service" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="login.pass"
            autocomplete="off"
            prefix-icon="el-icon-view"
            placeholder="请输入密码"
			@keyup.enter.native="submitForm('login')"
          ></el-input>
        </el-form-item>
		<span :loginErr="loginErr" v-if="loginErr" class="login-error">{{loginErrInfo}}</span>
        <el-form-item>
          <el-button type="primary" @click="submitForm('login')">提交</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
	import { ajax } from "ajax";
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					callback();
					// else {
					//   if (this.login.checkPass !== '') {
					//     this.$refs.login.validateField('checkPass');
					//   }
					//   callback();
				}
			};
			var validateName = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入账号"));
				} else {
					callback();
				}
			};

			return {
				login: {
					pass: "",
					checkPass: "",
					name: ""
				},
				loginErr: false,
				checkLogin: {
					pass: [{ validator: validatePass, trigger: "blur" }],
					name: [{ validator: validateName, trigger: "blur" }]
				},
				loginErrInfo:'',
			};
		},
		methods: {
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						let name = this.$refs[formName].model.name;
						let pass = this.$refs[formName].model.pass;
						let param = { username: name, password: pass };
						console.log(param);
						ajax.post("login", param, data => {
							let response = data.responseCode;
							console.log(data);
							let storage = window.localStorage;
							if (response == 1000 && data.data) {
								let userInfo = data.data;
								storage.setItem("token", userInfo.token);
								storage.setItem("userId", userInfo.userId);
								storage.setItem("username", userInfo.username);
								storage.setItem("depId", userInfo.depId);
								storage.setItem("deptCode", userInfo.deptCode);
								storage.setItem("userInfo", JSON.stringify(userInfo));
								that.$router.push("/home");
							} else {
								console.log(data.responseMessage);
								that.loginErr = true;
								that.loginErrInfo = data.responseMessage;
							}
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		},
	};
</script>
