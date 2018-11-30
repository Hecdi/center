<template>
    <div>
        <el-row>
            <el-col :span="5">
                <el-button @click="toggleTabs('wait')">待审核</el-button>
                <el-button @click="toggleTabs('all')">全部</el-button>
            </el-col>
            <el-col :span="15" class="topbar">
                <el-form ref="form" label-width="80px">
                    <el-form-item :model="formInline" >
                        <el-select v-model="formInline.region" placeholder="活动区域">
                          <el-option label="全部" value="all"></el-option>
                          <el-option label="人员" value="people"></el-option>
                          <el-option label="车辆" value="car"></el-option>
                          <el-option label="设备" value="equipment"></el-option>
                          <el-option label="公司" value="company"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                ></el-input>
                <span class="demonstration">时间段</span>
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-button @click="dialogVisible = true">单位管理</el-button>
                <el-button>导出</el-button>
            </el-col>
            <div class="dialog">
            <el-dialog
                title="单位管理"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                >
                <!-- <span>这是一段信息</span> -->
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <div class="company-list">
                    <div class="name"  v-for="item in companys" v-bind:key="item.name">
                       <span v-if="!item.isEdit" v-on:click="handEdit(item)"> {{item.name}} </span>
                       <div v-else class="company-info">
                           <p>
                               {{item.name}} 
                               <span>
                                    <i class="el-icon-edit"></i>
                                    <i class="el-icon-close" v-on:click="closeEdit(item)"></i>
                               </span>
                           </p>
                           <p>{{item.code}}</p>
                           <p> {{item.number}}</p>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">提交</el-button>
                </span>
            </el-dialog>
            </div>
            <div>
                <wait :is="currentView" keep-alive :statusValue="currentView"/>
            </div>
        </el-row>
    </div>
</template>


<script>
    import wait from "./Card.vue";
    import all from "./Card.vue";
      export default {
          components: {
            wait,
            all,
        },
        data() {
          return {
            labelPosition: 'right',
            formLabelAlign: {
              name: '',
              region: '',
              type: ''
            },
            formInline: {
              user: '',
              region: ''
            },
            inputSearch:'',
            time: '',
            dialogVisible: false,
            form: {
                name: 'placeholder',
            },
            // status: "全部",
            currentView: 'all',
            companys: [
                {name:"四川航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"国际航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"东方航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"南方航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"祥鹏航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"海南航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"时际航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"深圳航空",code:"HK323",number:"028-88888888",isEdit:false},
                {name:"西南航空",code:"HK323",number:"028-88882328",isEdit:false},
                {name:"哈哈航空",code:"HK323",number:"028-12355678",isEdit:false},
            ],
            // isEdit: false,
          }
        },
        methods: {
            onSubmit() {
              console.log('submit!');
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                      done();
                    })
                    .catch(_ => {});
            },
            handEdit(target){
                target.isEdit = !target.isEdit;
            },
            closeEdit(item){
                item.isEdit = false;
            },
            toggleTabs(tabKey){
                this.status = tabKey;
                this.currentView = tabKey;
            }
        }
    } 
</script>
