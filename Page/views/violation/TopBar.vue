<template>
    <div>
        <el-row>
            <el-col :span="5">
                <el-button @click="toggleTabs('wait')">待审核</el-button>
                <el-button @click="toggleTabs('all')">全部</el-button>
            </el-col>
            <el-col :span="15" class="topbar">
                <el-form ref="form" label-width="80px">
                    <el-form-item >
                        <el-select v-model="area" placeholder="活动区域" v-on:change="changeSelectStatus">
                          <el-option label="全部" value="1"></el-option>
                          <el-option label="人员" value="2"></el-option>
                          <el-option label="车辆" value="3"></el-option>
                          <el-option label="设备" value="4"></el-option>
                          <el-option label="公司" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                    v-on:click="searchAll(e)"
                ></el-input>
                <span class="demonstration">时间段</span>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-button @click="dialogVisible = true" disabled>单位管理</el-button>
                <el-button @click="exportExcel">导出</el-button>
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
            <div v-if="tabs!=='all'">
                <Card :is="currentView" keep-alive :statusValue="currentView"/>
            </div>
            <div v-else>
                <all-table/>
                <page-nation-his/>
            </div>
        </el-row>
    </div>
</template>


<script>
    import Card from "./Card.vue";
    import AllTable from "./AllTable.vue";
    import PageNationHis from "./PageNationHis.vue";
    import { mapMutations } from 'vuex';
    import ajaxx from 'ajax';

    export default {
        components: {
          // Wait,
          // All,
          Card,
          AllTable,
          PageNationHis,
      },
        data() {
          return {
            labelPosition: 'right',
            formLabelAlign: {
              name: '',
              region: '',
              type: ''
            },
            // formInline: {
            //   user: '',
            //   region: ''
            // },
            area: '',
            inputSearch:'',
            time: '',
            dialogVisible: false,
            form: {
                name: 'placeholder',
            },
            // status: "全部",
            currentView: 'Card',
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
             tabs:"all",
          }
        },
        methods: {
            // ...mapMutations(["setCurrentStatus"]),
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
            // toggleTabs(tabKey){
            //     this.status = tabKey;
            //     this.currentView = tabKey;
            // }
            toggleTabs(value){
                this.tabs=value;
            },
            setCurrentStatus(data) {
			    this.$store.dispatch('violation/setCurrentStatus', data);
		    },
            changeSelectStatus($event){
                this.setCurrentStatus(Number($event));
            },
            searchAll($event){
                console.log($event.target.value);
            },
            exportExcel(){
                let ajax = ajaxx();
                let violationCode = this.area;
                let timeArr = this.time;
                // let timeArr = time.join(",");
                // console.log(time);
                // let timeArr = ['a','b'];
                let startDate = timeArr[0];
                let endDate = timeArr[1];
                

                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"violationCode":violationCode,"startDate":startDate,"endDate":endDate,"violationValue":inputSearch};
                console.log(param);
                console.log(params)
                ajax.post('findByTimeAndCode', params).then((data) => {
                    console.log(data);
                   
                });

            }

            // ...mapMutations(["setCurrentPage","setPageSize"]),
        }
    } 
</script>
