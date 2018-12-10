<template>
  <div>
    <div class="violation-card">
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
    </div>
	</div>
</template>

<script>
    import { mapState,mapMutations,mapActions } from 'vuex';
    import { getNaturalDate, getOperationDate, formatDate, getTime } from 'date';
    import ajaxx from 'ajax';
    import img from "../../assets/logo.png";
    import ShowImg from './ShowImg.vue';



    export default{
        components: {
            ShowImg,
        },
        data(){
            return {
                props:"statusValue",
                status: '22',
                img: img,
                dialogVisible: '',
                picture: '',
                waitItem: '',
            }
        },
        computed: {
            ...mapState('violation',['filterCards','waitItems','showImgDialog']),
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
                let ajax = ajaxx();
                let id = param.id;
                let status = value;
                let subParam = `{"id":"${id}","status":${status}}`;
                let subParams = {"id":id,"status": status};
                console.log(subParam);
                console.log(subParams);
		    	ajax.post('updateState', subParams).then((data) => {
                    console.log(data);  
                    if(data.responseCode == 1000){
                        this.initWaitData()
                    }  
                })
            },
            iconType(value){
                let condition = value;
                switch(condition) {
                    case "人员":
                        return "iconfont icon-user";
                    case "设备":
                        return "iconfont icon-user";
                    case "公司":
                        return "iconfont icon-return1";
                    case "车辆":
                        return "iconfont icon-feiji";
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
                 let ajax = ajaxx();
                 ajax.get("getViolationByState").then((data)=>{
                     if(data.responseCode == 1000){
                         this.getWaitData(data.data);
                     }
                 })
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
