<template>
    <div class="violation-topbar">
        <el-row class="tooltip" v-if="tabActive == 'all'">
            <el-col :span="5" v-if="this.havePermission">
                <el-button class="tab-btn wait" v-bind:class="{ 'active-tab font-YaheiBold': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitTotalSize}}</el-button>
                <el-button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">历史记录</el-button>
            </el-col>
             <el-col :span="5" v-else>
                <!-- <el-button class="tab-btn all font-Orb active-tab">历史记录</el-button> -->
                <el-button class="tab-btn wait" v-bind:class="{ 'active-tab font-YaheiBold': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitTotalSize}}</el-button>
                <el-button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">历史记录</el-button>
            </el-col>
            <el-col :span="19" class="topbar">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                    @blur = "handleSearch"
                    @keyup.enter.native  = "handleSearch"
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
                <el-button @click="handleSearch" size="mini" type="primary" style="display:none;">查询</el-button>
                <el-button size="mini" type="primary" class="export-excel">
                    <a  :href="exportExcel()">导出</a>
                </el-button>
            </el-col>
        </el-row>
        <el-row class="tooltip" v-else>
            <el-col :span="5">
                <el-button class="tab-btn wait" v-bind:class="{ 'active-tab font-YaheiBold': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitTotalSize}}</el-button>
                <el-button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">历史记录</el-button>
            </el-col>
  
            <el-col :span="19" class="topbar">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                    @blur = "handleSearchWait"
                    @keyup.enter.native = "handleSearchWait"
                ></el-input>
                <span class="demonstration">时间段</span>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    @change="handleSearchWait"
                    value-format="timestamp">
                </el-date-picker>
                <el-button @click="handleSearchWait" size="mini" type="primary" style="display:none;">查询</el-button>
            </el-col>
        </el-row>
        <div class="dialog">
            <ShowImg/>
        </div>
        <div v-if="tabs!=='all'">
            <checkPending/>
        </div>
        <div v-else>
            <all-table/>
        </div>
    </div>
</template>


<script>
    import AllTable from "./AllTable.vue";
    import ShowImg from "./ShowImg.vue";
    import checkPending from './checkPending.vue';
    import { mapMutations, mapActions, mapState } from 'vuex';
    import { ajax } from 'ajax';
    import moment from 'moment';
    import { remote } from 'electron';


    export default {
        components: {
          AllTable,
          ShowImg,
          checkPending,
      },
        data() {
          return {
            area: '',
            inputSearch:'',
            time: '',
            form: {
                name: 'placeholder',
            },
            tabActive: 'wait',
            currentView: 'Card',
            tabs:"all",
            exportLocation: '',
            getUrl:'',
          }
          
        },
        computed: {
            ...mapState('violation',['waitItems','showImgDialog','waitTotalSize','havePermission']),
        },
        
        methods: {
             ...mapActions({
                    getData: "getData",
                    getWaitData: "getWaitData",
                    getAllCondition: "getAllCondition",
                    getWaitCondition: "getWaitCondition",
            }),
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
                    startDate='';
                    endDate = '';
                }
                let inputSearch = this.inputSearch;
                let params = {"startDate":startDate,"endDate":endDate,"value":inputSearch,"title":'tttt'};
                let title = "违规记录历史数据";
                const ajaxAPI = remote.getGlobal('ajaxAPI');
                let path = `${ajaxAPI.path}${ajaxAPI.url.exportExcel}`;
                let exportLocation1 = `${ajaxAPI.path}${ajaxAPI.url.exportExcel}?title=${title}&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`;
                let exportLocation = `http://173.101.1.52:80/violationRecord/exportExcel?title=${title}&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`
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
                    startDate = '';
                    endDate = '';
                }
                let inputSearch = this.inputSearch;
                let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,"pageNumber":1,"pageSize":10};
                let condition = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
                this.getAllCondition(condition);
                ajax.post('getViolationDataForLike', params).then((data) => {
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
                    startDate = '';
                    endDate = '';
                }
                let inputSearch = this.inputSearch;
                let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,"pageNumber":1,"pageSize":10};
                let condition = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
                this.getWaitCondition(condition);
                ajax.post('getViolationByState', params).then((data) => {
                    _this.getWaitData(data);
                });

            },
            judgePermission(){
                let userInfo = remote.getGlobal('userInfo');
                userInfo = JSON.parse(userInfo);
                let permission = userInfo.roleRS;
                let _this = this;
                permission.forEach(element => {
                    let role = element.roleCode;
                    if(role=="review_schdule") {
                        return _this.role = true;
                    }else {
                        return _this.role = false;
                    }
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
