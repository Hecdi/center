<template>
<div>
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
            <!-- <el-form-item label="违规主体">
                <el-select v-model="form.violationCodeName" placeholder="请选择活动区域">
                  <el-option label="人员" value="1"></el-option>
                  <el-option label="车辆" value="2"></el-option>
                  <el-option label="设备" value="3"></el-option>
                  <el-option label="其他" value="5"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="违规主体">
                <el-select  placeholder="请选择违规主体" v-model="form.violationCodeName">
                  <el-option v-for="(obj,index) in form.violationObjectSelect" :key="index" :label="obj.value" :value="obj.id"></el-option>
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
            <el-form-item label="违规来源">
                <el-select  placeholder="请选择违规来源" v-model="form.violationSourceName">
                  <el-option v-for="(source,index) in form.violationSourceSelect" :key="index" :label="source.value" :value="source.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位/岗位">
                <el-select  placeholder="请选择职位/岗位" v-model="form.positionName">
                  <el-option v-for="(pos,index) in form.positionSelect" :key="index" :label="pos.value" :value="pos.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="违规时间">
                 <el-date-picker
                    v-model="form.reportTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="违规区域">
                <el-select  placeholder="请选择违规区域" v-model="form.violationAreaName">
                  <el-option v-for="(area,index) in form.violationAreaSelect" :key="index" :label="area.value" :value="area.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="机位">
                <el-input v-model="form.seat"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phone"></el-input>
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
            <el-form-item label="车牌号" v-if="form.violationCodeName.indexOf('车') !=-1">
            <!-- <el-form-item label="车牌号"> -->
                <el-input v-model="form.carNo"></el-input>
            </el-form-item>
            <el-form-item label="情况说明">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="form.violationDescription">
                </el-input>
            </el-form-item>
            <el-form-item label="违规条例" class="violation-item" style="width:534px;">
                <el-autocomplete
                  v-model="form.state4"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  style="width:534px;"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="扣分分值">
                <el-input v-model="form.deductionScore"></el-input>
            </el-form-item>
             <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
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
                    state4: '',
                    textCode: '',
                    seat: '',
                },
                value1: '',
                restaurants: [],
               
                timeout:  null
			};
		},
		watch:{
			editCheckData:function(n,o){
                this.getAllData();
            },
            dialogCheckEdit:function(n,o){
                this.getSelectData();
                this.getOrdinancesData();
            }
		},
		methods: {
             ...mapActions({ 
                getWaitData: "getWaitData"
            }),
			getSelectData(){
				let _this = this;
				ajax.post('getViolationCodeInfo').then((data)=>{
					if(data){
						let company = [];
                        let describe = [];
                        let violationArea = [];
                        let position = [];
                        let violationSource = [];
                        let violationObject = [];
						each(data, (element,index) => {
							// if(element.type =="workType") {
							// 	company.push(element);
							// } else if(element.type == "descType") {
							// 	describe.push(element);
                            // }
                            let type = element.type;
                            switch(type){
                                case "workType": 
                                    return company.push(element);
                                case "descType":
                                    return describe.push(element);
                                case "position":
                                    return position.push(element);
                                case "violationArea":
                                    return violationArea.push(element);
                                case "violationSource":
                                    return violationSource.push(element);
                                case "violationObject1": 
                                    return violationObject.push(element);
                                case "violationObject2":
                                    return violationObject.push(element);
                                case "violationObject3": 
                                    return violationObject.push(element);
                                case "violationObject4":
                                    return violationObject.push(element);
                            }
						});
						_this.form.companySelect = company;
                        _this.form.describeSelect = describe;
                        _this.form.positionSelect = position;
                        _this.form.violationAreaSelect = violationArea;
                        _this.form.violationObjectSelect = violationObject;
                        _this.form.violationSourceSelect = violationSource;
					}
				});
			},
			//融合数据
			getAllData(){
				this.form = extend({}, this.form, this.editCheckData);
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
                    }).catch(function(error) {
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
                delete param.violationSourceSelect;
                delete param.violationObjectSelect;
                delete param.violationAreaSelect;
                delete param.positionSelect;
                delete param.state4;
                param.violationCode = param.violationCodeName;
                param.workOrg = param.workOrgName;
                param.position = param.positionName;
                param.violationArea = param.violationAreaName;
                param.violationSource = param.violationSourceName;
                param.violationRules = param.textCode;
                
                console.log(param);
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
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                 var result = [];
                results.forEach((item,index) => {
                        // result.push(item.value = item.context); 
                        item.value = item.context;
                })
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                  cb(results);
                }, 3000 * Math.random());
              },
              createStateFilter(queryString) {
                return (state) => {
                  return (state.context.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
              },
              handleSelect(item) {
                console.log(item);
                this.form.textCode = item.textCode;
              },
            getOrdinancesData(){
                let condition = this.ordinancesCondition;
                let _this = this;
                ajax.post('ordinances',condition,data => {
                    console.log(data);
                    return _this.restaurants = data.data;
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
		},
		beforeMount(){
            this.getSelectData();
            this.getOrdinancesData();
		}
	};
</script>
