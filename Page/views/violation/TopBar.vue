<template>
    <div>
        <el-row class="tooltip">
            <el-col :span="5">
                <button class="tab-btn wait" v-bind:class="{ 'active-tab': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核</button>
                <button class="tab-btn all"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">全部</button>
            </el-col>
            <el-col :span="19" class="topbar">
                <el-form ref="form" label-width="80px" style="display:none">
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
                <el-button @click="openShowImg" size="mini" >单位管理</el-button>
                <el-button @click="exportExcel" size="mini" type="primary">导出</el-button>
            </el-col>
            <!-- <el-col :span="0">
                <el-button @click="openShowImg" size="mini" >单位管理</el-button>
                <el-button @clißk="exportExcel" size="mini" type="primary">导出</el-button>
            </el-col> -->
        </el-row>
        <div class="dialog">
            <ShowImg/>
        </div>
        <div v-if="tabs!=='all'">
            <Card/>
        </div>
        <div v-else>
            <all-table/>
            <page-nation-his/>
        </div>
    </div>
</template>


<script>
    import Card from "./Card.vue";
    import AllTable from "./AllTable.vue";
    import PageNationHis from "./PageNationHis.vue";
    import ShowImg from "./ShowImg.vue";
    import { mapMutations, mapActions } from 'vuex';
    import ajaxx from 'ajax';
    import moment from 'moment';


    export default {
        components: {
          Card,
          AllTable,
          PageNationHis,
          ShowImg,
      },
        data() {
          return {
            area: '',
            inputSearch:'',
            time: '',
            form: {
                name: 'placeholder',
            },
            tabActive: 'all',
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
             tabs:"all",
          }
        },
        methods: {
            // ...mapMutations(["setCurrentStatus"]),
             ...mapActions({
      getData: "getData"
    }),
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
            toggleTabs(value){
                this.tabs=value;
                this.tabActive = value;
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
             getData(data) {
                this.$store.dispatch("violation/getData", data);
            },
            exportExcel(){
                let ajax = ajaxx();
                let violationCode = this.area;
                let timeArr = this.time;
                let startDate;
                let endDate;
                if(timeArr){
                    if(timeArr[0] == timeArr[1]){
                        startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
                        endDate = moment(timeArr[1]).format("YYYY-MM-DD");
                        endDate = `${endDate} 23:59:59`;
                    } else {
                        startDate = timeArr[0];
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss")
                        endDate = timeArr[1];
                        endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss")
                    }  
                } else {
                    startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                    endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                    endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
                }
                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"startDate":startDate,"endDate":endDate,"value":inputSearch};
                console.log(param);
                console.log(params)
                ajax.post('getViolationDataForLike', params).then((data) => {
                    console.log(data);
                    this.getData(data);
                });

            },
            refreshData() {
                let ajax = ajaxx();
                ajax.get("getViolationData").then(data => {
                  let violation = data.data;
                  console.log(violation);
                  this.getData(data);
                });
            },
            openShowImg() {
			    this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
		    },
        }
    } 
</script>
