<template>
<div>
    <!-- <el-button type="text" @click="dialogCheckEdit = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="违规记录"
      :visible.sync="dialogCheckEdit"
      width="50%"
      >
         <el-form :model="form" status-icon ref="form" label-width="250px" class="demo-ruleForm"> 
            <el-form-item label ="编号">
				{{form.violationNoticeNum}}
            </el-form-item>
            <el-form-item label="违规主体">
                <el-select v-model="form.violationCodeName" placeholder="请选择活动区域">
                  <el-option label="人员" value="1"></el-option>
                  <el-option label="车辆" value="2"></el-option>
                  <el-option label="设备" value="3"></el-option>
                  <el-option label="其他" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="责任人/责任单位">
                <el-select v-model="form.violationType" placeholder="">
                  <el-option label="责任人" :value="1"></el-option>
                  <el-option label="责任单位" :value="2"></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item :inline="true" v-if="form.violationType==1">
                <el-input v-model="form.people" value="111"></el-input>
            </el-form-item>
            <el-form-item :inline="true" v-else label="">
                <el-select  placeholder="请选择工作单位" v-model="form.workOrgName">
                  <el-option v-for="(company,index) in form.companySelect" :key="index" :label="company.value" :value="company.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="责任单位描述">
                <el-input v-model="form.name" value="111"></el-input>
            </el-form-item> -->
            <el-form-item label="工作单位">
                <el-select  placeholder="请选择活动区域" v-model="form.workOrgName">
                  <el-option v-for="(company,index) in form.companySelect" :key="index" :label="company.value" :value="company.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="隔离区通行证号">
                <el-input v-model="form.passNumber"></el-input>
            </el-form-item>
            <el-form-item label="内场驾驶证号">
                <el-input v-model="form.driverLicenseNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型">
                <el-input v-model="form.carTypeName"></el-input>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model="form.carNo"></el-input>
            </el-form-item>
            <el-form-item label="情况说明">
                <el-select v-model="form.violationDescription" placeholder="请选择活动区域" >
                    <el-option :label="decribe.value" v-for="(decribe,index) in form.describeSelect" :key="index" :value="decribe.value"></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.textarea">
                </el-input>
            </el-form-item>
            <el-form-item label="扣分分值">
                <el-input v-model="form.deductionScore"></el-input>
            </el-form-item>
        </el-form>  
        <!-- <h1>方便展示</h1> -->
        <!-- <el-button>提交</el-button>
        <el-button>取消</el-button> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">提交</el-button>
      </span>
    </el-dialog>
</div>

</template>


<script>
	import { ajax } from "ajax";
	import { each,extend } from "lodash";

	export default {
		name: "dialogCheckEdit",
		props:["editCheckData"],

		data() {
			return {
				form: {
					violationCodeName: '',
					violationType: '',
					passNumber: '',
					deductionScore: 1,
					driverLicenseNumber: 22,
					companySelect: [],
					describeSelect: [],
					textarea: '',
				},

			};
		},
		watch:{
			editCheckData:function(n,o){
				this.getAllData();
			}
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//获取下拉框的数据
			getSelectData(){
				let _this = this;
				ajax.post('getViolationCodeInfo').then((data)=>{
					if(data){
						console.log(data);
						let company = [];
						let describe = [];
						each(data, (element,index) => {
							if(element.type =="workType") {
								company.push(element);
							} else if(element.type == "descType") {
								describe.push(element);
							}
						});
						_this.form.companySelect = company;
						_this.form.describeSelect = describe;
					}
				});
			},
			//融合数据
			getAllData(){
				this.form = extend({}, this.form, this.editCheckData);
				console.log(this.form);
			},
			//提交违规记录编辑
			submitEditForm(){
                let param = this.form;
                param.violationDescription = `${param.violationDescription}。${param.textarea}`;
                console.log(param);
                delete param.textarea;
                delete param.companySelect;
                delete param.describeSelect;

                console.log(param);
				let param11 = {
					//   violationCode	,
					//   deductionScore,
					//   violationName	,
					//   violationDescription,
					//   carType,
					//   driverLicenseNumber,
					//   violationType,
					//   workOrg,
					//   carNo,
					//   passNumber,
				};
				ajax.post('updateViolation',param,(data)=> {
					if(data.responseCode==1000){
						this.getWaitData();
						this.$store.dispatch(`violation/updateDialogCheckEdit`, {
							dialogCheckEdit: false
                        });
                        this.$message({
						    type: "success",
						    message: data.responseMessage
					    });
					} else {
                        this.$message({
						    type: "error",
						    message: data.responseMessage
					    });
						this.$store.dispatch(`violation/updateDialogCheckEdit`, {
							dialogCheckEdit: false
						});
					}
				})
			}

		},
		computed: {
			dialogCheckEdit: {
				get() {
					return this.$store.state.violation.dialogCheckEdit;
				},
				set() {
					this.$store.dispatch(`violation/updateDialogCheckEdit`, {
						dialogCheckEdit: false
					});
				}
			},
			// form :{
			//     set(){
			//         return  Object.assign({}, this.editCheckData)
			//     }
			// },
		},
		beforeMount(){
			this.getSelectData();
		}
	};
</script>
