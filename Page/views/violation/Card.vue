<template>
  <div>
    <div class="violation-card">
        <el-col :span="5" v-for="c in filterCards" v-bind:key="c.id">
            <el-card shadow="hover" >
                <div class="violation-id">
                    <i  :class="iconType(c.violationCodeName)" />
                    <span>Id:{{c.violationId}} {{c.violationName}}</span>
                    <span class="tag" :class="tagColor(c.violationCodeName)">{{c.violationCodeName}}</span>
                </div>
                <div class="company">{{c.airLineName}}</div>
                <!-- <div class="time">{{getNaturalDate(c.reportTime)}}</div> -->
                <div class="time">{{c.reportTime|currency}}</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述:{{c.violationDescription}}</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img" :src="img"/>
                        <img class="picture" alt="img" :src="img"/>
                        <img class="picture" alt="img" :src="img"/>
                    </div>
                </div>
                <div class="status" >
                    <button @click="submitStatus(c,1)">通过{{c.status}}</button>
                    <button @click="changeStatus(c)">不通过</button>
                </div>
                <!-- <i class="icon iconfont icon-ziyuan"></i>
                <i class="icon iconfont icon-user"></i> -->
            </el-card>

        </el-col>
    </div>
	</div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    import { getNaturalDate, getOperationDate, formatDate, getTime } from 'date';
    import ajaxx from 'ajax';
    import img from "../../assets/logo.png";



    export default{
        data(){
            return {
                props:"statusValue",
                status: '22',
                img: img,
                // iconType: (value)=> {
                //     let condition = value;
                //     switch(condition){
                //         case "人员":
                //          "iconfont icon-user";
                //             break;
                //         case "设备":
                //             "iconfont icon-user";
                //             break;
                //         case "公司":
                //             "iconfont icon-return";
                //             break;
                //         case "车辆":
                //             "iconfont icon-user";
                //             break;
                //         case "人员":
                //             "iconfont icon-user";
                //             break;
                //         }
                //     },
                
                // iconType: function(value){
                //     return {

                //     }
                // }
                // card:[
                //     {id:1111,name:"章三",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:222,name:"里斯",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:333,name:"王麻子",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:444,name:"哈喽",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:555,name:"刘淇",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:666,name:"李俊",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:777,name:"陈红",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:888,name:"事实上",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:999,name:"绅士手",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                // ]
            }
        },
        computed: {
            ...mapState('violation', ['filterCards']),
        },
        filters:{
            currency(value){
                return getNaturalDate(value);
            }
        },
        methods:{
            ...mapMutations({changeStatus:"violation/changeStatus"}),
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
                console.log(subParam);
		    	ajax.post('updateState', subParam).then((data) => {
                    console.log(data);
                    ajax.get('getViolationData').then((data)=>{
                    console.log(data);
                })
                });
            },
            iconType(value){
                let condition = value;
                switch(condition) {
                    case "人员":
                        return "iconfont icon-user";
                        break;
                    case "设备":
                        return "iconfont icon-user";
                        break;
                    case "公司":
                        return "iconfont icon-return1";
                        break;
                    case "车辆":
                        return "iconfont icon-feiji";
                        break;
                }
            },
            tagColor(value){
                let status = value;
                switch(status) {
                    case "人员":
                        return "tag-user";
                        break;
                    case "设备":
                        return "tag-device";
                        break;
                    case "公司":
                        return "tag-company";
                        break;
                    case "车辆":
                        return "tag-car";
                        break;
                }
            }
        }
    }
</script>
