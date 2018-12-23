<template>
  <div>
    <el-row class="violation-card">
        <el-col :span="5" v-for="c in waitItems" v-bind:key="c.id">
            <el-card shadow="hover" >
                <div class="violation-id">
                    <i  :class="iconType(c.violationCodeName)" />
                    <span>Id:{{c.violationId}} {{c.violationName}}</span>
                    <span class="tag" :class="tagColor(c.violationCodeName)">{{c.violationCodeName}}</span>
                </div>
                <div class="company">{{c.airLineName}}所属公司哈哈哈</div>
                <div class="time">{{c.reportTime|currency}}</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述:{{c.violationDescription}}</div>
                    <div class="decribe-img" @click="openShowImg" >
                        <img class="picture" alt="img" :src="img"/>
                        <img class="picture" alt="img" :src="img"/>
                        <img class="picture" alt="img" :src="img"/>
                    </div>
                    <ShowImg :picture="c.picture"/>
                </div>
                <div class="status" >
                    <el-button type="success" size="small" @click="submitStatus(c,1)">通过</el-button>
                    <el-button type="danger" size="small" @click="submitStatus(c,2)" plain>不通过</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <page-nation-his :currentPage="currentPage" :pageSize="pageSize" :total="waitTotalSize" 
    style="width:100%;height:30px"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
	</div>
</template>

<script>
    import { mapState,mapMutations,mapActions } from 'vuex';
    import { getNaturalDate, getOperationDate, formatDate, getTime } from 'date';
    import { ajax } from 'ajax';
    import img from "../../assets/logo.png";
    import ShowImg from './ShowImg.vue';
    import PageNationHis from "./PageNationHis.vue";



    export default{
        components: {
            ShowImg,
            PageNationHis
        },
        data(){
            return {
                props:"statusValue",
                status: '22',
                img: img,
                dialogVisible: '',
                picture: '',
                waitItem: '',
                currentPage: 1,
                pageSize: 10,
            }
        },
        computed: {
            ...mapState('violation',['filterCards','waitItems','showImgDialog','waitTotalSize']),
        },
        filters:{
            currency(value){
                return getNaturalDate(value);
            }
        },
        methods:{
            ...mapActions({ 
                getWaitData: "getWaitData",
            }),
            // ...mapMutations({changeStatus:"violation/changeStatus"}),
            handleChangeStatus(value){
                this.changeStatus(value);
                console.log(value);
            },
		    submitStatus(param,value) {
		    	console.log(param);
                // let ajax = ajaxx();
                let id = param.id;
                let status = value;
                let subParam = `{"id":"${id}","status":${status}}`;
                let subParams = {"id":id,"status": status};
                console.log(subParam);
                console.log(subParams);
		    	ajax.post('updateState', subParams).then((data) => {
                    if(data){
                        this.initWaitData()
                    }  
                })
            },
            iconType(value){
                let condition = value;
                switch(condition) {
                    case "人员":
                        return "iconfont icon-renyuan yellow";
                    case "设备":
                        return "iconfont icon-shebei equip-gray";
                    case "公司":
                        return "company-purple iconfont icon-plus-company ";
                    case "车辆":
                        return " car-blue iconfont icon-cheliang";
                }
            },
            tagColor(value){
                let status = value;
                switch(status) {
                    case "人员":
                        return "tag-user";
                    case "设备":
                        return "tag-device";
                    case "公司":
                        return "tag-company";
                    case "车辆":
                        return "tag-car";
                }
            },
            openShowImg() {
                this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
                console.log(this.picutre)
            },
            getWaitData(value) {
                this.$store.dispatch('violation/getWaitData',value);
            },
            initWaitData(){
                //  let ajax = ajaxx();
                let _this = this;
                 ajax.post("getViolationByState",{pageSize:_this.pageSize, pageNumber:_this.currentPage}).then((data)=>{
                     if(data){
                         console.log(data);
                         this.getWaitData(data);
                     }
                 })
            },
            handleSizeChange(val){
              console.log(val);
              this.pageSize = val;
              this.initWaitData();
            },
            handleCurrentChange(val){
              console.log(`当前${val}`)
              this.currentPage = val;
              this.initWaitData();
            },
             created() {
                this.initWaitData();
            },
        },
        beforeMount(){
            this.initWaitData();
        }
    }
</script>
