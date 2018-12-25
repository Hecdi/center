<template>
    <div class="violation-topbar">
        <el-row class="tooltip" v-if="tabActive == 'all'">
            <el-col :span="5">
                <button class="tab-btn wait" v-bind:class="{ 'active-tab font-YaheiBold': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitTotalSize}}</button>
                <button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">历史记录</button>
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
                    @change="handleSearch"
                    value-format="timestamp">
                </el-date-picker>
                <el-button @click="handleSearch" size="mini" type="primary">查询</el-button>
                <el-button size="mini">
                    <a  :href="exportExcel()">导出</a>
                </el-button>
            </el-col>
        </el-row>
        <el-row class="tooltip" v-else>
            <el-col :span="5">
                <button class="tab-btn wait" v-bind:class="{ 'active-tab font-YaheiBold': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitTotalSize}}</button>
                <button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">历史记录</button>
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
                    @change="handleSearch"
                    value-format="timestamp">
                </el-date-picker>
                <el-button @click="handleSearchWait" size="mini" type="primary">查询</el-button>
                <!-- <el-button size="mini">
                    <a  :href="exportExcel()">导出</a>
                </el-button> -->
            </el-col>
        </el-row>
        <div class="dialog">
            <ShowImg/>
        </div>
        <div v-if="tabs!=='all'">
            <Card/>
        </div>
        <div v-else>
            <all-table/>
        </div>
    </div>
</template>


<script>
    import Card from "./Card.vue";
    import AllTable from "./AllTable.vue";
    import ShowImg from "./ShowImg.vue";
    import { mapMutations, mapActions, mapState } from 'vuex';
    import { ajax } from 'ajax';
    import moment from 'moment';
    import { remote } from 'electron';


    export default {
        components: {
          Card,
          AllTable,
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
            tabs:"all",
            exportLocation: '',
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
            getUrl:'',
          }
          
        },
        computed: {
            ...mapState('violation',['waitItems','showImgDialog','waitTotalSize']),
        },
        
        methods: {
             ...mapActions({
                    getData: "getData",
                    getWaitData: "getWaitData",
                    getAllCondition: "getAllCondition",
                    getWaitCondition: "getWaitCondition",
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
                if(value == 'wait') {
                    this.initWaitData();
                } else {
                    this.refreshData();
                }
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
            getWaitData(data) {
                this.$store.dispatch("violation/getWaitData", data);
            },
            getAllCondition(data) {
                this.$store.dispatch("violation/getAllCondition",data);
            },
            getWaitCondition(data) {
                this.$store.dispatch("violation/getWaitCondition",data);
            },
            exportExcel(){
                let _this = this;
                let violationCode = this.area;
                let timeArr = this.time;
                let startDate;
                let endDate;
                let that = this;
                if(timeArr){
                    if(timeArr[0] == timeArr[1]){
                        startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
                        endDate = moment(timeArr[1]).format("YYYY-MM-DD");
                        endDate = `${endDate} 23:59:59`;
                    } else {
                        startDate = timeArr[0];
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
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
                let params = {"startDate":startDate,"endDate":endDate,"value":inputSearch,"title":'tttt'};
                console.log(params);
                const ajaxAPI = remote.getGlobal('ajaxAPI');
                let path = `${ajaxAPI.path}${ajaxAPI.url.exportExcel}`;
                let exportLocation1 = `${ajaxAPI.path}${ajaxAPI.url.exportExcel}?title=11&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`;
                let exportLocation = `http://173.101.1.52:80/violationRecord/exportExcel?title=11&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`
                return exportLocation1;
            },
            handleSearch(){
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
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                        endDate = timeArr[1];
                        endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss")
                    }  
                } else {
                    // startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    // startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                    // endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                    // endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
                    startDate = '';
                    endDate = '';
                }
                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,"pageNumber":1,"pageSize":10};
                console.log(param);
                console.log(params)
                let condition = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
                this.getAllCondition(condition);
                ajax.post('getViolationDataForLike', params).then((data) => {
                    console.log(data);
                    this.getData(data);
                });

            },
            handleSearchWait(){
                let _this = this;
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
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                        endDate = timeArr[1];
                        endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss")
                    }  
                } else {
                    // startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    // startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                    // endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                    // endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
                    startDate = '';
                    endDate = '';
                }
                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,"pageNumber":1,"pageSize":10};
                console.log(param);
                console.log(params)
                let condition = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
                this.getWaitCondition(condition);
                ajax.post('getViolationByState', params).then((data) => {
                    console.log(data);
                    // this.initWaitData(data);
                    _this.getWaitData(data);
                });

            },
            refreshData() {
                ajax.post("getViolationDataForLike",{"pageNumber":1,"pageSize":10}).then(data => {
                  let violation = data;
                  this.getData(data);
                });
            },
             initWaitData(){
                 ajax.post("getViolationByState", {pageSize:10, pageNumber:1}).then((data)=>{
                     if(data){
                         this.getWaitData(data);
                     }
                 })
            },
            openShowImg() {
			    this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
		    },
        }
    } 
</script>
