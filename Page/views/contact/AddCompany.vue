<template>
<el-dialog title="新增航空公司" :visible.sync="dialogAddCompany">
  <el-form :model="form" status-icon ref="form" label-width="250px" class="demo-ruleForm"> 
            <el-form-item label ="编号">
                <el-input v-model="form.hangarCode" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="上级航空公司">
                <el-select  placeholder="请选择上级航空公司" v-model="form.department">
                    <el-option label="国航" :value="0"></el-option>
                    <el-option label="川航" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="航空公司">
                <el-select  placeholder="请选择航空公司" v-model="form.department">
                    <el-option label="国航" :value="0"></el-option>
                    <el-option label="川航" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                  v-model="form.useState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="100"
                  inactive-value="0">
                </el-switch>
            </el-form-item>
        </el-form>  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddCompany = false">取 消</el-button>
    <el-button type="primary" @click="submitForm()">确 定</el-button>
  </div>
</el-dialog>
</template>


<script>
import { ajax } from "ajax";
import axios from 'axios'; 
import { each,extend,cloneDeep } from "lodash";
// import { mapActions } from 'vuex';
import { remote } from 'electron';
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    name:'dialogAddCompany',
    props:["editHangerData"],
    data(){
        return {
        form: {
			hangarCode: '',
			capacity: '',
			type: '',
            useState: 1,
            department: 0,
        },
        formLabelWidth: '120px'
        }
    },
    watch:{
			editHangerData:function(n,o){
                this.getAllFormData();
            },
            dialogAddCompany:function(n,o){
                this.getAllFormData();
                // this.getSelectData();
                // this.getOrdinancesData();
            }
		},
    methods:{
        getAllFormData(){
            let allData = extend({}, this.form, this.editHangerData);
            this.form = cloneDeep(allData);   
        },
        getSelectCompany(){
            let _this = this;
            ajax.post('').then((data)=> {

            })
        },
        submitForm(){
            let param = this.form;
            console.log(param);
        }
    },
    computed: {
        dialogAddCompany: {
          get() {
            return this.$store.state.contact.dialogAddCompany;
          },
          set() {
            this.$store.dispatch(`contact/updateDialogAddCompany`, {
            dialogAddCompany: false
          });
          }
        },
        }
}
</script>