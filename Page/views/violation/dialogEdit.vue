<template>
<div>
    <!-- <el-button type="text" @click="dialogCheckEdit = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="违规记录"
      :visible.sync="dialogCheckEdit"
      width="50%"
      class="edit-dialog"
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
                <el-input style="width:auto" v-if="form.violationType==1" v-model="form.violationName" value="111"></el-input>
                <el-select v-if="form.violationType==2" label="" placeholder="请选择工作单位" v-model="form.violationName">
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
            <el-form-item label="隔离区通行证号" v-if="form.violationType==1">
                <el-input v-model="form.passNumber"></el-input>
            </el-form-item>
            <el-form-item label="内场驾驶证号" v-if="form.violationType==1">
                <el-input v-model="form.driverLicenseNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型" v-if="form.violationCodeName==2">
                <el-input v-model="form.carTypeName"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" v-if="form.violationCodeName==2">
                <el-input v-model="form.carNo"></el-input>
            </el-form-item>
            <el-form-item label="情况说明">
                <el-select v-model="form.violationDescription" placeholder="请选择活动区域" >
                    <el-option :label="decribe.value" v-for="(decribe,index) in form.describeSelect" :key="index" :value="decribe.value"></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="form.violationDescription">
                </el-input>
            </el-form-item>
            <el-form-item label="扣分分值">
                <el-input v-model="form.deductionScore"></el-input>
            </el-form-item>
            
            <!-- <el-form-item label ="照片" style="display:inline">
                <div class="load-picture" v-if="this.form.pictures">
                    <img v-for="(picture,index) in form.pictures" :key="index" :src="`http:173.1.101.1.30:6072/${picture}`"/>  
                </div>
				<el-upload
                list-type="picture-card"
                :http-request="submitImg"
                multiple
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            </el-form-item> -->
        </el-form>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>
</div>

</template>


<script>
    import { ajax } from "ajax";
    import axios from 'axios'; 
    import { each,extend } from "lodash";
    import { mapActions } from 'vuex';
    import { remote } from 'electron';

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
                    pictures: '',
                    files: '',
                },
                // dialogImageUrl: '',
			};
		},
		watch:{
			editCheckData:function(n,o){
				this.getAllData();
			}
		},
		methods: {
             ...mapActions({ 
                getWaitData: "getWaitData",
            }),
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            imgPreview (file, fileList) {
                let fileName = file.name;
                let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
                let _this = this;
                _this.form.files = file.raw;
                // let reader = new FileReader();
                // reader.readAsDataURL(file.raw);
                if (regex.test(fileName.toLowerCase())) {
                    // reader.onload= ()=>{
                    //     _this.form.files = reader.result;
                    //     console.log(_this.form.files);
                    // }
                } else {
                    this.$message.error('请选择图片文件');
                }
            },
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
             getWaitData(value) {
                this.$store.dispatch('violation/getWaitData',value);
            },
            initWaitData(){
                ajax.post("getViolationByState", {pageSize:10, pageNumber:1}).then((data)=>{
                if(data){
                    this.getWaitData(data);
                    }
                })
            },
            submitImg(param){
                const token = remote.getGlobal('token');
                console.log(token);
                let formData = new FormData();
                formData.append('files[]', param.file);
                let config = {
                    'Content-Type': 'multipart/form-data',
                    'token': token,
                };
                const ajaxAPI = remote.getGlobal('ajaxAPI');
                let getImgUrl = `${ajaxAPI.path}${ajaxAPI.url.uploadImg}`;
                 let _this = this;
                axios.post(getImgUrl, formData, config)
                    .then(function(response) {
                        if(response.responseCode==1000){
                            _this.picture == response.data;
                            this.$message({
						        type: "success",
						        message: response.responseMessage
					        });
					} else {
                        this.$message({
						    type: "error",
						    message: response.responseMessage
					    });
					}
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            },
            submitForm(){
                let param = this.form;
                delete param.companySelect;
                delete param.describeSelect;
                delete param.pictures;
                delete param.files;
                delete param.picture;
                delete param.reportTime;
                ajax.post('updateViolation',param,(data)=> {
					if(data.responseCode==1000){
						this.initWaitData();
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
            },
			//提交违规记录编辑
			submitEditForm(){
                let param = ["violationCodeName","violationType","violationName","workOrgName","passNumber","driverLicenseNumber","carTypeName",
                "carNo","violationDescription","deductionScore"];
                var formData = new FormData();
                each(param,(item)=>{
                    let _this = this;
                    formData.append(item,_this.form[item]);
                });
                formData.append('files[]', this.form.files);
                let config = {
                    'Content-Type': 'multipart/form-data'
                }
                axios.post('http://192.168.0.145/violationRecord/updateViolation', formData, config)
                    .then(function(response) {
                        if(response.responseCode==1000){
                        this.getWaitData();
						this.$store.dispatch(`violation/updateDialogCheckEdit`, {
							dialogCheckEdit: false
                        });
                        this.$message({
						    type: "success",
						    message: response.responseMessage
					    });
					} else {
                        this.$message({
						    type: "error",
						    message: response.responseMessage
					    });
						this.$store.dispatch(`violation/updateDialogCheckEdit`, {
							dialogCheckEdit: false
						});
					}
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
				// ajax.post('updateViolation',{files:this.form.files},(data)=> {
				// 	if(data.responseCode==1000){
				// 		this.getWaitData();
				// 		this.$store.dispatch(`violation/updateDialogCheckEdit`, {
				// 			dialogCheckEdit: false
                //         });
                //         this.$message({
				// 		    type: "success",
				// 		    message: data.responseMessage
				// 	    });
				// 	} else {
                //         this.$message({
				// 		    type: "error",
				// 		    message: data.responseMessage
				// 	    });
				// 		this.$store.dispatch(`violation/updateDialogCheckEdit`, {
				// 			dialogCheckEdit: false
				// 		});
				// 	}
				// })
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
